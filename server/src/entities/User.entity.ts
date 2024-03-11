import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Blogs } from "./Blogs.entity";
// import * as bcrypt from 'bcrypt'
import bcrypt from "bcryptjs";
import { Interest } from "./Interest";

@Entity()
@Unique(["email","username"])
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ type: "date" })
  dob: Date;

  @OneToMany(() => Users, (user) => user.friendOf)
  friends: Users[];

  @ManyToOne(() => Users, (user) => user.friends)
  friendOf: Users;

  @ManyToOne(()=>Blogs,(blog)=>blog.likes)
  likes:Blogs;

  @OneToMany(()=>Interest,(interest)=>interest.user)
  interest?: Interest[]

  @OneToMany(() => Blogs, (blog) => blog.user)
  blogs?: Blogs[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

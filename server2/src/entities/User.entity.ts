import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Blogs } from "./Blogs.entity";
// import * as bcrypt from 'bcrypt'
import bcrypt from "bcryptjs";

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

  @OneToMany(() => Users, (user) => user.id)
  friends?: Users[];

  @OneToMany(() => Blogs, (blog) => blog.user)
  blogs?: Blogs[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Blogs } from "./Blogs.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    password:string;

    @Column({ type: 'date' })
    dob:Date;

    @OneToMany(()=>Users,(user)=>user.id)
    friends?:Users[];

    @OneToMany(()=>Blogs,(blog)=>blog.user)
    blogs?:Blogs[];

}
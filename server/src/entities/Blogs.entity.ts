import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User.entity";
import { Comments } from "./Comments.entity";

@Entity()
export class Blogs{
    @PrimaryGeneratedColumn('uuid')
    blogid:string;

    @Column()
    heading:string;
    
    @Column()
    content:string;

    @OneToMany(()=>Comments,(comment)=>comment.commentid)
    comments:Comments[];

    @ManyToOne(()=>Users,(user)=>user.blogs)
    user:Users
}
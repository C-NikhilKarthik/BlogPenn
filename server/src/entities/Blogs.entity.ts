import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./User.entity";
import { Comments } from "./Comments.entity";

@Entity()
export class Blogs{
    @PrimaryGeneratedColumn('uuid')
    blogid:string;

    @Column()
    heading?:string;
    
    @Column()
    content?:string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdon: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedon: Date;

    @Column()
    draft: boolean;

    @OneToMany(()=>Comments,(comment)=>comment.commentid)
    comments:Comments[];

    @ManyToOne(()=>Users,(user)=>user.blogs)
    user:Users
}
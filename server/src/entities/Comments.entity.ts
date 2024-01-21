import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User.entity";

@Entity()
export class Comments{
    
    @PrimaryGeneratedColumn('uuid')
    commentid:string;

    @OneToOne(()=>Users)
    @JoinColumn()
    commenter:Users;

    @Column()
    comment:string;
}
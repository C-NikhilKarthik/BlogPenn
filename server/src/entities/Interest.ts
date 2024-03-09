import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User.entity";

@Entity()
export class Interest{
    @PrimaryGeneratedColumn('uuid')
    interestid:string;

    @Column()
    interest:string

    @ManyToOne(()=>Users,(user)=>user.interest)
    user:Users
}
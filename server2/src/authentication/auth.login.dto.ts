import { Column, Entity } from "typeorm";

@Entity()
export default class UserLoginDto{
    @Column()
    email:string;

    @Column()
    password:string;
}
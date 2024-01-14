import { Column, Entity, BeforeInsert } from "typeorm";
import bcrypt from 'bcryptjs';


@Entity()
export class UserRegistrationDto{
    @Column()
    email:string;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    password:string;

    @Column()
    dob:Date;
}
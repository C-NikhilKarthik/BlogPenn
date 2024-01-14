import { Column, Entity } from "typeorm";

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
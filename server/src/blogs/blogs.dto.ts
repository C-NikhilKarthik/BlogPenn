import { Column, Entity } from "typeorm";

@Entity()
export class BlogCreateDto{

    @Column()
    userid:string;

    @Column()
    heading: string;
    
    @Column()
    content:string;
}
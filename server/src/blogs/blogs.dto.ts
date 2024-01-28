import { Column, Entity } from "typeorm";

@Entity()
export class BlogCreateDto{

    @Column()
    heading: string;
    
    @Column()
    content:string;
}
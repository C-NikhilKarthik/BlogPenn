import { Repository } from "typeorm";
import { UserRegistrationDto } from "./auth.dto";
import { Users } from "../entities/User.entity";
import { AppSataSource } from "..";

export class AuthService{
    private static userRepository:Repository<Users>;

    static async signUp(body:UserRegistrationDto):Promise<any>{
        const myDataSource = AppSataSource
        // const newUser =await this.userRepository.create(body);
        const dob = new Date();
        body.dob=dob;
        return await myDataSource.getRepository(Users).save(body)
    }
}
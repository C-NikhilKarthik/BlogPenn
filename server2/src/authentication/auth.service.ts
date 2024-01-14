import { Repository } from "typeorm";
import { UserRegistrationDto } from "./auth.dto";
import { Users } from "../entities/User.entity";
import { AppSataSource } from "..";

export class AuthService {
  private static userRepository: Repository<Users>;

  static async signUp(body: UserRegistrationDto): Promise<any> {
    const myDataSource = AppSataSource;
    const userRepository = myDataSource.getRepository(Users);
    const user = userRepository.create(body);
    return await userRepository.save(user);
  }

  static async signIn(body: UserRegistrationDto): Promise<any> {
    const myDataSource = AppSataSource;
    let User;
    try {
      const user = await myDataSource
        .getRepository(Users)
        .findOne({ where: { email: body.email } });

      if (user) {
        User = user;
        console.log("User found:", user);
      } else {
        return "User not found";
      }
    } catch (error) {
      return "Error: " + error;
    }

    return User;
  }
}

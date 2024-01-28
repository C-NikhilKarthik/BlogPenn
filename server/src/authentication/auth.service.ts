import { Repository } from "typeorm";
import { UserRegistrationDto } from "./auth.dto";
import { Users } from "../entities/User.entity";
import { AppSataSource } from "..";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserLoginDto from "./auth.login.dto";
// const config = require("../config/env");

// const JWT_SECRET = process.env.JWT_SECRET!;
// console.log(JWT_SECRET);

export class AuthService {
  private static userRepository: Repository<Users>;

  static async signUp(body: UserRegistrationDto): Promise<any> {
    const myDataSource = AppSataSource;
    const userRepository = myDataSource.getRepository(Users);
    const user = userRepository.create(body);
    return await userRepository.save(user);
  }

  static async signIn(body: UserLoginDto): Promise<any> {
    const myDataSource = AppSataSource;
    let User;
    try {
      const user = await myDataSource
        .getRepository(Users)
        .findOne({ where: { email: body.email } });

      if (user) {
        User = user;
        console.log("User found:", user);

        const isMatch = await bcrypt.compare(body.password, User.password);
        if (!isMatch) {
          return {
            status: 400,
            data: {
              message: "Wrong password",
            },
          };
        }

        const payload = {
          email: User.email,
          id: User.id,
        };

        const token = jwt.sign(payload, "blogpenn_team", {
          expiresIn: "5d",
        });

        return {
          status: 200,
          data: {
            message: "Login successful",
            token,
          },
        };
      } else {
        return {
          status: 400,
          data: {
            message: "User not found",
          },
        };
      }
    } catch (error) {
      return {
        status: 400,
        data: {
          message: "Error : " + error,
        },
      };
    }
  }
}

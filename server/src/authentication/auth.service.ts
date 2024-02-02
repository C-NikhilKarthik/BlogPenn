import { Repository } from "typeorm";
import { UserRegistrationDto } from "./auth.dto";
import { Users } from "../entities/User.entity";
import { AppSataSource } from "..";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserLoginDto from "./auth.login.dto";
import { Z_DEFAULT_COMPRESSION } from "zlib";
// const config = require("../config/env");

// const JWT_SECRET = process.env.JWT_SECRET!;
// console.log(JWT_SECRET);
interface JwtPayload {
  email: string;
  id: string;
}

export class AuthService {
  private static userRepository: Repository<Users>;

  static async signUp(body: UserRegistrationDto): Promise<any> {
    const myDataSource = AppSataSource;
    const userRepository = myDataSource.getRepository(Users);
    const user = userRepository.create(body);
    return await userRepository.save(user);
  }
  static async checkToken(token: string): Promise<any> {
    const myDataSource = AppSataSource;

    try {
      const decode = jwt.verify(token, "blogpenn_team") as JwtPayload;

      if (decode) {
        const user = await myDataSource
          .getRepository(Users)
          .findOne({ where: { email: decode?.email } });
        if (user) {
          return {
            status: 200,
            data: {
              message: "Login",
              userName: user.username,
              decode,
            },
          };
        }
        return {
          status: 402,
          data: {
            message: "No User found",
          },
        };
      } else {
        return {
          status: 401,
          data: {
            message: "Token Expired",
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
            id: user.id,
            email: user.email,
            userName: user.username,
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

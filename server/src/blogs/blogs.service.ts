import { AppSataSource } from "..";
import { Blogs } from "../entities/Blogs.entity";
import { Users } from "../entities/User.entity";
import { BlogCreateDto } from "./blogs.dto";

export class CreateBlog {
  static async createBlog(body: BlogCreateDto): Promise<any> {
    const myDataSource = AppSataSource;
    const blogRepository = myDataSource.getRepository(Blogs);
    const userRepository = myDataSource.getRepository(Users);
    const id = body.userid;
    const user = await userRepository.findOne({ where: { id: id } });
    const newBlog = new Blogs();
    newBlog.heading = "";
    newBlog.content = "";
    newBlog.user = user as Users;
    const savedBlog = await blogRepository.save(newBlog);
    return savedBlog;
  }

  static async getBlog(id: string): Promise<any> {
    const myDataSource = AppSataSource;
    const userRepo = myDataSource.getRepository(Users);
    const blogsData = await userRepo.findOne({
      relations: ["blogs"],
      where: { id: id },
    });
    return blogsData;
  }
}

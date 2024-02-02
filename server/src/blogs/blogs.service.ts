import { AppSataSource } from "..";
import { Blogs } from "../entities/Blogs.entity";
import { Users } from "../entities/User.entity";
import { BlogCreateDto } from "./blogs.dto";

export class CreateBlog {
  static async updateBlog(id: string, body: BlogCreateDto): Promise<any> {
    const myDataSource = AppSataSource;
    const blogRepository = myDataSource.getRepository(Blogs);

    try {
      const blog = await blogRepository.findOne({ where: { blogid: id } });
      if (blog) {
        blog.heading = body.heading;
        blog.content = body.content;
        const savedBlog = await blogRepository.update(id, blog);
        return {
          status: 200,
          data: {
            message: savedBlog,
          },
        };
      }
    } catch (err) {
      return {
        status: 400,
        data: {
          message: err,
        },
      };
    }
  }

  static async getOneBlog(id: string): Promise<any> {
    const myDataSource = AppSataSource;
    const blogRepository = myDataSource.getRepository(Blogs);

    try {
      const blog = await blogRepository.findOne({ where: { blogid: id } });
      return {
        status: 200,
        data: {
          message: blog,
        },
      };
    } catch (err) {
      return {
        status: 400,
        data: {
          message: err,
        },
      };
    }
  }

  static async createEmptyBlog(id: string): Promise<any> {
    const myDataSource = AppSataSource;
    const blogRepository = myDataSource.getRepository(Blogs);
    const userRepository = myDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: id } });
    const newBlog = new Blogs();
    newBlog.heading = "";
    newBlog.content = "";
    newBlog.draft = true;
    newBlog.user = user as Users;
    const savedBlog = await blogRepository.save(newBlog);
    return savedBlog;
  }

  static async getBlog(id: string): Promise<any> {
    console.log(id);
    const myDataSource = AppSataSource;
    const userRepo = myDataSource.getRepository(Users);
    const blogsData = await userRepo.findOne({
      relations: ["blogs"],
      where: { id: id },
    });
    return blogsData;
  }

  static async getDraftedBlog(id: string): Promise<any> {
    const myDataSource = AppSataSource;
    const userRepo = myDataSource.getRepository(Users);
    try {
      const blogsData = await userRepo
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.blogs", "blogs")
        .where("user.id = :id", { id: id })
        .andWhere("blogs.draft = :draft", { draft: true })
        .orderBy("blogs.updatedon", "DESC")
        .getOne();
      return {
        status: 200,
        data: {
          message: blogsData?.blogs ?? null,
        },
      };
    } catch (err) {
      return {
        status: 400,
        data: {
          message: err,
        },
      };
    }
  }
}

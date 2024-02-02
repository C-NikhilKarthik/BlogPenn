import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { AuthService } from "./authentication/auth.service";
import { UserRegistrationDto } from "./authentication/auth.dto";
import cors from "cors";
import { BlogCreateDto } from "./blogs/blogs.dto";
import { CreateBlog } from "./blogs/blogs.service";

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(cors());

export const AppSataSource = new DataSource({
  type: "postgres",
  host: "blogpenn.c7wuok60klur.us-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "anand2002",
  database: "h2s_database",
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

async function connectDB() {
  await AppSataSource.initialize()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((e) => console.log(e));
}

//authentication
app.post("/auth/signup", async (req, res) => {
  try {
    const userData: UserRegistrationDto = req.body;
    const newUSer = await AuthService.signUp(userData);
    res.json(newUSer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const userData: UserRegistrationDto = req.body;
    const newUSer = await AuthService.signIn(userData);
    res.json(newUSer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Blogs
app.post("/blog/createEmpty", async (req, res) => {
  try {
    const { id } = req.body;
    // const id = "6bceef3c-f4af-43b9-88f8-194ca5939395"; //pass user id by taking from cookies
    const data = await CreateBlog.createEmptyBlog(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/blog/updateBlog/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogData: BlogCreateDto = req.body;
    const data = await CreateBlog.updateBlog(blogId, blogData);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blog/getDraftedBlog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CreateBlog.getDraftedBlog(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/auth/checkToken", async (req, res) => {
  try {
    const { token } = req.body;
    const data = await AuthService.checkToken(token);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blog/getOneBlog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CreateBlog.getOneBlog(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/blog/allBlog", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await CreateBlog.getBlog(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Application running on ${PORT}`);
});

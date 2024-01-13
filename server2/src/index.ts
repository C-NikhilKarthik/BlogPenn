import express from 'express';
import "reflect-metadata";
import { DataSource } from 'typeorm';

const app= express();
const PORT = 5000;

app.use(express.json());

const AppSataSource = new DataSource({
    type : "postgres",
    host : "h2s-database.c7wuok60klur.us-east-1.rds.amazonaws.com",
    port : 5432,
    username : "postgres",
    password : "anand2002",
    database : "h2s_database",
    ssl: {
        rejectUnauthorized: false,
    },
    entities : ["src/entities/*{.ts,.js}"],
    synchronize : true,
    logging : true,
})

async function connectDB() {
    await AppSataSource.initialize().then(()=>{
        console.log('Connected to database');
    }).catch((e)=>console.log(e));
}

app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Application running on ${PORT}`);
})


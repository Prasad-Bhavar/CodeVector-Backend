import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "../modules/products/product.entity";
import { Category } from "../modules/categories/category.entity";


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    ssl: {
        rejectUnauthorized: false,
    },

    synchronize: false,
    logging: true,

    entities: [Product, Category],
    migrations: ["src/database/migrations/*.ts"],
});
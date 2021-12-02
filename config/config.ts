import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.NODE_ENV === "test" ? process.env.test! : "sequelize_db",
  "postgres",
  "mts121101",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default db;

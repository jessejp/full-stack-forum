import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import path from "path";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "forum2",
  entities: [
    // ....
    User,
    Post,
  ],
  migrations: [__dirname + "/migrations/*", path.join(__dirname, "../migrations/*")],
  logging: true,
  synchronize: true,
});

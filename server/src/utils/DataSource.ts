import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

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
    logging: true,
    synchronize: true,
  });

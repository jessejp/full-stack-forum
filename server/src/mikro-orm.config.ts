import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { PostgreSqlDriver, defineConfig } from "@mikro-orm/postgresql";
import path from "path";

export default defineConfig({
  driver: PostgreSqlDriver,
  migrations: {
    path: path.join(__dirname, "./migrations"),
  },
  entities: [Post],
  dbName: "postgres",
  user: "postgres",
  password: "postgres",
  timezone: "+02:00",
  debug: !__prod__,
});

import { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import MikroORMConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(MikroORMConfig);
  await orm.getMigrator().up();

  //   const em = orm.em.fork();

  //   const post = em.create(Post, { title: "my first post" });
  //   await em.persistAndFlush(post);

  //   const posts = await em.find(Post, {});
  //   console.log(posts);
};

main().catch((err) => {
  console.error(err);
});

import { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import MikroORMConfig from "./mikro-orm.config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  // Database connection
  const orm = await MikroORM.init<PostgreSqlDriver>(MikroORMConfig);
  await orm.getMigrator().up();

  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver, PostResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ em: orm.em.fork() }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main().catch((err) => {
  console.error(err);
});

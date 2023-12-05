import "reflect-metadata";
import "dotenv-safe/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import Redis from "ioredis";
import { PostgresDataSource } from "./utils/DataSource";
import { createUserLoader } from "./utils/createUserLoader";

const main = async () => {
  await PostgresDataSource.initialize();

  // await PostgresDataSource.runMigrations();

  const app = express();

  // Initialize client.
  const redis = new Redis();

  // Initialize store.
  const redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  const schema = await buildSchema({
    resolvers: [HelloResolver, PostResolver, UserResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.set("trust proxy", !__prod__);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: ["http://localhost:3000"],
    }),
    express.json(),
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true, // disable client-side JS access
        sameSite: "lax",
        secure: __prod__,
      },
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // false: only save session when data exists
      secret: "afjkjtysyjksfayrtayuthai56hj6ws6",
    }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        req.headers["x-forwarded-proto"] = "https";
        return { req, res, redis, userLoader: createUserLoader() 
        };
      },
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main().catch((err) => {
  console.error(err);
});

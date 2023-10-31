import { MikroORM } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import MikroORMConfig from "./mikro-orm.config";
import { ApolloServer } from "@apollo/server";

const typeDefs = `#graphql
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world",
  },
};

const main = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(MikroORMConfig);
  await orm.getMigrator().up();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
};

main().catch((err) => {
  console.error(err);
});

import type {
  Connection,
  EntityManager,
  IDatabaseDriver,
} from "@mikro-orm/core";
import type { SqlEntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import type { Request, Response } from "express";

// Declare a merging module to extend the Request type
declare module "express" {
  interface Request {
    session: {
      userId: number;
    };
  }
}

export type MyContext = {
  em: SqlEntityManager<PostgreSqlDriver> &
    EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
};

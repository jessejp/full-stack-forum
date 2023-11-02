import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { SqlEntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";

export type MyContext = {
  em: SqlEntityManager<PostgreSqlDriver> &
    EntityManager<IDatabaseDriver<Connection>>;
};

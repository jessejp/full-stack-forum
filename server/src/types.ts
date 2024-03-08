import type { Request, Response } from "express";
import type { Session } from "express-session";
import type { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createVoteLoader } from "./utils/createVoteLoader";

export type MyContext = {
  req: Request & { session: Session & { userId: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  voteLoader: ReturnType<typeof createVoteLoader>;
};

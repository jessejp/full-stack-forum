import type { Request, Response } from "express";
import type { Session } from "express-session";
import type { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Session & { userId: number } };
  res: Response;
  redis: Redis;
};

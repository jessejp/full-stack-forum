import DataLoader from "dataloader";
import { User } from "../entities/User";
import { In } from "typeorm";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    // SQL to get all required users in one query
    const users = await User.findBy({ _id: In(userIds as number[]) });
    
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u._id] = u;
    });

    // return Users in same order as input userIds
    return userIds.map((userId) => userIdToUser[userId]);
  });

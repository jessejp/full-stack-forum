import DataLoader from "dataloader";
import { In } from "typeorm";
import { Vote } from "../entities/Vote";

export const createVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Vote | null>(
    async (keys) => {
      // SQL to get all required users in one query
      const votes = await Vote.findBy({
        postId: In(keys.map((i) => i.postId)),
        userId: In(keys.map((i) => i.userId)),
      });

      const voteIdToVote: Record<string, Vote> = {};
      votes.forEach((vote) => {
        voteIdToVote[`${vote.userId}|${vote.postId}`] = vote;
      });

      return keys.map((key) => voteIdToVote[`${key.userId}|${key.postId}`]);
    }
  );

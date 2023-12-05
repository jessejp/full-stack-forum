import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFragmentFields on Post {
    _id
    title
    points
    createdAt
    voteStatus
    creator {
      _id
      username
    }
  }
`;

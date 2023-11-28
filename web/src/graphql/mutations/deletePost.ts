import { gql } from "@apollo/client";

export const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    deletePost(_id: $id)
  }
`;

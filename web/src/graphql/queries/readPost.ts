import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "../fragments/postFragment";

export const READ_POST = gql`
  ${POST_FRAGMENT}
  query readPost($id: Int!) {
    readPost(_id: $id) {
      text
      ...PostFragmentFields
    }
  }
`;

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n": types.VoteDocument,
    "\n  query Me {\n    me {\n      _id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        _id\n        title\n        textSnippet\n        creatorId\n        points\n        createdAt\n        updatedAt\n        voteStatus\n        creator {\n          _id\n          username\n        }\n      }\n    }\n  }\n": types.PostsDocument,
    "\n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creator {\n        username\n      }\n    }\n  }\n": types.ReadPostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($newPassword: String!, $token: String!) {\n    changePassword(newPassword: $newPassword, token: $token) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        email\n        username\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creatorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($usernameOrEmail: String!, $password: String!) {\n    login(usernameOrEmail: $usernameOrEmail, password: $password) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($options: UserInput!) {\n    register(options: $options) {\n      errors {\n        field\n        message\n      }\n      user {\n        _id\n        createdAt\n        username\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n"): (typeof documents)["\n  mutation Vote($value: Int!, $postId: Int!) {\n    vote(value: $value, postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      _id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      _id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        _id\n        title\n        textSnippet\n        creatorId\n        points\n        createdAt\n        updatedAt\n        voteStatus\n        creator {\n          _id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Posts($limit: Int!, $cursor: String) {\n    posts(limit: $limit, cursor: $cursor) {\n      hasMore\n      posts {\n        _id\n        title\n        textSnippet\n        creatorId\n        points\n        createdAt\n        updatedAt\n        voteStatus\n        creator {\n          _id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creator {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query readPost($id: Int!) {\n    readPost(_id: $id) {\n      _id\n      createdAt\n      points\n      title\n      text\n      creator {\n        username\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
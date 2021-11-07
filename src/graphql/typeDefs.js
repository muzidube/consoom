const { gql } = require('apollo-server');

module.exports = gql`
  type List {
    id: ID!
    name: String!
    type: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    items: [Item]!
    itemCount: Int!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Item {
    id: ID!
    addedAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getLists: [List]
    getList(listID: ID!): List
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    defaultLists(username: String!): List!
    createList(name: String!, type: String!): List!
    deleteList(listID: ID!): String!
    addItem(listId: ID!, id: ID!): List!
    deleteItem(listId: ID!, itemId: ID!): List!
    createComment(listId: String!, body: String!): List!
    deleteComment(listId: ID!, commentId: ID!): List!
    likeList(listId: ID!): List!
  }
  type Subscription {
    newList: List!
  }
`;

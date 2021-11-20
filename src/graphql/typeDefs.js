const { gql } = require('apollo-server');

module.exports = gql`
  type List {
    id: ID!
    name: String!
    type: String!
    username: String!
    user: String!
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
    getUserLists(userID: ID!): [List]
    getUserList(userID: ID!, listName: String!, listType: String!): List
    getListForPage(userID: ID!, listName: String!, listType: String!): List
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createList(name: String!, type: String!): List!
    deleteList(listID: ID!): String!
    addItem(listID: ID!, itemID: ID!): List!
    deleteItem(listID: ID!, itemID: ID!): List!
    createComment(listID: String!, body: String!): List!
    deleteComment(listID: ID!, commentID: ID!): List!
    likeList(listID: ID!): List!
  }
  type Subscription {
    newList: List!
  }
`;

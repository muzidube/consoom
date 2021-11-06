const { gql } = require('apollo-server');

module.exports = gql`
  type List {
    id: ID!
    name: String!
    type: String!
    username: String!
    createdAt: String!
    items: [Item]!
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
    createList(name: String!): List!
    deleteList(listID: ID!): String!
    addItem(listId: ID!, id: ID!): List!
    deleteItem(listId: ID!, itemId: ID!): List!
  }
`;

const listsResolvers = require('./lists');
const usersResolvers = require('./users');
const itemsResolvers = require('./items');

module.exports = {
  Query: {
    ...listsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...listsResolvers.Mutation,
    ...itemsResolvers.Mutation
  }
};

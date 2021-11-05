const listsResolvers = require('./lists');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...listsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};

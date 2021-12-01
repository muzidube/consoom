const listsResolvers = require('./lists');
const usersResolvers = require('./users');
const itemsResolvers = require('./items');
const commentsResolvers = require('./comments');

module.exports = {
  List: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
    itemCount: (parent) => parent.comments.length
  },
  Query: {
    ...listsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...listsResolvers.Mutation,
    ...itemsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...listsResolvers.Subscription
  }
};

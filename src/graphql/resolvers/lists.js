const { AuthenticationError, UserInputError } = require('apollo-server');

const List = require('../../models/List');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getLists() {
      try {
        const lists = await List.find().sort({ createdAt: -1 });
        return lists;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getList(_, { listId }) {
      try {
        const list = await List.findOne({ id: listId });
        if (list) {
          return list;
        }
        throw new Error('List not found');
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserLists(_, { userID }) {
      try {
        const list = await List.find({ user: userID });
        if (list) {
          return list;
        }
        throw new Error('List not found');
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserList(_, { userID, listName }) {
      try {
        const list = await List.findOne({ user: userID, name: listName });
        if (list) {
          return list;
        }
        throw new Error('List not found');
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createList(_, { name, type }, context) {
      const user = checkAuth(context);

      const newList = new List({
        name,
        type,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const list = await newList.save();
      return list;
    },
    async deleteList(_, { listId }, context) {
      const user = checkAuth(context);
      try {
        const list = await List.findById(listId);
        if (user.username === list.username) {
          await list.delete();
          return 'List deleted successfully';
        }
        throw new AuthenticationError('Action not allowed');
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeList(_, { listId }, context) {
      const { username } = checkAuth(context);

      const list = await List.findById(listId);
      if (list) {
        if (list.likes.find((like) => like.username === username)) {
          // List already likes, unlike it
          list.likes = list.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like list
          list.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await list.save();
        return list;
      }
      throw new UserInputError('List not found');
    }
  },
  Subscription: {
    newList: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_LIST')
    }
  }
};

const { AuthenticationError } = require('apollo-server');

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
        const list = await List.findById(listId);
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
    async createList(_, { name }, context) {
      const user = checkAuth(context);

      const newList = new List({
        name,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const list = await newList.save();
      return list;
    },
    async deletePost(_, { listId }, context) {
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
    }
  }
};

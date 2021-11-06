const { AuthenticationError, UserInputError } = require('apollo-server');

const List = require('../../models/List');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Mutation: {
    addItem: async (_, { listId, ID }, context) => {
      const { username } = checkAuth(context);
      if (ID.trim() === '') {
        throw new UserInputError('No item ID', {
          errors: {
            ID: 'Item must have ID'
          }
        });
      }
      const list = await List.findById(listId);

      if (list) {
        list.items.unshift({
          ID,
          username,
          addedAt: new Date().toISOString()
        });
        await list.save();
        return list;
      }
      throw new UserInputError('List not found');
    },
    async deleteItem(_, { listId, itemId }, context) {
      const { username } = checkAuth(context);

      const list = await List.findById(listId);
      if (list) {
        const itemIndex = list.items.findIndex((i) => i.id === itemId);

        if (list.items[itemIndex].username === username) {
          list.items.splice(itemIndex, 1);
          await list.save();
          return list;
        }
        throw new AuthenticationError('Action not allowed');
      } else {
        throw new UserInputError('List not found');
      }
    }
  }
};

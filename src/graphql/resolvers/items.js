const { AuthenticationError, UserInputError } = require('apollo-server');

const List = require('../../models/List');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Mutation: {
    addItem: async (_, { listID, itemID }, context) => {
      const { username } = checkAuth(context);
      if (itemID.trim() === '') {
        throw new UserInputError('No item ID', {
          errors: {
            itemID: 'Item must have ID'
          }
        });
      }
      try {
        const list = await List.findById(listID);
        const itemIndex = list.items.findIndex((i) => i.id === Number(itemID));
        if (username === list.username && itemIndex === -1) {
          if (list) {
            list.items.unshift({
              id: itemID,
              username,
              addedAt: new Date().toISOString()
            });
            await list.save();
            return list;
          }
        }
        throw new UserInputError('List not found');
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteItem: async (_, { listID, itemID }, context) => {
      const { username } = checkAuth(context);

      const list = await List.findById(listID);
      if (list) {
        const itemIndex = list.items.findIndex((i) => i.id === Number(itemID));

        if (username === list.username) {
          if (itemIndex > -1) {
            list.items.splice(itemIndex, 1);
            await list.save();
            return list;
          }
        }
        throw new AuthenticationError('Action not allowed');
      } else {
        throw new UserInputError('List not found');
      }
    }
  }
};

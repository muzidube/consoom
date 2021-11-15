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
        if (username === list.username) {
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
    async deleteItem(_, { listId, itemID }, context) {
      const { username } = checkAuth(context);
      console.log('username: ', username);

      const list = await List.findOne({ id: listId });
      if (list) {
        const itemIndex = list.items.findIndex((i) => i.id === itemID);

        if (username === list.username) {
          console.log('listusername: ', list.username);
          console.log('itemIndex: ', itemIndex);
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

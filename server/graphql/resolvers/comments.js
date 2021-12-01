const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const List = require('../../models/List');

module.exports = {
  Mutation: {
    createComment: async (_, { listId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const list = await List.findById(listId);

      if (list) {
        list.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await list.save();
        return list;
      }
      throw new UserInputError('list not found');
    },
    async deleteComment(_, { listId, commentId }, context) {
      const { username } = checkAuth(context);

      const list = await List.findById(listId);

      if (list) {
        const commentIndex = list.comments.findIndex((c) => c.id === commentId);

        if (list.comments[commentIndex].username === username) {
          list.comments.splice(commentIndex, 1);
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

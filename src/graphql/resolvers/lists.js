const List = require('../../models/List');

module.exports = {
  Query: {
    async getLists() {
      try {
        const lists = await List.find();
        return lists;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

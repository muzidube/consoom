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
        const list = await List.findById(listId);
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
    async defaultLists(_, context) {
      const user = checkAuth(context);

      const moviesWatchlist = new List({
        name: 'Movies Watchlist',
        type: 'Movies',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const moviesFavourites = new List({
        name: 'Favourite Movies',
        type: 'Movies',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const moviesWatched = new List({
        name: 'Watched Movies',
        type: 'Movies',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const tvWatchlist = new List({
        name: 'TV Watchlist',
        type: 'TV',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const tvFavourites = new List({
        name: 'Favourite TV',
        type: 'TV',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const tvWatched = new List({
        name: 'Watched TV',
        type: 'TV',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const booksToRead = new List({
        name: 'Books To Read',
        type: 'Books',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const booksFavourites = new List({
        name: 'Favourite Books',
        type: 'Books',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const booksRead = new List({
        name: 'Books Read',
        type: 'Books',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const gamesToPlay = new List({
        name: 'Games To Play',
        type: 'Games',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const gamesFavourites = new List({
        name: 'Favourite Games',
        type: 'Games',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const gamesPlayed = new List({
        name: 'Played Games',
        type: 'Games',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const musicToListen = new List({
        name: 'Music To Listen',
        type: 'Music',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const musicFavourites = new List({
        name: 'Favourite Music',
        type: 'Music',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const musicListened = new List({
        name: 'Music Listened',
        type: 'Music',
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const moviesList1 = await moviesWatchlist.save();
      const moviesList2 = await moviesFavourites.save();
      const moviesList3 = await moviesWatched.save();

      const tvList1 = await tvWatchlist.save();
      const tvList2 = await tvFavourites.save();
      const tvList3 = await tvWatched.save();

      const booksList1 = await booksToRead.save();
      const booksList2 = await booksFavourites.save();
      const booksList3 = await booksRead.save();

      const gamesList1 = await gamesToPlay.save();
      const gamesList2 = await gamesFavourites.save();
      const gamesList3 = await gamesPlayed.save();

      const musicList1 = await musicToListen.save();
      const musicList2 = await musicFavourites.save();
      const musicList3 = await musicListened.save();

      return {
        moviesList1,
        moviesList2,
        moviesList3,
        tvList1,
        tvList2,
        tvList3,
        booksList1,
        booksList2,
        booksList3,
        gamesList1,
        gamesList2,
        gamesList3,
        musicList1,
        musicList2,
        musicList3
      };
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

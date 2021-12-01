const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const gamer = require('./api/games').search;
const popularMovies = require('./api/movies').popular;
const upcomingMovies = require('./api/movies').upcoming;
const singleMovie = require('./api/movies').single;
const searchMovie = require('./api/movies').search;
const castMovie = require('./api/movies').cast;

const popularTV = require('./api/tv').popular;
const topTV = require('./api/tv').top;
const singleTV = require('./api/tv').single;
const searchTV = require('./api/tv').search;
const castTV = require('./api/tv').cast;

const popularGames = require('./api/games').popular;
const topGames = require('./api/games').year;
const singleGame = require('./api/games').single;

const app = express().use({ origin: 'https://www.consoom.co.uk' });

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }).then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running successfully');
    });
  });
}

app.use('/api', [
  gamer,
  popularMovies,
  upcomingMovies,
  singleMovie,
  searchMovie,
  castMovie,
  popularTV,
  topTV,
  singleTV,
  searchTV,
  castTV,
  popularGames,
  topGames,
  singleGame
]);

startApolloServer(typeDefs, resolvers);

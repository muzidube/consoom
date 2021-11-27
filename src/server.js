const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

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

const app = express();

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    app.listen(5000, () => {
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
  castTV
]);

app.get('/thing', async (request, response) => {
  response.json({ message: 'Hello from server!' });
});

startApolloServer(typeDefs, resolvers);

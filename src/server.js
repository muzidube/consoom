const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');
const fetch = require('node-fetch');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

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

const data =
  'fields name,rating, first_release_date, rating_count, cover;where first_release_date > 1627464120 & rating_count > 0; sort rating_count desc; limit 100;';

const config = {
  method: 'post',
  url: 'https://api.igdb.com/v4/games',
  headers: {
    'Client-ID': 'fptl3q5j5e6ek4dksjm3yc7k76ssme',
    Authorization: 'Bearer lfyls55r1xpoo8n4kc6a954dssuawg',
    'Content-Type': 'text/plain'
  },
  data
};

app.get('/gameAPI', async (request, response) => {
  const fetchResponse = await fetch(
    'https://api.themoviedb.org/3/movie/580489/credits?api_key=0375f153b709c9b683ba71849a873283&language=en-US'
  );
  const json = await fetchResponse.json();
  console.log(fetchResponse.json());
  response.json(json);
});

app.get('/api', (request, response) => {
  response.json({ message: 'Hello from server!' });
});

app.get('/thing', async (request, response) => {
  response.json({ message: 'Hello from server!' });
});

startApolloServer(typeDefs, resolvers);

// axios(
//   'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0375f153b709c9b683ba71849a873283&page=1'
// )
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

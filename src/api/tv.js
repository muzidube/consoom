const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

module.exports.popular = app.get('/tvAPI/popular', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`,
    headers: {}
  };

  axios(config)
    .then((popularResponse) => {
      response.json(JSON.stringify(popularResponse.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.top = app.get('/tvAPI/top-rated', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API}&language=en-US&page=1`,
    headers: {}
  };

  axios(config)
    .then((topResponse) => {
      response.json(JSON.stringify(topResponse.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

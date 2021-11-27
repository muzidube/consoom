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

module.exports.single = app.get('/tvAPI/single/:tvID', (request, response) => {
  const id = request.params.tvID;
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API}&language=en-US`,
    headers: {}
  };

  axios(config)
    .then((tvResponse) => {
      response.json(JSON.stringify(tvResponse.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.cast = app.get('/tvAPI/cast/:tvID', (request, response) => {
  const id = request.params.tvID;
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API}&language=en-US`,
    headers: {}
  };

  axios(config)
    .then((tvResponse) => {
      console.log('TESTING THE CAST');
      response.json(JSON.stringify(tvResponse.data.cast));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.search = app.get('/tvAPI/search/:tvQuery', (request, response) => {
  const query = request.params.tvQuery;
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API}&language=en-US&query=${query}&page=1&include_adult=false`,
    headers: {}
  };

  axios(config)
    .then((queryResponse) => {
      response.json(JSON.stringify(queryResponse.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

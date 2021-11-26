const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

module.exports.popular = app.get('/movieAPI/popular', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.TMDB_API}&page=1`,
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

module.exports.upcoming = app.get('/movieAPI/upcoming', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API}&page=1`,
    headers: {}
  };

  axios(config)
    .then((upcomingResponse) => {
      response.json(JSON.stringify(upcomingResponse.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.single = app.get('/movieAPI/single/:movieID', (request, response) => {
  const id = request.params.movieID;
  const config = {
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`,
    headers: {}
  };

  axios(config)
    .then((movieResponse) => {
      response.json(JSON.stringify(movieResponse.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

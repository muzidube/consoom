const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const express = require('express');
require('dotenv').config();

const app = express();

const axiosRate = rateLimit(axios.create(), { maxRequests: 4, perMilliseconds: 4000, maxRPS: 4 });

module.exports.search = app.get('/gameAPI/:search', (request, response) => {
  const searchQuery = request.params.search;
  const searchData = `search "${searchQuery}"; fields name, cover;`;

  const config = {
    method: 'post',
    url: 'https://api.igdb.com/v4/games',
    headers: {
      'Client-ID': process.env.GAME_CLIENT_ID,
      Authorization: `Bearer ${process.env.GAME_TOKEN}`,
      'Content-Type': 'text/plain'
    },
    data: searchData
  };

  const fetchGameCovers = async () => {
    try {
      const searchResponse = await axiosRate(config);
      const coverID1 = await JSON.stringify(
        searchResponse.data.find((item) => item.name === searchQuery).cover
      );
      const coverID2 = await JSON.stringify(searchResponse.data[0].cover);

      const coverData = `fields image_id, url;where id = ${coverID1 || coverID2};`;

      const coverConfig = {
        method: 'post',
        url: 'https://api.igdb.com/v4/covers',
        headers: {
          'Client-ID': process.env.GAME_CLIENT_ID,
          Authorization: `Bearer ${process.env.GAME_TOKEN}`,
          'Content-Type': 'text/plain'
        },
        data: coverData
      };

      const coverResponse = await axiosRate(coverConfig);
      const cover = await JSON.stringify(coverResponse.data[0].image_id);
      const coverURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.replace(
        /^"|"$/g,
        ''
      )}.jpg`;
      console.log(`${searchQuery}: `, coverURL);
      return response.json(coverURL);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  fetchGameCovers();
});

module.exports.popular = app.get('/gameAPI/popular/current', (request, response) => {
  const today = new Date().toISOString().split('T')[0];
  const last60days = new Date(new Date().valueOf() - 1000 * 3600 * 24 * 60)
    .toISOString()
    .split('T')[0];

  const config = {
    method: 'get',
    url: `https://api.rawg.io/api/games?key=${process.env.GAME_RAWG_API}&dates=${last60days},${today}&ordering=-ratings_count`,
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

module.exports.year = app.get('/gameAPI/popular/year', (request, response) => {
  const today = new Date().toISOString().split('T')[0];
  const lastYear = new Date(new Date().valueOf() - 1000 * 3600 * 24 * 365)
    .toISOString()
    .split('T')[0];

  const config = {
    method: 'get',
    url: `https://api.rawg.io/api/games?key=${process.env.GAME_RAWG_API}&dates=${lastYear},${today}&ordering=-metacritic`,
    headers: {}
  };

  axios(config)
    .then((yearResponse) => {
      response.json(JSON.stringify(yearResponse.data.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.single = app.get('/gameAPI/single/:gameID', (request, response) => {
  const id = request.params.gameID;
  const config = {
    method: 'get',
    url: `https://api.rawg.io/api/games/${id}?key=${process.env.GAME_RAWG_API}`,
    headers: {
      'Retry-After': 5
    }
  };

  axios(config)
    .then((singleGame) => {
      response.json(JSON.stringify(singleGame.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.gameInfo = app.get('/gameAPI/gameInfo/:gameName', (request, response) => {
  const name = request.params.gameName;
  const config = {
    method: 'get',
    url: `https://api.rawg.io/api/games?key=${process.env.GAME_RAWG_API}&search=${name}`,
    headers: {
      'Retry-After': 5
    }
  };

  axios(config)
    .then((gameInfo) => {
      response.json(JSON.stringify(gameInfo.results));
    })
    .catch((error) => {
      console.log(error);
    });
});

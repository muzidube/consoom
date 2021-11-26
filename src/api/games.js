const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

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
      const searchResponse = await axios(config);
      const coverID = await JSON.stringify(searchResponse.data[0].cover);

      const coverData = `fields image_id, url;where id = ${coverID};`;

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

      const coverResponse = await axios(coverConfig);
      const cover = await JSON.stringify(coverResponse.data[0].image_id);
      const coverURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.replace(
        /^"|"$/g,
        ''
      )}.jpg`;
      return response.json(coverURL);
    } catch (error) {
      // console.log('error: ', error);
    }
  };

  fetchGameCovers();
});

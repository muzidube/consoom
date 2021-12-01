const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();

module.exports.fiction = app.get('/bookAPI/popular/fiction', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${process.env.NYT_API}`,
    headers: {}
  };

  axios(config)
    .then((fictionResponse) => {
      response.json(JSON.stringify(fictionResponse.data.results.books));
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports.nonFiction = app.get('/bookAPI/popular/non-fiction', (request, response) => {
  const config = {
    method: 'get',
    url: `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${process.env.NYT_API}`,
    headers: {}
  };

  axios(config)
    .then((nonFictionResponse) => {
      response.json(JSON.stringify(nonFictionResponse.data.results.books));
    })
    .catch((error) => {
      console.log(error);
    });
});

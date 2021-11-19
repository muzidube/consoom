const axios = require('axios');
const mongoose = require('mongoose');

const data =
  'fields name,rating, first_release_date, rating_count, cover, storyline;where first_release_date > 1627464120 & rating_count > 0; sort rating_count desc; limit 100;';

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

mongoose.get('/', (req, res, next) => {
  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .then(() => server.listen({ port: 5000 }))
    .then((res) => {
      console.log(`Server running at ${res.url}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

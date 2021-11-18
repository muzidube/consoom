const axios = require('axios');

// export default function getGameCovers(coverID) {
//   const myHeaders = new Headers();
//   myHeaders.append('Client-ID', 'fptl3q5j5e6ek4dksjm3yc7k76ssme');
//   myHeaders.append('Authorization', 'Bearer lfyls55r1xpoo8n4kc6a954dssuawg');
//   myHeaders.append('Content-Type', 'text/plain');

//   const raw = `fields image_id;where id = ${coverID};`;

//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   const imageID = fetch('https://api.igdb.com/v4/covers', requestOptions)
//     .then((response) => response.json())
//     .then((result) => console.log(result.image_id))
//     .catch((error) => console.log('error', error));

//   return imageID;
// }

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

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

// images.igdb.com/igdb/image/upload/t_thumb/co1sod.jpg"

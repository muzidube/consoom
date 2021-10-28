import { useEffect, useState } from 'react';

export default function getGameCovers(coverID) {
  const myHeaders = new Headers();
  myHeaders.append('Client-ID', 'fptl3q5j5e6ek4dksjm3yc7k76ssme');
  myHeaders.append('Authorization', 'Bearer lfyls55r1xpoo8n4kc6a954dssuawg');
  myHeaders.append('Content-Type', 'text/plain');

  const raw = `fields image_id;where id = ${coverID};`;

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const imageID = fetch('https://api.igdb.com/v4/covers', requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result.image_id))
    .catch((error) => console.log('error', error));

  return imageID;
}

// images.igdb.com/igdb/image/upload/t_thumb/co1sod.jpg"

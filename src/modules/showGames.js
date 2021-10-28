import { useEffect, useState } from 'react';
import Game from './Game';

export default function ShowGames() {
  const myHeaders = new Headers();
  myHeaders.append('Client-ID', 'fptl3q5j5e6ek4dksjm3yc7k76ssme');
  myHeaders.append('Authorization', 'Bearer lfyls55r1xpoo8n4kc6a954dssuawg');
  myHeaders.append('Content-Type', 'text/plain');

  const raw =
    'fields name,rating, first_release_date, rating_count, cover;where first_release_date > 1627464120 & rating_count > 0; sort rating_count desc; limit 100;';

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://api.igdb.com/v4/games', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        console.log(data);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div className="game-container container w-full flex justify-center flex-wrap items-start content-start">
      <div className="h-auto w-full max-w-screen-lg overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {games.length > 0 && games.map((game) => <Game key={game.id} {...game} />)}
      </div>
    </div>
  );
}

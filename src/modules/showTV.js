/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import * as URLS from './urls';
import TV from './TV';

export default function ShowTV() {
  const [tv, setTV] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/tv/popular?api_key=0375f153b709c9b683ba71849a873283&language=en-US&page=1'
    )
      .then((res) => res.json())
      .then((data) => {
        setTV(data.results);
      });
  }, []);

  return (
    <div className="tv-container container w-full flex justify-center flex-wrap items-start content-start">
      <div className="h-auto w-full max-w-screen-lg overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {tv.length > 0 && tv.map((tv) => <TV key={tv.id} {...tv} />)}
      </div>
    </div>
  );
}

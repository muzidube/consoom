import { useEffect, useState } from 'react';
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
    <div className="tv-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
      <div className="h-auto w-full  overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {tv.length > 0 && tv.map((tv) => <TV key={tv.id} {...tv} />)}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Movie from './Movie';

export default function ShowMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0375f153b709c9b683ba71849a873283&page=1'
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="movie-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
      <div className="h-auto w-full overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import * as URLS from './urls';
import { getMovies } from './apiFetch';
import Movie from './Movie';

// export default async function ShowMovies() {
//   //   const popularMovies = getMovies(URLS.POPULAR_URL);

//   await fetch(URLS.POPULAR_URL)
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((movie) => {
//         const { title, poster_path, vote_average, overview, id } = movie;
//         const movieEl = document.createElement('div');
//         movieEl.classList.add('movie');
//         movieEl.innerHTML = `
//                <img src="${
//                  poster_path ? URLS.IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'
//                }" alt="${title}">
//               <div class="movie-info">
//                   <h3>${title}</h3>
//               </div>
//               <div class="overview">
//                   <h3>Overview</h3>
//                   ${overview}
//                   <br/>
//                   <button class="know-more" id="${id}">Know More</button
//               </div>

//           `;
//       });
//     });
// }

// export default function Testing() {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetch(
//       'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0375f153b709c9b683ba71849a873283&page=1'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setMovies(data.results);
//       });
//   }, []);

//   return (
//     <div className="container movie-container w-auto h-auto overflow-auto">
//       <ul className="float-left -mr-999em whitespace-nowrap list-none">
//         {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
//       </ul>
//     </div>
//   );
// }

export default function Testing() {
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
    <div className="movie-container container w-full flex justify-center flex-wrap items-start content-start">
      <div className="h-auto w-full max-w-screen-lg overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

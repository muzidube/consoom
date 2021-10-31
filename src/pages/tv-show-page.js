import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/header';
import ShowMovies from '../modules/showMovies';
import ShowBooks from '../modules/showBooks';
import ShowTV from '../modules/showTV';
import ShowGames from '../modules/showGames';
import MovieHero from '../components/movie-page/movie-hero';
import ShowCast from '../components/movie-page/showCast';
import TVShowHero from '../components/tv-page/tv-show-hero';
// import Dashboard from '../components/dashboard/dashboard';

export default function MoviePage() {
  const [tv, setTV] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setTV(data);
      });
  }, []);

  useEffect(() => {
    document.title = tv.original_title;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <TVShowHero key={tv.id} {...tv} />
        <ShowCast id={id} />
        <ShowMovies />
        <ShowTV />
        <ShowBooks />
        <ShowGames />
        {/* <HeroSearch />
      <MediaRow /> */}
        {/* <div className = 'grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
                <Home />
                <Sidebar />
            </div> */}
      </main>
    </div>
  );
}

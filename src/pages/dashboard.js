import { useEffect } from 'react';
import Header from '../components/header';
import ShowMovies from '../components/dashboard/movie-row/show-movies';
import ShowBooks from '../components/dashboard/book-row/show-books';
import ShowTV from '../components/dashboard/tv-row/show-tv';
import ShowGames from '../components/dashboard/game-row/show-games';
import HeroSearch from '../components/dashboard/hero-search/hero-search';
import ListForm from '../components/list/NewListForm';
// import ShowMusic from '../components/dashboard/music-row/show-music';
// import Dashboard from '../components/dashboard/dashboard';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Consume';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <HeroSearch />
        <ShowMovies />
        <ShowTV />
        <ShowBooks />
        <ShowGames />
        <ListForm />
      </main>
    </div>
  );
}

import { useEffect } from 'react';
import Header from '../components/header';
import MediaRow from '../components/dashboard/media-row';
import ShowMovies from '../modules/showMovies';
import ShowBooks from '../modules/showBooks';
import ShowTV from '../modules/showTV';
import ShowGames from '../modules/showGames';
import HeroSearch from '../components/dashboard/hero-search';
// import Dashboard from '../components/dashboard/dashboard';

export default function Dashboard1() {
  useEffect(() => {
    document.title = 'Co-Lab';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mx-auto justify-center items-center">
        <HeroSearch />
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

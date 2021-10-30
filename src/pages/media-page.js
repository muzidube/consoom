import { useEffect } from 'react';
import Header from '../components/header';
import ShowMovies from '../modules/showMovies';
import ShowBooks from '../modules/showBooks';
import ShowTV from '../modules/showTV';
import ShowGames from '../modules/showGames';
import MediaHero from '../components/media-page/media-hero';
// import Dashboard from '../components/dashboard/dashboard';

export default function MediaPage() {
  useEffect(() => {
    document.title = 'Consume';
  }, []);

  return (
    <div className="bg-gray-background">
      console.log('This Is Media');
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <MediaHero />
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

import { useEffect } from 'react';
import Header from '../components/header';
import MediaRow from '../components/dashboard/media-row';
import Testing from '../modules/showMovies';
import ShowBooks from '../modules/showBooks';
// import Dashboard from '../components/dashboard/dashboard';

export default function Dashboard1() {
  useEffect(() => {
    document.title = 'Co-Lab';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <MediaRow />
      <Testing />
      <ShowBooks />
      {/* <HeroSearch />
      <MediaRow /> */}
      {/* <div className = 'grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
                <Home />
                <Sidebar />
            </div> */}
    </div>
  );
}

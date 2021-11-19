/* eslint-disable*/
import Hero from '../components/pages/profile-page/hero';
import Header from '../components/header';

import MovieLists from '../components/pages/profile-page/movie-lists';
import TVLists from '../components/pages/profile-page/tv-lists';
import BookLists from '../components/pages/profile-page/book-lists';
import GameLists from '../components/pages/profile-page/game-lists';

export default function Profile() {
  return (
    <div className="bg-gray-background">
      <Header />
      <main className="max-w-screen-xl flex flex-wrap content-start justify-center mt-16 mx-auto justify-center items-center box-border">
        <Hero />
        <div className="flex flex-wrap md:flex-nowrap">
          <MovieLists />
          <TVLists />
        </div>
        <div className="flex flex-wrap md: flex-nowrap">
          <BookLists />
          <GameLists />
        </div>
      </main>
    </div>
  );
}

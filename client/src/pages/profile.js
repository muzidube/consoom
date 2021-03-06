/* eslint-disable*/
import { useEffect } from 'react';

import Hero from '../components/pages/profile-page/hero';
import Header from '../components/header';

import MovieLists from '../components/pages/profile-page/movie-lists';
import TVLists from '../components/pages/profile-page/tv-lists';
import BookLists from '../components/pages/profile-page/book-lists';
import GameLists from '../components/pages/profile-page/game-lists';

export default function Profile() {
  useEffect(() => {
    document.querySelectorAll('.poster').forEach((poster) => {
      poster.style.backgroundImage = 'url(/images/red-lines.svg)';
    });
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <main className="max-w-screen-xl flex flex-wrap content-start justify-center mx-auto justify-center items-center box-border">
        <Hero />
        <MovieLists />
        <TVLists />
        <BookLists />
        <GameLists />
      </main>
    </div>
  );
}

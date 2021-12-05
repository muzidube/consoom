import { useParams } from 'react-router-dom';

import Header from '../components/header';
import Hero from '../components/pages/list-page/hero';
import MovieList from '../components/pages/list-page/movies/movie-list';
import TVList from '../components/pages/list-page/tv/tv-list';
import BookList from '../components/pages/list-page/books/book-list';
import GameList from '../components/pages/list-page/games/game-list';

export default function ListPage() {
  const { type } = useParams();
  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mx-auto justify-center items-center">
        <Hero />
        {(() => {
          if (type === 'Movie') {
            return <MovieList />;
          }
          if (type === 'TV') {
            return <TVList />;
          }
          if (type === 'Book') {
            return <BookList />;
          }
          if (type === 'Game') {
            return <GameList />;
          }
        })()}
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import MovieHero from '../components/pages/movie-page/movie-hero';
import ShowCast from '../components/pages/movie-page/show-cast';

export default function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState('');
  const [bg, setBG] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/movieAPI/single/${id}`
        );
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setMovie(jsonObj);
        setBG(jsonObj.backdrop_path);
        document.title = jsonObj.original_title;
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mx-auto justify-center items-center">
        <MovieHero key={movie.id} {...movie} bg={bg} />
        <ShowCast id={id} />
      </main>
    </div>
  );
}

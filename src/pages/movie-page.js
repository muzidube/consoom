import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import MovieHero from '../components/pages/movie-page/movie-hero';
import ShowCast from '../components/pages/movie-page/show-cast';

export default function MoviePage() {
  const [movie, setMovie] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // fetch(
    //   `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMovie(data);
    //   });
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movieAPI/single/${id}`);
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        console.log('Movie: ', jsonObj);
        setMovie(jsonObj);
        document.title = jsonObj.original_title;
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <MovieHero key={movie.id} {...movie} />
        <ShowCast id={id} />
      </main>
    </div>
  );
}

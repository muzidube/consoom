import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Movie from '../../../dashboard/movie-row/Movie';

export default function ShowMovie({ id }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
        );
        const json = await (await response).json();
        setMovie(json);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchMovieDetails();
  }, []);

  return <Movie key={movie.id} {...movie} />;
}

ShowMovie.propTypes = {
  id: PropTypes.number.isRequired
};

/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URLS from '../../../constants/urls';

const SearchResultMovie = ({ title, poster_path, vote_average, overview, id }) => (
  <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
    <Link to={`/Movie/${id}/${title}`}>
      <div className="thumbnail w-94px h-141px flex rounded-lg">
        <img className="w-94px h-141px rounded-lg" src={URLS.IMG_URL + poster_path} alt={title} />
      </div>
    </Link>
    <div className="movie-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
      <div className="flex">
        <Link to={`/Movie/${id}/${title}`}>
          <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{title}</h2>
        </Link>
        <h2 className="text-1em whitespace-normal ml-2">
        {Math.round(vote_average * 10) || 'N/A'}
          <span className="text-0.4rem">%</span>
        </h2>
      </div>
      <p className="m-0 p-0 w-900px break-words text-1em no-underline">{overview}</p>
    </div>
  </div>
);

SearchResultMovie.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default SearchResultMovie;

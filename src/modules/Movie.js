/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import * as URLS from './urls';

const Movie = ({ title, poster_path, vote_average, overview, id }) => (
  <li className="movie float-left text-center inline w-movieW ml-10">
    <img src={URLS.IMG_URL + poster_path} alt={title} />
    <div className="movie-info w-movieW">
      <h3 className="text-base">{title}</h3>
      <span>{vote_average}</span>
    </div>
    {/* <div className="overview">
      <h3>Overview</h3>
      {overview}
      <br />
      <button type="button" className="know-more" id={id}>
        Know More
      </button>
    </div> */}
  </li>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Movie;

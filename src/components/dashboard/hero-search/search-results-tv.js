/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URLS from '../../../constants/urls';

const SearchResultTV = ({ name, poster_path, vote_average, release_date, overview, id }) => (
  <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
    <Link to={`/tv/${id}`}>
      <div className="thumbnail w-94px h-141px flex rounded-lg">
        <img className="w-94px h-141px rounded-lg" src={URLS.IMG_URL + poster_path} alt={name} />
      </div>
    </Link>
    <div className="tv-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
      <div className="flex">
        <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{name}</h2>
        {/* <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white"> */}
        <h2 className="text-1em whitespace-normal ml-2">
          {vote_average * 10}
          <span className="text-0.4rem">%</span>
        </h2>
      </div>
      <p className="m-0 p-0 w-900px break-words text-1em no-underline">{overview}</p>
      {/* </div> */}
    </div>
  </div>
);

SearchResultTV.propTypes = {
  name: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default SearchResultTV;
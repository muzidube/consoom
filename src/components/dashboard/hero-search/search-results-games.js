/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResultGame = ({ name, poster_path, metacritic, description, id }) => (
  <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
    <Link to={`/Game/${id}/${name}`}>
      <div className="thumbnail w-94px h-141px flex rounded-lg">
        <img className="w-94px h-141px rounded-lg" src="/images/Consume-Big.jpg" alt={name} />
      </div>
    </Link>
    <div className="game-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
      <div className="flex">
        <Link to={`/Game/${id}/${name}`}>
          <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{name}</h2>
        </Link>
        {/* <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white"> */}
        <h2 className="text-1em whitespace-normal ml-2">
          {metacritic}
          <span className="text-0.4rem">%</span>
        </h2>
      </div>
      <p className="m-0 p-0 w-900px break-words text-1em no-underline">{description}</p>
      {/* </div> */}
    </div>
  </div>
);

SearchResultGame.propTypes = {
  name: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default SearchResultGame;

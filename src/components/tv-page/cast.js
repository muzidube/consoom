/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URLS from '../../modules/urls';

const Cast = ({ name, profile_path, character, id }) => (
  <div className="media-item movie ml-10 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
    <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
      <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
        <a className="image inline-block w-full h-full whitespace-nowrap" href="/" name={name}>
          <img
            className="poster inline-block w-full h-full outline-none border-none"
            src={URLS.IMG_URL + profile_path}
            alt={name}
          />
        </a>
      </div>
    </div>
    <div className="movie-info pt-6 pb-0 px-2.5 relative whitespace-normal flex flex-wrap content-start w-full">
      <h2 className="m-0 p-0 w-full font-bold break-words text-1em no-underline">{name}</h2>

      <p className="m-0 p-0 whitespace-normal font-normal">{character}</p>
    </div>
  </div>
);

Cast.propTypes = {
  name: PropTypes.string.isRequired,
  profile_path: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Cast;

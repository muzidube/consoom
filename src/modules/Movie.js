/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import * as URLS from './urls';

const Movie = ({ title, poster_path, vote_average, release_date, overview, id }) => (
  <div className="movie ml-10 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
    <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
      <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
        <a className="image inline-block w-full h-full whitespace-nowrap" href="/" title={title}>
          <img
            className="poster inline-block w-full h-full outline-none border-none"
            src={URLS.IMG_URL + poster_path}
            alt={title}
          />
        </a>
      </div>
    </div>
    <div className="movie-info pt-6 pb-0 px-2.5 relative whitespace-normal flex flex-wrap content-start w-full">
      <h2 className="text-base m-0 p-0 w-full font-semibold break-words">{title}</h2>
      <div className="absolute -top-5 left-2.5 inline-block whitespace-normal">
        <div className="outer-ring mr-0 w-38px h-38px p-0.5 rounded-50% inline-block whitespace-normal bg-black">
          <div className="relative inline-block w-full h-full text-center">
            <div className="w-full h-full flex items-center justify-center text-center whitespace-normal">
              <span className="pt-px pl-px text-0.6em color-white text-center whitespace-normal">
                {vote_average}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 p-0 whitespace-normal">{release_date}</p>
    </div>
    {/* <div className="overview">
      <h3>Overview</h3>
      {overview}
      <br />
      <button type="button" className="know-more" id={id}>
        Know More
      </button>
    </div> */}
  </div>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default Movie;

/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URLS from '../../../constants/urls';

import formatDate from '../../../util/dateFormatter';

export default function Movie({ title, poster_path, vote_average, release_date, id }) {
  function addDefaultSrc(e) {
    e.target.src = '/images/Consoom-Thick-fa.png';
    e.target.style.backgroundImage = 'url(/images/red-lines.svg)';
  }

  return (
    <div className="media-item movie ml-5 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
      <Link to={`/Movie/${id}/${title}`}>
        <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
          <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
            <p className="image inline-block w-full h-full whitespace-nowrap" title={title}>
              <img
                className="poster inline-block w-full h-full outline-none border-none bg-gray-background"
                onError={addDefaultSrc}
                src={URLS.IMG_URL + poster_path}
                alt={title}
              />
            </p>
          </div>
        </div>
      </Link>
      <div className="movie-info pt-6 pb-0 px-2.5 relative whitespace-normal grid content-start w-full">
        <Link to={`/Movie/${id}/${title}`}>
          <h2 className="m-0 p-0 w-full font-bold break-words text-1em no-underline">{title}</h2>
        </Link>
        <div className="absolute -top-5 left-2.5 inline-block whitespace-normal">
          <div className="outer-ring mr-0 w-46px h-46px p-0.5 rounded-50% inline-block whitespace-normal bg-black">
            <div className="relative inline-block w-full h-full text-center">
              <div className="w-full h-full flex items-center justify-center text-center whitespace-normal">
                <div className="percent relative w-48px h-48px">
                  <svg className="progress-ring relative w-48px h-48px transform -rotate-90">
                    <circle
                      className="progress-ring__circle w-48px h-48px transform translate-x-5px translate-y-5px fill-none"
                      strokeWidth="3"
                      strokeDasharray="120"
                      strokeDashoffset="0"
                      stroke={(() => {
                        if (vote_average >= 9.5) {
                          return '#7d6c0e';
                        }
                        if (vote_average >= 7) {
                          return '#204529';
                        }
                        if (vote_average >= 5) {
                          return '#423d0f';
                        }
                        if (vote_average >= 1) {
                          return '#571435';
                        }
                        return '#666666';
                      })()}
                      r="19"
                      cx="19"
                      cy="19"
                    />
                    <circle
                      className="progress-ring__circle w-48px h-48px transform translate-x-5px translate-y-5px fill-none"
                      strokeWidth="3"
                      strokeDasharray="120"
                      strokeDashoffset={120 - (120 * (vote_average * 10)) / 100}
                      strokeLinecap="round"
                      stroke={(() => {
                        if (vote_average >= 9.5) {
                          return '#FFD700';
                        }
                        if (vote_average >= 7) {
                          return '#21d07a';
                        }
                        if (vote_average >= 5) {
                          return '#d2d531';
                        }
                        if (vote_average >= 1) {
                          return '#db2360';
                        }
                        return '#666666';
                      })()}
                      r="19"
                      cx="19"
                      cy="19"
                    />
                  </svg>
                  <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
                    <h2 className="pl-px pt-px text-xs items-center justify-center text-center whitespace-normal">
                    {Math.round(vote_average * 10) || 'N/A'}
                      <span className="text-0.4rem">%</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="release-date m-0 p-0 whitespace-normal font-normal">
          {formatDate(release_date)}
        </p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

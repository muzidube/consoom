/* eslint-disable camelcase */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as URLS from '../../../constants/urls';

import WatchlistBtn from '../watchlist-btn';
import FavouriteBtn from '../favourite-btn';
import WatchedBtn from '../watched-btn';
import formatDate from '../../../util/dateFormatter';

export default function TVShowHero({
  name,
  poster_path,
  vote_average,
  first_air_date,
  overview,
  tagline,
  status,
  bg
}) {
  useEffect(() => {
    if (document.querySelector('.tv-page-hero')) {
      document.querySelector('.tv-page-hero').style.backgroundImage = `url(
    https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${bg}`;
    }
  }, [bg]);

  const watchlist = 'Watchlist';
  const favourites = 'Favourites';
  const watched = 'Watched';

  return (
    <div className="tv-page-hero w-full relative z-1 box-border bg-cover bg-norepeat bg-right-hero">
      <div className="flex content-center justify-center flex-wrap box-border bg-hero-gradient">
        <div className="py-7 px-10 max-w-screen-xl w-full z-0 box-border">
          <section className="original-header content-wrapper flex flex-wrap box-border text-white justify-center md:flex-nowrap">
            <div className="poster-wrapper h-auto w-300px min-w-300px border-0 overflow-hidden rounded-lg box-border flex text-white items-center">
              <div className="poster text-white block min-w-300px w-300px h-450px relative top-0 left-0 box-border">
                <div className="image-content backdrop text-white w-full min-w-full h-full box-border">
                  <img
                    className="block w-full min-w-full h-full min-h-full border-0 outline-none text-white rounded-lg"
                    src={URLS.IMG_URL + poster_path}
                    alt={name}
                  />
                </div>
              </div>
            </div>
            <div className="info text-white flex box-border py-1.5">
              <section className="text-white flex flex-wrap items-start content-center box-border md:pl-10">
                <div className="title text-white w-full mb-6 flex flex-wrap box-border">
                  <h2 className="text-white w-full m-0 p-0 text-4xl flex flex-wrap flex-col font-semibold box-border  md:flex-nowrap">
                    <p className="text-white font-bold decoration-none box-border bg-transparent text-4xl">
                      {name}
                    </p>
                    <span className="font-normal text-gray-600 box-border text-3xl">
                      ({formatDate(first_air_date)})
                    </span>
                  </h2>
                  <div className="facts flex text-white italic text-gray-500">{status}</div>
                </div>
                <ul className="actions text-white m-0 p-0 mb-5 w-full h-68px flex items-center content-start list-none box-border">
                  <li className="h-full bg-transparent inline-flex items-center justify-center box-border mr-5 text-white list-none">
                    <div className="percent relative w-65px h-65px">
                      <svg className="progress-ring relative w-65px h-65px transform -rotate-90">
                        <circle
                          className="progress-ring__circle w-65px h-65px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="3"
                          strokeDasharray="175"
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
                          r="28"
                          cx="28"
                          cy="28"
                        />
                        <circle
                          className="progress-ring__circle w-65px h-65px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="3"
                          strokeDasharray="175"
                          strokeDashoffset={175 - (175 * (vote_average * 10)) / 100}
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
                          r="28"
                          cx="28"
                          cy="28"
                        />
                      </svg>
                      <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
                        <h2 className="pl-px pt-px text-md items-center justify-center text-center whitespace-normal">
                          {vote_average * 10 || 'N/A'}
                          <span className="text-xs">%</span>
                        </h2>
                      </div>
                    </div>
                    <div className="text font-bold ml-1.5 whitespace-pre-line text-white box-border list-none">
                      User
                      <br />
                      Score
                    </div>
                  </li>
                  <WatchlistBtn listToAdd={watchlist} />
                  <FavouriteBtn listToAdd={favourites} />
                  <WatchedBtn listToAdd={watched} />
                </ul>
                <div className="details text-white w-full box-border">
                  <h3 className="tagline text-gray-500 m-0 p-0 text-1.1em font-normal italic w-full box-border">
                    {tagline}
                  </h3>
                  <h3 className="overview mt-2.5 text-whitew-full mb-2 font-semibold text-1.3em p-0 box-border">
                    Overview
                  </h3>
                  <div className="text-white box-border">
                    <p className="m-0 text-white text-1em p-0 box-border">{overview}</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

TVShowHero.propTypes = {
  name: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  first_air_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired
};

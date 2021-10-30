/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { heroSearchBG } from '../../modules/heroSearchBG';
import * as URLS from '../../modules/urls';
import SearchBar from '../../modules/searchBar.js';
import HeroSearch from '../dashboard/hero-search';

export default function MediaHero({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  tagline,
  id
}) {
  heroSearchBG();
  //   return (
  //     <section className="hero max-w-screen-xl min-h-300px h-heroHeight max-h-360px bg-top-center bg-cover bg-no-repeat text-white flex flex-wrap justify-center items-start content-start w-full box-border mx-auto">
  //       <div className="media discover h-full flex content-center items-center justify-center w-full flex-wrap box-border text-white">
  //         <div className="w-full flex justify-center content-start items-start box-border text-white">
  //           <div className="content-wrapper flex-wrap max-w-screen-xl w-full flex items-start content-start px-10 py-7 box-border text-white">
  //             <div className="title w-full mb-1.25 box-border text-white">
  //               <h2 className="text-3em font-bold leading-none w-full m-0 p-0 box-border text-white">
  //                 Welcome
  //               </h2>
  //               <h3 className="text-2em font-semibold m-0 p-0 box-border text-white">
  //                 Movies, TV Shows, Books and Games... What are you waiting for? Consume now.
  //               </h3>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }
  return (
    <dic className="hero w-full relative z-1 box-border">
      <div className="flex content-center justify-center flex-wrap box-border">
        <div className="py-7 px-10 max-w-screen-xl w-full z-0 box-border">
          <section className="original-header content-wrapper flex flex-nowrap box-border text-white">
            <div className="poster-wrapper h-auto w-300px min-w-300px border-0 overflow-hidden rounded-lg box-border text-white">
              <div className="poster rounded-b-none text-white block min-w-300px w-300px h-450px relative top-0 left-0 box-border">
                <div className="image-content backdrop text-white w-full min-w-full h-full box-border">
                  <img
                    className="block w-full min-w-full h-full min-h-full border-0 outline-none text-white"
                    src={URLS.IMG_URL + poster_path}
                    alt={title}
                  />
                </div>
              </div>
            </div>
            <div className="info text-white flex box-border">
              <section className="text-white flex flex-wrap items-start content-center box-border pl-10">
                <div className="title text-white w-full mb-6 flex flex-wrap box-border">
                  <h2 className="text-white w-full m-0 p-0 text-4xl font-semibold box-border">
                    <p className="text-white font-bold decoration-none box-border bg-transparent text-4xl">
                      {title}
                    </p>
                    <span className="font-normal text-gray-700 box-border text-4xl">
                      ({release_date})
                    </span>
                  </h2>
                  <div className="facts flex text-white">Hello Hello Hello</div>
                </div>
                <ul className="actions text-white m-0 p-0 mb-5 w-full h-68px flex items-center content-start list-none box-border">
                  <li className="w-full h-full flex items-center justify-center text-center whitespace-normal">
                    <div className="percent relative w-48px h-48px">
                      <svg className="progress-ring relative w-48px h-48px transform -rotate-90">
                        <circle
                          className="progress-ring__circle w-48px h-48px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="3"
                          strokeDasharray="120"
                          strokeDashoffset="0"
                          stroke="black"
                          r="19"
                          cx="19"
                          cy="19"
                        />
                        <circle
                          className="progress-ring__circle w-48px h-48px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="2.2"
                          strokeDasharray="120"
                          strokeDashoffset={120 - (120 * (vote_average * 10)) / 100}
                          strokeLinecap="round"
                          stroke={(() => {
                            if (vote_average >= 9.5) {
                              return 'gold';
                            }
                            if (vote_average >= 7) {
                              return '#21d07a';
                            }
                            if (vote_average >= 5) {
                              return '#d2d531';
                            }
                            return 'red';
                          })()}
                          r="19"
                          cx="19"
                          cy="19"
                        />
                      </svg>
                      <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
                        <h2 className="pl-px pt-px text-xs items-center justify-center text-center whitespace-normal">
                          {vote_average * 10}
                          <span className="text-0.4rem">%</span>
                        </h2>
                      </div>
                    </div>
                  </li>
                  <li className="add-list py-0.5 mr-5 text-white box-border list-none">
                    <a
                      className="no_click box-border border-50% w-46px h-46px inline-flex items-center content-center justify-center text-white list-none"
                      href="#"
                    >
                      <span className="text-white relative top-0 left-0 inline-fex items-center content-center min-w-1em min-h-1em w-1em h-1em bg-center bg-no-repeat box-border font-normal list-none" />
                    </a>
                  </li>
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
    </dic>
  );
}

MediaHero.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

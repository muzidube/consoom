/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import gameHeroBG from './game-hero-bg';
import KeyFacts from './key-facts';
import WatchlistBtn from '../watchlist-btn';
import FavouriteBtn from '../favourite-btn';
import WatchedBtn from '../watched-btn';
import formatDate from '../../../util/dateFormatter';

export default function GameHero({ name, metacritic, released, description, tagline, status, id }) {
  const [gameCover, setGameCover] = useState('');
  const [gameCover2, setGameCover2] = useState('');
  const { title } = useParams();

  useEffect(() => {
    gameHeroBG(id);
    const fetchGameCover = async () => {
      try {
        const response = await fetch(
          `https://guarded-mesa-01224.herokuapp.com/api/search/${title}`
        );
        const json = await (await response).json();
        setGameCover(await json.pageOfItems.find((item) => item.name === title).cover.url);
        setGameCover2(await json.pageOfItems[0].cover.url);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchGameCover();
  });

  function addDefaultSrc(e) {
    e.target.src = '/images/Consume-C.jpg';
  }

  const toPlay = 'To Play';
  const favourites = 'Favourites';
  const played = 'Played';

  return (
    <div className="game-page-hero w-full relative z-1 box-border bg-cover bg-norepeat bg-right-hero">
      <div className="flex content-center justify-center flex-wrap box-border bg-hero-gradient">
        <div className="py-7 px-10 max-w-screen-xl w-full z-0 box-border">
          <section className="original-header content-wrapper flex flex-wrap box-border text-white justify-center md:flex-nowrap">
            <div className="poster-wrapper h-auto w-300px min-w-300px border-0 overflow-hidden rounded-lg box-border flex text-white items-center">
              <div className="poster text-white block min-w-300px w-300px h-450px relative top-0 left-0 box-border">
                <div className="image-content backdrop text-white w-full min-w-full h-full box-border">
                  <img
                    className="block w-full min-w-full h-full min-h-full border-0 outline-none text-whit rounded-lg"
                    onError={addDefaultSrc}
                    src={gameCover2 ? `https:${gameCover}` : `https:${gameCover2}`}
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
                      ({formatDate(released)})
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
                          stroke="black"
                          r="28"
                          cx="28"
                          cy="28"
                        />
                        <circle
                          className="progress-ring__circle w-65px h-65px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="2.2"
                          strokeDasharray="175"
                          strokeDashoffset={175 - (175 * metacritic) / 100}
                          strokeLinecap="round"
                          stroke={(() => {
                            if (metacritic >= 95) {
                              return 'gold';
                            }
                            if (metacritic >= 70) {
                              return '#21d07a';
                            }
                            if (metacritic >= 55) {
                              return '#d2d531';
                            }
                            return 'red';
                          })()}
                          r="28"
                          cx="28"
                          cy="28"
                        />
                      </svg>
                      <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
                        <h2 className="pl-px pt-px text-xs items-center justify-center text-center whitespace-normal">
                          {metacritic}
                          <span className="text-0.4rem">%</span>
                        </h2>
                      </div>
                    </div>
                    <div className="text font-bold ml-1.5 whitespace-pre-line text-white box-border list-none">
                      User
                      <br />
                      Score
                    </div>
                  </li>
                  <WatchlistBtn listToAdd={toPlay} />
                  <FavouriteBtn listToAdd={favourites} />
                  <WatchedBtn listToAdd={played} />
                </ul>
                <div className="details text-white w-full box-border">
                  <h3 className="tagline text-gray-500 m-0 p-0 text-1.1em font-normal italic w-full box-border">
                    {tagline}
                  </h3>
                  <h3 className="description mt-2.5 text-whitew-full mb-2 font-semibold text-1.3em p-0 box-border">
                    Overview
                  </h3>
                  <div className="text-white box-border">
                    <p className="m-0 text-white text-1em p-0 box-border">{description}</p>
                  </div>
                  <KeyFacts id={id} />
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

GameHero.propTypes = {
  name: PropTypes.string.isRequired,
  released: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

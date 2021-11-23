/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Game({ name, metacritic, released, id }) {
  const [gameCover, setGameCover] = useState('');

  useEffect(() => {
    const fetchGameCover = async () => {
      try {
        const response = await fetch(`https://guarded-mesa-01224.herokuapp.com/api/search/${name}`);
        const json = await (await response).json();
        setGameCover(json.pageOfItems[0].cover.url);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchGameCover();
  }, []);

  function addDefaultSrc(e) {
    e.target.src = '/images/Consume-C.jpg';
  }

  return (
    <div className="media-item game ml-10 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
      <Link to={`/Game/${id}/${name}`}>
        <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
          <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
            <p className="image inline-block w-full h-full whitespace-nowrap" href="/" name={name}>
              <img
                className="poster inline-block w-full h-full outline-none border-none"
                onError={addDefaultSrc}
                src={`https:${gameCover}`}
                alt={name}
              />
            </p>
          </div>
        </div>
      </Link>
      <div className="game-info pt-6 pb-0 px-2.5 relative whitespace-normal grid content-start w-full">
        <Link to={`/Game/${id}/${name}`}>
          <h2 className="m-0 p-0 w-full font-bold break-words text-1em no-underline">{name}</h2>
        </Link>
        <div className="absolute -top-5 left-2.5 inline-block whitespace-normal">
          <div className="outer-ring mr-0 w-38px h-38px p-0.5 rounded-50% inline-block whitespace-normal bg-black">
            <div className="relative inline-block w-full h-full text-center">
              <div className="w-full h-full flex items-center justify-center text-center whitespace-normal">
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
                      strokeDashoffset={120 - (120 * metacritic) / 100}
                      strokeLinecap="round"
                      stroke={(() => {
                        if (metacritic >= 95) {
                          return 'gold';
                        }
                        if (metacritic >= 70) {
                          return '#21d07a';
                        }
                        if (metacritic >= 50) {
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
                      {metacritic}
                      <span className="text-0.4rem">%</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="m-0 p-0 whitespace-normal font-normal">{released}</p>
      </div>
    </div>
  );
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  released: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

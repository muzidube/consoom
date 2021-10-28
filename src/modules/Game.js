// const clientID = 'fptl3q5j5e6ek4dksjm3yc7k76ssme';
// const clientSecret = 'jx1k7eugki5syoe89foqb1pu3abw2e';
// const accessToken: "lfyls55r1xpoo8n4kc6a954dssuawg";

// https://id.twitch.tv/oauth2/token?client_id=fptl3q5j5e6ek4dksjm3yc7k76ssme&client_secret=0iczb5af3ee2mvyhca4d6yk2v67zi8&grant_type=client_credentials

// https://id.twitch.tv/oauth2/token?client_id=fptl3q5j5e6ek4dksjm3yc7k76ssme&client_secret=f8ftd032zkmnepwbcfgaotgm42ufr3&grant_type=client_credentials

// https://id.twitch.tv/oauth2/token?client_id=fptl3q5j5e6ek4dksjm3yc7k76ssme&client_secret=fofofofofofffo&code=sasdasdasdasdad&grant_type=first_release_dateization_code&redirect_uri=http://localhost

/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import * as URLS from './urls';
import getGameCovers from './getGameCovers';

const Game = ({ name, cover, rating, first_release_date, description, id }) => (
  <div className="game ml-10 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
    <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
      <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
        <a className="image inline-block w-full h-full whitespace-nowrap" href="/" name={name}>
          <img
            className="poster inline-block w-full h-full outline-none border-none"
            src={getGameCovers(cover)}
            alt={name}
          />
        </a>
      </div>
    </div>
    <div className="game-info pt-6 pb-0 px-2.5 relative whitespace-normal flex flex-wrap content-start w-full">
      <h2 className="m-0 p-0 w-full font-bold break-words text-1em no-underline">{name}</h2>
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
                    strokeDashoffset={120 - (120 * (rating * 10)) / 100}
                    strokeLinecap="round"
                    stroke={(() => {
                      if (rating >= 9.5) {
                        return 'gold';
                      }
                      if (rating >= 7) {
                        return '#21d07a';
                      }
                      if (rating >= 5) {
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
                    {rating * 10}
                    <span className="text-0.4rem">%</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 p-0 whitespace-normal">{first_release_date}</p>
    </div>
    {/* <div className="description">
      <h3>Description</h3>
      {description}
      <br />
      <button type="button" className="know-more" id={id}>
        Know More
      </button>
    </div> */}
  </div>
);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  first_release_date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Game;

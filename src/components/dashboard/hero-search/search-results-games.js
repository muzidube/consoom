/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SearchResultGame({ name, metacritic, description, id }) {
  const [gameCover, setGameCover] = useState('');
  const [gameCover2, setGameCover2] = useState('');
  useEffect(() => {
    const fetchGameCover = async () => {
      try {
        const response = await fetch(`https://guarded-mesa-01224.herokuapp.com/api/search/${name}`);
        const json = await (await response).json();
        setGameCover2(await json.pageOfItems[0].cover.url);
        setGameCover(
          (await json.pageOfItems.find((item) => item.name === name).cover.url) || gameCover2
        );
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchGameCover();
  }, [name]);

  function addDefaultSrc(e) {
    e.target.src = '/images/Consoom-Thick-fa.jpg';
    e.target.style.backgroundImage = 'url(/images/red-lines.svg)';
  }

  return (
    <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
      <Link to={`/Game/${id}/${name}`}>
        <div className="thumbnail w-94px h-141px flex rounded-lg">
          <img
            className="w-94px h-141px rounded-lg"
            onError={addDefaultSrc}
            src={gameCover === null ? `https:${gameCover2}` : `https:${gameCover}`}
            alt={name}
          />
        </div>
      </Link>
      <div className="game-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
        <div className="flex">
          <Link to={`/Game/${id}/${name}`}>
            <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{name}</h2>
          </Link>
          <h2 className="text-1em whitespace-normal ml-2">
            {metacritic}
            <span className="text-0.4rem">%</span>
          </h2>
        </div>
        <p className="m-0 p-0 w-900px break-words text-1em no-underline">{description}</p>
      </div>
    </div>
  );
}

SearchResultGame.propTypes = {
  name: PropTypes.string.isRequired,
  metacritic: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

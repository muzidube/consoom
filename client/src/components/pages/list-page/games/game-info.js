/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Game from '../../../dashboard/game-row/Game';

export default function ShowGame({ id, released }) {
  const [game, setGame] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/gameAPI/single/${id}`);
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setGame(jsonObj);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchGame();
  }, []);

  return <Game key={game.id} {...game} released={released} />;
}

ShowGame.propTypes = {
  id: PropTypes.string.isRequired,
  released: PropTypes.string.isRequired
};

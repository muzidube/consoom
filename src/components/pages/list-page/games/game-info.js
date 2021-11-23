/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Game from '../../../dashboard/game-row/Game';

export default function ShowGame({ id, released }) {
  const [game, setGame] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}?key=335197e656a04bad8a99a8fef21b98b7`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  return <Game key={game.id} {...game} released={released} />;
}

ShowGame.propTypes = {
  id: PropTypes.string.isRequired,
  released: PropTypes.string.isRequired
};

// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Game from '../../../dashboard/game-row/Game';

// export default function ShowGame({ id }) {
//   const [game, setGame] = useState([]);

//   useEffect(() => {
//     const fetchGameDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.thegamedb.org/3/game/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
//         );
//         const json = await (await response).json();
//         setGame(json);
//       } catch (error) {
//         console.log('Error: ', error);
//       }
//     };

//     fetchGameDetails();
//   }, []);

//   return <Game key={game.id} {...game} />;
// }

// ShowGame.propTypes = {
//   id: PropTypes.number.isRequired
// };

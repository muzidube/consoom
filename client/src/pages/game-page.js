import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import GameHero from '../components/pages/game-page/game-hero';

export default function GamePage() {
  const { id } = useParams();

  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const [bg, setBG] = useState('');
  const [gameCover, setGameCover] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/gameAPI/single/${id}`
        );
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setGame(jsonObj);
        setDescription(
          jsonObj.description
            .replace(/(<([^>]+)>)/gi, '')
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
        );
        setBG(jsonObj.background_image);
        document.title = jsonObj.name;
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchGameCover = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/gameAPI/${decodeURI(
            document.URL.split('/')[5]
          )}`
        );
        const json = await response.json();
        setGameCover(json);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchGame();
    fetchGameCover();
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mx-auto justify-center items-center">
        <GameHero key={game.id} {...game} description={description} bg={bg} gameCover={gameCover} />
      </main>
    </div>
  );
}

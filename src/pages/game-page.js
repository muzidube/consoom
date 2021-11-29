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
    fetch(`https://api.rawg.io/api/games/${id}?key=335197e656a04bad8a99a8fef21b98b7`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setDescription(
          data.description
            .replace(/(<([^>]+)>)/gi, '')
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
        );
        setBG(data.background_image);
        document.title = data.name;
      });
    // const fetchGameCover = async () => {
    //   try {
    //     const response = await fetch(`/api/gameAPI/${decodeURI(document.URL.split('/')[5])}`);
    //     const json = await response.json();
    //     setGameCover(json);
    //   } catch (error) {
    //     // console.log('Error: ', error);
    //   }
    // };
    // fetchGameCover();
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <GameHero key={game.id} {...game} description={description} bg={bg} />
      </main>
    </div>
  );
}

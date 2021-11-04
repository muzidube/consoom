import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import GameHero from '../components/game-page/game-hero';
import ShowCast from '../components/game-page/show-cast';

export default function GamePage() {
  const [game, setGame] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();

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
        document.title = data.name;
      });
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <GameHero key={game.id} {...game} description={description} />
        {/* <ShowCast id={id} /> */}
      </main>
    </div>
  );
}

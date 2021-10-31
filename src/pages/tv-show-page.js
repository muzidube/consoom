import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ShowCast from '../components/tv-page/show-cast';
import TVShowHero from '../components/tv-page/tv-hero';

export default function TVPage() {
  const [tv, setTV] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setTV(data);
      });
  }, []);

  useEffect(() => {
    document.title = tv.original_title;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <TVShowHero key={tv.id} {...tv} />
        <ShowCast id={id} />
      </main>
    </div>
  );
}

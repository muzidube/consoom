import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ShowCast from '../components/pages/tv-page/show-cast';
import TVShowHero from '../components/pages/tv-page/tv-hero';

export default function TVPage() {
  const [tv, setTV] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await fetch(`/api/tvAPI/single/${id}`);
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setTV(jsonObj);
        document.title = jsonObj.name;
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchTV();
  }, [id]);

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

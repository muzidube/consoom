import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import ShowCast from '../components/pages/tv-page/show-cast';
import TVShowHero from '../components/pages/tv-page/tv-hero';

export default function TVPage() {
  const { id } = useParams();

  const [tv, setTV] = useState('');
  const [bg, setBG] = useState('');

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tvAPI/single/${id}`);
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setTV(jsonObj);
        setBG(jsonObj.backdrop_path);
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
        <TVShowHero key={tv.id} {...tv} bg={bg} />
        <ShowCast id={id} />
      </main>
    </div>
  );
}

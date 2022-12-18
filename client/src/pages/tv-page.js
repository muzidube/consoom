import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import Header from '../components/header';
import ShowCast from '../components/pages/tv-page/show-cast';
import TVShowHero from '../components/pages/tv-page/tv-hero';

export default function TVPage() {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchTV();
  }, [id]);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mx-auto justify-center items-center">
        {isLoading ? (
          <div className="min-v-screen min-h-screen flex items-center justify-center">
            <MoonLoader loading color="#000" size={40} />
          </div>
        ) : (
          <div>
            <TVShowHero key={tv.id} {...tv} bg={bg} />
            <ShowCast id={id} />
          </div>
        )}
      </main>
    </div>
  );
}

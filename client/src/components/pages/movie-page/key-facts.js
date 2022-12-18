import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const KeyFacts = () => {
  const { id } = useParams();

  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [screenplay, setScreenplay] = useState('');
  const [budget, setBudget] = useState('');
  const [revenue, setRevenue] = useState('');

  const mountedRef = useRef(true);

  useEffect(() => {
    if (mountedRef.current) {
      const fetchCrew = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/movieAPI/crew/${id}`
          );
          const json = await response.json();
          const jsonObj = JSON.parse(json);
          setDirector(jsonObj.filter((el) => el.job === 'Director')[0].name);
          setProducer(jsonObj.filter((el) => el.job === 'Producer')[0].name);
          setScreenplay(jsonObj.filter((el) => el.job === 'Screenplay')[0].name);
        } catch (error) {
          console.log('Error: ', error);
        }
      };

      const fetchMovie = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/movieAPI/single/${id}`
          );
          const json = await response.json();
          const jsonObj = JSON.parse(json);
          setBudget(jsonObj.budget);
          setRevenue(jsonObj.revenue);
        } catch (error) {
          console.log('Error: ', error);
        }
      };
      fetchMovie();
      fetchCrew();
    }
  }, [id]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return (
    <ol className="text-white m-0 mt-5 content-start flex flex-wrap list-none list-inside p-0 relative top-0 left-0 box-border">
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {screenplay}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Screenplay, Story
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {director}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Director
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {producer}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Producer
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 md:pt-5 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {budget}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Budget
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 pt-5 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {revenue}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Revenue
        </p>
      </li>
    </ol>
  );
};

export default KeyFacts;

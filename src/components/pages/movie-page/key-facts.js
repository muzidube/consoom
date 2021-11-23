import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const KeyFacts = ({ id }) => {
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [screenplay, setScreenplay] = useState('');
  const [budget, setBudget] = useState('');
  const [revenue, setRevenue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
        );
        const json = await (await response).json();
        setDirector(json.crew.filter((el) => el.job === 'Director')[0].name);
        setProducer(json.crew.filter((el) => el.job === 'Producer')[0].name);
        setScreenplay(json.crew.filter((el) => el.job === 'Screenplay')[0].name);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
        );
        const json = await (await response).json();
        setBudget(json.budget);
        setRevenue(json.revenue);
        setScreenplay(json.crew.filter((el) => el.job === 'Screenplay')[0].name);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

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

KeyFacts.propTypes = {
  id: PropTypes.number.isRequired
};

export default KeyFacts;

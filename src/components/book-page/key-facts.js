import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const KeyFacts = ({ id }) => {
  const [director, setDirector] = useState('');
  let screenplay;
  let producer;
  let budget;
  let revenue;

  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      setDirector(data.crew.filter((el) => el.job === 'Director')[0].name);
      // producer = data.crew.filter((el) => el.job === 'Producer')[0].name;
      // screenplay = data.crew.filter((el) => el.job === 'Screenplay')[0].name;
    });

  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       budget = data.budget;
  //       revenue = data.revenue;
  //     });

  console.log('id: ', id);
  return (
    <ol className="text-white m-0 mt-5 content-start flex flex-wrap list-none list-inside p-0 relative top-0 left-0 box-border">
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {director}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Screenplay, Story
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          Director Person
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Director
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          Producer Person
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Producer
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 pt-5 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          Budget Thing
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Budget
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 pt-5 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          Revenue Thing
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

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const KeyFacts = ({ id }) => {
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=335197e656a04bad8a99a8fef21b98b7`
        );
        const json = await (await response).json();
        setDeveloper(json.developers[0].name);
        setPublisher(json.publishers[0].name);
        setGenre(json.genres[0].name);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ol className="text-white m-0 mt-5 content-start flex flex-wrap list-none list-inside p-0 relative top-0 left-0 box-border">
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {developer}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Developer
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {publisher}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Publisher
        </p>
      </li>
      <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
        <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
          {genre}
        </p>
        <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
          Genre
        </p>
      </li>
    </ol>
  );
};

KeyFacts.propTypes = {
  id: PropTypes.number.isRequired
};

export default KeyFacts;

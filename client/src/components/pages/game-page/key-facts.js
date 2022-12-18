import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const KeyFacts = ({ id }) => {
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');

  const mountedRef = useRef(true);

  useEffect(() => {
    if (mountedRef.current) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/gameAPI/single/${id}`
          );
          const json = await response.json();
          const jsonObj = JSON.parse(json);
          setDeveloper(jsonObj.developers[0].name);
          setPublisher(jsonObj.publishers[0].name);
          setGenre(jsonObj.genres[0].name);
        } catch (error) {
          console.log('Error: ', error);
        }
      };

      fetchData();
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

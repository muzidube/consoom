/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TV from '../../../dashboard/tv-row/TV';

export default function ShowTV({ id, first_air_date }) {
  const [tv, setTV] = useState([]);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=0375f153b709c9b683ba71849a873283&language=en-US`
        );
        const json = await (await response).json();
        setTV(json);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchTVDetails();
  }, []);

  return <TV key={tv.id} {...tv} first_air_date={first_air_date} />;
}

ShowTV.propTypes = {
  id: PropTypes.string.isRequired,
  first_air_date: PropTypes.string.isRequired
};

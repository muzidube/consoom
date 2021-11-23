/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

export default function List({ title, type }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="media-item movie ml-10 w-150px min-w-150px bg-transparent mt-0 border-none shadow-none rounded-lg overflow-visible mt-0 relative top-0 left-0 flex flex-wrap content-start whitespace-nowrap">
      <Link to={`/list/${user.username}/${type}/${title}`}>
        <div className="image shadow-md rounded-lg w-full h-225px overflow-hidden bg-grey-background whitespace-nowrap">
          <div className="wrapper w-full h-full relative top-0 left-0 inline-block whitespace-nowrap">
            <p
              className="image inline-block w-full h-full whitespace-nowrap"
              href="/"
              title={title}
            >
              <img
                className="poster inline-block w-full h-full outline-none border-none"
                src="/images/Consume-C.jpg"
                alt={title}
              />
            </p>
          </div>
        </div>
      </Link>
      <div className="movie-info pt-6 pb-0 px-2.5 relative whitespace-normal grid content-start w-full justify-center">
        <Link to={`/list/${type}/${title}`}>
          <h2 className="m-0 p-0 w-full font-bold break-words text-1em no-underline">{title}</h2>
        </Link>
      </div>
    </div>
  );
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

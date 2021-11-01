/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URLS from '../../../constants/urls';

const SearchResultBook = ({
  title,
  book_image,
  author,
  release_date,
  overview,
  primary_isbn10
}) => (
  <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
    <Link to={`/book/${primary_isbn10}`}>
      <div className="thumbnail w-94px h-141px flex rounded-lg">
        <img className="w-94px h-141px rounded-lg" src={book_image} alt={title} />
      </div>
    </Link>
    <div className="book-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
      <div className="flex">
        <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{title}</h2>
        {/* <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white"> */}
        <h2 className="text-1em whitespace-normal ml-2">{author}</h2>
      </div>
      <p className="m-0 p-0 w-900px break-words text-1em no-underline">{overview}</p>
      {/* </div> */}
    </div>
  </div>
);

SearchResultBook.propTypes = {
  title: PropTypes.string.isRequired,
  book_image: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  primary_isbn10: PropTypes.string.isRequired
};

export default SearchResultBook;

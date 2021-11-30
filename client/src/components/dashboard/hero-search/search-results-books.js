/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResultBook = ({ title, book_image, author, textSnippet, primary_isbn10 }) => (
  <div className="result-container min-w-94px border-none shadow-none rounded-lg p-2 items-center flex">
    <Link to={`/Book/${primary_isbn10}/${title}`}>
      <div className="thumbnail w-94px h-141px flex rounded-lg">
        <img className="w-94px h-141px rounded-lg" src={book_image} alt={title} />
      </div>
    </Link>
    <div className="book-info w-auto h-full whitespace-normal content-start text-black grid ml-4">
      <div className="flex">
        <Link to={`/Book/${primary_isbn10}/${title}`}>
          <h2 className="m-0 p-0 w-auto font-bold break-words text-1em no-underline">{title}</h2>
        </Link>
        <h2 className="text-1em whitespace-normal ml-2 italic">{author}</h2>
      </div>
      <p className="m-0 p-0 w-900px break-words text-1em no-underline">{textSnippet}</p>
    </div>
  </div>
);

SearchResultBook.propTypes = {
  title: PropTypes.string.isRequired,
  book_image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  textSnippet: PropTypes.string.isRequired,
  primary_isbn10: PropTypes.string.isRequired
};

export default SearchResultBook;

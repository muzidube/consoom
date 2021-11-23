/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Book from '../../../dashboard/book-row/Book';

export default function ShowBook({ id, author }) {
  const [book, setBook] = useState([]);
  const [title, setTitle] = useState('');
  const [book_Image, setBookImage] = useState('');
  const [ISBN_13, setISBN_13] = useState('');
  const [averageRating, setAverageRating] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`);
        const json = await (await response).json();
        setBook(json.items[0].volumeInfo);
        setTitle(json.items[0].volumeInfo.title);
        setISBN_13(json.items[0].volumeInfo.industryIdentifiers[0].identifier);
        setBookImage(json.items[0].volumeInfo.imageLinks.thumbnail);
        setAverageRating(json.items[0].volumeInfo.averageRating);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Book
      key={book.id}
      {...book}
      title={title}
      book_image={book_Image}
      author={author}
      primary_isbn10={ISBN_13}
      averageRating={averageRating}
    />
  );
}

ShowBook.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

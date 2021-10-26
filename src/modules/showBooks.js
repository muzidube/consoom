import { useEffect, useState } from 'react';
import Book from './Book';

export default function ShowBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=UPuY68Msfri67IaGyCwdzwtfzpnWTGJ1'
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results.books);
      });
  }, []);

  return (
    <div className="container book-container w-full flex justify-center flex-wrap items-start content-start">
      <div className="h-auto w-full max-w-screen-lg overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
        {books.length > 0 && books.map((book) => <Book key={book.primary_isbn10} {...book} />)}
      </div>
    </div>
  );
}

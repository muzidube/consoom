/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import BookHero from '../components/book-page/book-hero';

export default function BookPage() {
  const [book, setBook] = useState('');
  const [ISBN_13, setISBN_13] = useState('');
  const [textSnippet, setTextSnippet] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [book_Image, setBookImage] = useState('');
  const { primary_isbn10 } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${primary_isbn10}`
        );
        const json = await (await response).json();
        document.title = json.items[0].volumeInfo.title;
        setBook(json.items[0].volumeInfo);
        setISBN_13(json.items[0].volumeInfo.industryIdentifiers[0].identifier);
        setTextSnippet(
          decodeURI(json.items[0].searchInfo.textSnippet)
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
        );
        setAuthor(json.items[0].volumeInfo.authors[0]);
        setPageCount(json.items[0].volumeInfo.pageCount);
        setBookImage(json.items[0].volumeInfo.imageLinks.thumbnail);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <main className="mt-16 mx-auto justify-center items-center">
        <BookHero
          key={book.primary_isbn10}
          {...book}
          ISBN_13={ISBN_13}
          author={author}
          textSnippet={textSnippet}
          pageCount={pageCount}
          book_Image={book_Image}
        />
      </main>
    </div>
  );
}

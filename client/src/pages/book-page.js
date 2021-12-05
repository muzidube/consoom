/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import BookHero from '../components/pages/book-page/book-hero';

export default function BookPage() {
  const [book, setBook] = useState('');
  const [ISBN_13, setISBN_13] = useState('');
  const [textSnippet, setTextSnippet] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [book_Image, setBookImage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`);
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
      <main className="mx-auto justify-center items-center">
        <BookHero
          key={book.id}
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

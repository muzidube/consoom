import { useEffect, useState } from 'react';
import Book from './Book';

export default function ShowBooks() {
  const [fictionBooks, setFictionBooks] = useState([]);
  const [nonFictionBooks, setNonFictionBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchFictionBooks = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=UPuY68Msfri67IaGyCwdzwtfzpnWTGJ1`
        );
        const json = await (await response).json();
        setFictionBooks(json.results.books);
        setBooks(json.results.books);
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    const fetchNonFictionBooks = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=UPuY68Msfri67IaGyCwdzwtfzpnWTGJ1`
        );
        const json = await (await response).json();
        setNonFictionBooks(json.results.books);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchNonFictionBooks();
    fetchFictionBooks();
  }, []);

  return (
    <section className="max-w-screen-xl flex flex-wrap justify-center items-start content-start w-full box-border bg-cover bg-no-repeat bg-50-50 p-0 text-black text-1rem mx-auto">
      <div className="column-wrapper w-full flex justify-center items-start content-start box-border text-black">
        <div className="content-wrapper px-0 pb-0 mb-0 box-border text-black max-w-screen-xl w-full flex flex-wrap items-start content-start pt-7">
          <div className="column w-full box-border text-black text-1em font-semibold p-0 box-border text-black">
            <div className="column-header px-10 flex flex-wrap justify-start items-center content-center box-border text-black">
              <h2 className="m-0 mr-5 whitespace-nowrap text-1.5em">Books</h2>
              <div className="selector-wrap box-border text-black py-1.5">
                <div className="selector flex justify-start items-stretch content-center border rounded-3xl border-red-primary box-border text-black">
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setBooks(fictionBooks)}
                      >
                        Fiction
                      </button>
                    </h3>
                  </div>
                  <div className="anchor relative top-0 left-0 z-1 box-border text-black">
                    <h3 className="m-0 inline-flex content-center items-center justify-center text-1em py-1 px-5 whitespace-nowrap font-semibold">
                      <button
                        type="button"
                        className="no_click text-red-primary font-semibold decoration-none box-border bg-transparent"
                        onClick={() => setBooks(nonFictionBooks)}
                      >
                        Non-Fiction
                      </button>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="book-container container max-w-screen-xl w-full flex justify-center flex-wrap items-start content-start mx-auto">
                <div className="media-inner-container h-auto w-full overflow-x-scroll overflow-y-hidden flex justify-start items-start content-start whitespace-nowrap py-5">
                  {books.length > 0 &&
                    books.map((book) => <Book key={book.primary_isbn10} {...book} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

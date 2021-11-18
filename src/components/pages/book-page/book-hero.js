/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import bookHeroBG from './book-hero-bg';
import WatchlistBtn from '../watchlist-btn';
import FavouriteBtn from '../favourite-btn';
import WatchedBtn from '../watched-btn';

export default function BookHero({
  title,
  averageRating,
  publishedDate,
  description,
  textSnippet,
  ISBN_13,
  author,
  pageCount,
  book_Image,
  id
}) {
  useEffect(() => {
    bookHeroBG(id);
  }, []);

  function addDefaultSrc(e) {
    e.target.src = book_Image;
  }

  const toRead = 'Books - To Read';
  const favourites = 'Books - Favourites';
  const read = 'Books - Read';
  return (
    <div className="hero w-full relative z-1 box-border bg-cover bg-norepeat bg-right-hero">
      <div className="flex content-center justify-center flex-wrap box-border bg-hero-gradient">
        <div className="py-7 px-10 max-w-screen-xl w-full z-0 box-border">
          <section className="original-header content-wrapper flex flex-nowrap box-border text-white">
            <div className="poster-wrapper h-auto w-300px min-w-300px border-0 overflow-hidden rounded-lg box-border flex text-white items-center">
              <div className="poster text-white block min-w-300px w-300px h-450px relative top-0 left-0 box-border">
                <div className="image-content backdrop text-white w-full min-w-full h-full box-border">
                  <img
                    className="block w-full min-w-full h-full min-h-full border-0 outline-none text-whit rounded-lg"
                    onError={addDefaultSrc}
                    src={`https://storage.googleapis.com/du-prd/books/images/${ISBN_13}.jpg`}
                    alt={title}
                  />
                </div>
              </div>
            </div>
            <div className="info text-white flex box-border">
              <section className="text-white flex flex-wrap items-start content-center box-border pl-10">
                <div className="title text-white w-full mb-6 flex flex-wrap box-border">
                  <h2 className="text-white w-full m-0 p-0 text-4xl flex font-semibold box-border items-center">
                    <p className="text-white font-bold decoration-none box-border bg-transparent text-4xl">
                      {title}
                    </p>
                    <span className="font-normal text-gray-600 box-border text-3xl ml-3">
                      ({publishedDate})
                    </span>
                  </h2>
                </div>
                <ul className="actions text-white m-0 p-0 mb-5 w-full h-68px flex items-center content-start list-none box-border">
                  <li className="h-full bg-transparent inline-flex items-center justify-center box-border mr-5 text-white list-none">
                    <div className="percent relative w-65px h-65px">
                      <svg className="progress-ring relative w-65px h-65px transform -rotate-90">
                        <circle
                          className="progress-ring__circle w-65px h-65px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="3"
                          strokeDasharray="175"
                          strokeDashoffset="0"
                          stroke="black"
                          r="28"
                          cx="28"
                          cy="28"
                        />
                        <circle
                          className="progress-ring__circle w-65px h-65px transform translate-x-5px translate-y-5px fill-none"
                          strokeWidth="2.2"
                          strokeDasharray="175"
                          strokeDashoffset={175 - (175 * (averageRating * 10)) / 100}
                          strokeLinecap="round"
                          stroke={(() => {
                            if (averageRating >= 9.5) {
                              return 'gold';
                            }
                            if (averageRating >= 7) {
                              return '#21d07a';
                            }
                            if (averageRating >= 5) {
                              return '#d2d531';
                            }
                            return 'red';
                          })()}
                          r="28"
                          cx="28"
                          cy="28"
                        />
                      </svg>
                      <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
                        <h2 className="pl-px pt-px text-xs items-center justify-center text-center whitespace-normal">
                          {averageRating * 10}
                          <span className="text-0.4rem">%</span>
                        </h2>
                      </div>
                    </div>
                    <div className="text font-bold ml-1.5 whitespace-pre-line text-white box-border list-none">
                      User
                      <br />
                      Score
                    </div>
                  </li>
                  <WatchlistBtn listToAdd={toRead} />
                  <FavouriteBtn listToAdd={favourites} />
                  <WatchedBtn listToAdd={read} />
                </ul>
                <div className="details text-white w-full box-border">
                  <h3 className="textSnippet text-gray-500 m-0 p-0 text-1.1em font-normal italic w-full box-border">
                    {textSnippet}
                  </h3>
                  <h3 className="description mt-2.5 text-whitew-full mb-2 font-semibold text-1.3em p-0 box-border">
                    Overview
                  </h3>
                  <div className="text-white box-border">
                    <p className="m-0 text-white text-1em p-0 box-border">{description}</p>
                  </div>
                  <ol className="text-white m-0 mt-5 content-start flex flex-wrap list-none list-inside p-0 relative top-0 left-0 box-border">
                    <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
                      <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
                        {author}
                      </p>
                      <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
                        Author
                      </p>
                    </li>
                    <li className="profile bg-transparent h-auto mb-0 text-white w-33% text-left mr-0 box-border pr-5 min-w-140px list-none list-inside">
                      <p className="text-white p-0 text-1em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside font-bold decoration-none bg-transparent">
                        {pageCount}
                      </p>
                      <p className="text-white p-0 text-0.9em m-0 overflow-hidden overflow-ellipsis box-border text-left list-none list-inside decoration-none bg-transparent">
                        Page Count
                      </p>
                    </li>
                  </ol>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

BookHero.propTypes = {
  title: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  textSnippet: PropTypes.string.isRequired,
  ISBN_13: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  book_Image: PropTypes.string.isRequired,
  pageCount: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

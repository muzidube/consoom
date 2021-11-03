/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-onchange */
import { useState, useEffect, useRef, useParams } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import axios from 'axios';
import MoonLoader from 'react-spinners/MoonLoader';
import Select from 'react-select';
import SearchContent from './search-content';
import useDebounce from '../../../hooks/debounce-hook';
import SearchResultMovie from './search-results-movies';
import SearchResultTV from './search-results-tv';
import SearchResultBook from './search-results-books';
import SearchResultGame from './search-results-games';
import Movie from '../movie-row/Movie';

const containerVariants = {
  expanded: {
    height: '14em'
  },
  collapsed: {
    height: '2.75rem'
  }
};
export default function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [dropdownOption, setDropdownOption] = useState('');
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();

  const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isEmpty = !searchResults || searchResults.length === 0;

  const [book, setBook] = useState('');
  const [ISBN_13, setISBN_13] = useState('');
  const [textSnippet, setTextSnippet] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState('');

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    setSearchResults([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const prepareSearchQuery = (query) => {
    let url;
    if (dropdownOption === 'Movie') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=0375f153b709c9b683ba71849a873283&language=en-US&query=${query}&page=1&include_adult=false`;
    } else if (dropdownOption === 'TV Show') {
      url = `https://api.themoviedb.org/3/search/tv?api_key=0375f153b709c9b683ba71849a873283&language=en-US&query=${query}&page=1&include_adult=false`;
    } else if (dropdownOption === 'Book') {
      url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;
    } else if (dropdownOption === 'Game') {
      url = `https://api.themoviedb.org/3/search/tv?api_key=0375f153b709c9b683ba71849a873283&language=en-US&query=${query}&page=1&include_adult=false`;
    }
    return encodeURI(url);
  };

  const dropdownHandler = (value) => {
    console.log('Value: ', value.value);
    setDropdownOption(value.value);
  };

  const dropdownOptions = [
    { label: 'Movie', value: 'Movie' },
    { label: 'TV Show', value: 'TV Show' },
    { label: 'Book', value: 'Book' },
    { label: 'Game', value: 'Game' }
  ];

  const searchTVShow = async () => {
    if (!searchQuery || searchQuery.trim() === '');

    setLoading(true);

    const URL = prepareSearchQuery(searchQuery);

    if (dropdownOption === 'Book') {
      const response = await axios.get(URL).catch((err) => {
        console.log('Error: ', err);
      });

      if (response) {
        console.log(response.data.items[0].volumeInfo.imageLinks.thumbnail);
        setSearchResults(response.data.items);
      }
    } else {
      const response = await axios.get(URL).catch((err) => {
        console.log('Error: ', err);
      });

      if (response) {
        setSearchResults(response.data.results);
      }
    }

    setLoading(false);
  };

  const doesValueExist = (value) => {
    if (value === undefined || null) {
      return false;
    }
    return true;
  };

  const customStyles = {
    container: () => ({
      width: 200
    }),
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 'none'
    })
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);
  useDebounce(searchQuery, 1000, searchTVShow);

  return (
    <motion.div
      className="search-container mt-7  max-w-screen-xl w-full h-11 box-border text-white flex flex-col box-border bg-white rounded-3xl"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <form className="relative top-0 left-0 box-border text-white w-full items-center box-border">
        <label className="box-border text-white" htmlFor="search">
          <input
            className="search w-full h-11 leading-10 text-1.1em text-black border-none rounded-3xl px-5 py-2.5 box-border focus:outline-none"
            dir="auto"
            name="query"
            type="text"
            // tabIndex="1"
            autoCorrect="on"
            autoComplete="on"
            spellCheck="false"
            placeholder="Search for a movie, tv show, book or game..."
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
          />
        </label>
        <Select
          styles={customStyles}
          className="dropdown-menu inline-flex justify-center align-center content-center h-11 border-none rounded-3xl absolute -right-px text-black cursor-pointer leading-normal outline-none"
          options={dropdownOptions}
          onChange={dropdownHandler}
          isSearchable={false}
        />
        {/* <select
          className="dropdown-menu inline-flex justify-center align-center content-center h-11 py-2.5 px-6 border-none bg-red-primary rounded-3xl absolute top-0 -right-px text-white font-bold cursor-pointer leading-normal"
          onChange={dropdownHandler}
        >
          <option value="Movie" selected="selected">
            Movie
          </option>
          <option value="TV Show">TV Show</option>
          <option value="Book">Book</option>
          <option value="Game">Game</option>
        </select> */}
      </form>
      {/* <span className="search-separator flex min-w-full min-h-2px bg-gray-900" /> */}
      {/* <SearchContent>{isLoading}</SearchContent> */}
      {(() => {
        if (isExpanded && dropdownOption === 'Movie') {
          return (
            <>
              <span className="mt-1 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start ">
                {searchResults.map((searchResult) => (
                  <SearchResultMovie key={searchResult.id} {...searchResult} />
                ))}
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="loading-wrapper w-full h-full flex items-center justify-center">
                        <MoonLoader loading color="#000" size={20} />
                      </div>
                    );
                  }
                })()}
              </div>
            </>
          );
        }
      })()}
      {(() => {
        if (isExpanded && dropdownOption === 'TV Show') {
          return (
            <>
              <span className="mt-1 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start ">
                {searchResults.map((searchResult) => (
                  <SearchResultTV key={searchResult.id} {...searchResult} />
                ))}
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="loading-wrapper w-full h-full flex items-center justify-center">
                        <MoonLoader loading color="#000" size={20} />
                      </div>
                    );
                  }
                })()}
              </div>
            </>
          );
        }
      })()}
      {(() => {
        if (isExpanded && dropdownOption === 'Book') {
          return (
            <>
              <span className="mt-1 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start ">
                {searchResults.map((searchResult) => (
                  <SearchResultBook
                    key={searchResult.id}
                    {...searchResult}
                    title={
                      doesValueExist(searchResult.volumeInfo.title)
                        ? searchResult.volumeInfo.title
                        : 'Unknown'
                    }
                    author={
                      doesValueExist(searchResult.volumeInfo.authors)
                        ? searchResult.volumeInfo.authors[0]
                        : 'Unknown'
                    }
                    textSnippet={
                      doesValueExist(searchResult.searchInfo)
                        ? searchResult.searchInfo.textSnippet
                        : 'Unavailable'
                    }
                    primary_isbn10={
                      doesValueExist(searchResult.volumeInfo.industryIdentifiers)
                        ? searchResult.volumeInfo.industryIdentifiers[1].identifier
                        : 'Unknown'
                    }
                    book_image={
                      doesValueExist(searchResult.volumeInfo.imageLinks)
                        ? searchResult.volumeInfo.imageLinks.thumbnail
                        : null
                    }
                  />
                ))}
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="loading-wrapper w-full h-full flex items-center justify-center">
                        <MoonLoader loading color="#000" size={20} />
                      </div>
                    );
                  }
                })()}
              </div>
            </>
          );
        }
      })()}
      {(() => {
        if (isExpanded && dropdownOption === 'Game') {
          return (
            <>
              <span className="mt-1 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start ">
                {searchResults.map((searchResult) => (
                  <SearchResultMovie key={searchResult.id} {...searchResult} />
                ))}
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="loading-wrapper w-full h-full flex items-center justify-center">
                        <MoonLoader loading color="#000" size={20} />
                      </div>
                    );
                  }
                })()}
              </div>
            </>
          );
        }
      })()}
    </motion.div>
  );
}

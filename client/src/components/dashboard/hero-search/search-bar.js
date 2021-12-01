/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-onchange */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import Select from 'react-select';
import useDebounce from '../../../hooks/debounce-hook';
import SearchResultMovie from './search-results-movies';
import SearchResultTV from './search-results-tv';
import SearchResultBook from './search-results-books';
import SearchResultGame from './search-results-games';

const containerVariants = {
  expanded: {
    height: '14em'
  },
  collapsed: {
    height: '2.75rem'
  }
};
export default function SearchBar() {
  const [isExpanded, setExpanded] = useState(false);
  const [dropdownOption, setDropdownOption] = useState('');
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();

  const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
      url = `${process.env.REACT_APP_BACKEND_URL}/api/movieAPI/search/${query}`;
    } else if (dropdownOption === 'TV Show') {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/tvAPI/search/${query}`;
    } else if (dropdownOption === 'Book') {
      url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;
    } else if (dropdownOption === 'Game') {
      url = `${process.env.REACT_APP_BACKEND_URL}/api//gameAPI/gameInfo/${query}`;
    }
    return encodeURI(url);
  };

  const dropdownHandler = (value) => {
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
      const response = await fetch.get(URL).catch((err) => {
        console.log('Error: ', err);
      });

      if (response) {
        setSearchResults(response.data.items);
      }
    } else if (dropdownOption === 'Game') {
      const response = await fetch.get(URL).catch((err) => {
        console.log('Error: ', err);
      });
      if (response) {
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setSearchResults(jsonObj);
      }
    } else {
      const response = await fetch.get(URL).catch((err) => {
        console.log('Error: ', err);
      });

      if (response) {
        const json = await response.json();
        const jsonObj = JSON.parse(json);
        setSearchResults(jsonObj);
      } else {
        console.log('Error');
      }

      setLoading(false);
    }
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
      className="search-container mt-7  max-w-screen-xl w-full h-11 box-border text-white flex flex-col box-border bg-white rounded-3xl z-10"
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
            placeholder="Search..."
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
          />
        </label>
        <Select
          styles={customStyles}
          className="dropdown-menu inline-flex justify-center align-center content-center h-11 border-none rounded-3xl absolute -right-px text-black cursor-pointer leading-normal outline-none w-150px z-10"
          options={dropdownOptions}
          onChange={dropdownHandler}
          isSearchable={false}
        />
      </form>
      {(() => {
        if (isExpanded && dropdownOption === 'Movie') {
          return (
            <>
              <span className="mt-1 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start">
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
                  <SearchResultGame key={searchResult.id} {...searchResult} />
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

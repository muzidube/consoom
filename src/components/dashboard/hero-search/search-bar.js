import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import axios from 'axios';
import MoonLoader from 'react-spinners/MoonLoader';
import SearchContent from './search-content';
import useDebounce from '../../../hooks/debounce-hook';
import SearchResultMedia from './search-results';
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
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();

  const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isEmpty = !searchResults || searchResults.length === 0;

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
    console.log('isLoading: ', isLoading);
    if (inputRef.current) inputRef.current.value = '';
  };

  const prepareSearchQuery = (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=0375f153b709c9b683ba71849a873283&language=en-US&query=${query}&page=1&include_adult=false`;

    return encodeURI(url);
  };

  const searchTVShow = async () => {
    if (!searchQuery || searchQuery.trim() === '');

    setLoading(true);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log('Error: ', err);
    });

    if (response) {
      console.log('Response: ', response.data.results);
      setSearchResults(response.data.results);
      console.log('searchResults: ', searchResults);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);
  useDebounce(searchQuery, 500, searchTVShow);
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
        <input
          className="inline-flex justify-center align-center content-center h-11 py-2.5 px-6 border-none bg-red-primary rounded-3xl absolute top-0 -right-px text-white font-bold cursor-pointer leading-normal"
          type="submit"
          value="Search"
        />
      </form>
      {/* <span className="search-separator flex min-w-full min-h-2px bg-gray-900" /> */}
      {/* <SearchContent>{isLoading}</SearchContent> */}
      {(() => {
        if (isExpanded) {
          return (
            <>
              <span className="mt-3 search-separator flex min-w-full min-h-2px bg-gray-200" />
              <div className="w-full h-full flex flex-col p-1 text-black overflow-x-hidden overflow-y-scroll justify-start items-start content-start ">
                {searchResults.map((searchResult) => (
                  <SearchResultMedia key={searchResult.id} {...searchResult} />
                ))}
                {(() => {
                  if (isLoading) {
                    return (
                      <div className="loading-wrapper w-full h-full flex items-center justify-center">
                        <MoonLoader loading color="#000" size={20} />
                      </div>
                    );
                  }
                  if (!isLoading && !isEmpty) {
                    console.log('Success: ', searchResults);
                  }
                })()}
              </div>
            </>
          );
        }
        console.log('failuree');
      })()}
    </motion.div>
  );
}

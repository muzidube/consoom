import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  expanded: {
    height: '20em'
  },
  collapsed: {
    height: '2.75rem'
  }
};
export default function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
  };

  return (
    <input
      //   animate={isExpanded ? 'expanded' : 'collapsed'}
      //   variants={containerVariants}
      className="search w-full h-11 leading-10 text-1.1em text-black border-none rounded-3xl px-5 py-2.5 box-border focus:outline-none"
      dir="auto"
      name="query"
      type="text"
      // tabIndex="1"
      autoCorrect="on"
      autoComplete="on"
      spellCheck="false"
      placeholder="Search for a movie, tv show, book or game..."
      value=""
      onFocus={expandContainer}
    />
  );
}

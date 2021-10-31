import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';

export default function SearchContent() {
  return (
    <div className="w-full h-full flex flex-col p-1 text-black">
      <div className="loading-wrapper w-full h-full flex items-center justify-center">
        <MoonLoader loading color="#000" size={20} />
      </div>
    </div>
  );
}

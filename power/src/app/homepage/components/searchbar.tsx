// src/app/homepage/components/searchbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [isInNavbar, setIsInNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle scroll events to trigger search bar transformation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Move search bar to navbar when scrolling up
      if (scrollY < 100 && !isInNavbar) {
        setIsInNavbar(true);
      } 
      // Move search bar below navbar when scrolling down
      else if (scrollY > 100 && isInNavbar) {
        setIsInNavbar(false);
      }
      
      // Hide search bar when scrolling down a lot
      setIsVisible(scrollY < 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInNavbar]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={searchRef}
          className="z-40"
          animate={{
            top: isInNavbar ? '4rem' : '5rem',
            left: isInNavbar ? '50%' : '2rem',
            x: isInNavbar ? '-50%' : '0',
            width: isInNavbar ? 'auto' : '90%',
            maxWidth: isInNavbar ? '300px' : '600px',
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.form
            onSubmit={handleSearch}
            className="relative flex items-center bg-white/80 backdrop-blur-lg border border-white/30"
            animate={{
              borderRadius: isInNavbar ? '12px' : '20px',
              padding: isInNavbar ? '8px 16px' : '16px 20px',
              boxShadow: isInNavbar 
                ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              animate={{
                rotate: isInNavbar ? 0 : 15,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <MagnifyingGlassIcon className={`h-${isInNavbar ? '5' : '6'} w-${isInNavbar ? '5' : '6'} text-gray-500`} />
            </motion.div>
            
            <motion.input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={isInNavbar ? "Search..." : "Search for services, technicians, or issues..."}
              className={`bg-transparent outline-none text-gray-700 placeholder-gray-500 ${
                isInNavbar ? 'ml-2 w-40 text-sm' : 'ml-4 w-full text-lg'
              }`}
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className={`h-${isInNavbar ? '5' : '6'} w-${isInNavbar ? '5' : '6'}`} />
              </button>
            )}
            
            {!isInNavbar && (
              <motion.button
                type="submit"
                className="ml-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Search
              </motion.button>
            )}
          </motion.form>
          
          {/* Search suggestions dropdown - only shown when not in navbar */}
          {!isInNavbar && isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30"
            >
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Popular Searches</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['AC Repair', 'Plumbing', 'Electrician', 'Carpenter', 'TV Repair', 'Appliance Service'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        router.push(`/search?q=${encodeURIComponent(suggestion)}`);
                      }}
                      className="text-left px-4 py-3 rounded-xl hover:bg-white/50 text-sm text-gray-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
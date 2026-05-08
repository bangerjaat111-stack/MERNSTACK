import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import {
  FaSearch,
  FaRegUserCircle,
  FaCar,
  FaTags,
  FaRegNewspaper,
  FaVideo,
  FaHandHoldingUsd,
  FaBars,
  FaTimes,
  FaRegHeart,
  FaArrowRight
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const MENUDATA = [
    { icon: <FaCar />, name: 'NEW CARS', slug: '/new-cars' },
    { icon: <FaTags />, name: 'USED CARS', slug: '/used-cars' },
    { icon: <FaRegNewspaper />, name: 'NEWS & REVIEWS', slug: '/news' },
    { icon: <FaVideo />, name: 'VIDEOS', slug: '/videos' },
    { icon: <FaHandHoldingUsd />, name: 'SELL CAR', slug: '/sell' },
    
  ];

  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      
      {/* Top section: Logo, Search, Account & Wishlist */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo with hover scale */}
        <motion.div 
          className="flex-shrink-0 cursor-pointer flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src={logo} alt="AutoSyntax" className="h-10 w-auto" />
          
        </motion.div>

        {/* Enhanced search bar with focus animation */}
        <div className="hidden md:flex flex-1 max-w-2xl relative group">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${searchFocused ? 'text-[#0a2342]' : 'text-gray-400'}`}>
            <FaSearch className="text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by brand, model, or keyword..."
            className="w-full py-3 pl-12 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0a2342]/20 focus:border-[#0a2342] transition-all duration-300 bg-gray-50/50 hover:bg-white"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-[#0a2342] text-white hover:bg-[#1e3a6b] transition-all duration-300 hover:scale-105 active:scale-95">
            <FaSearch className="text-sm" />
          </button>
        </div>

        {/* Right section: Wishlist, Login, Mobile icons */}
        <div className="flex items-center gap-3">
          {/* Wishlist button */}
          <motion.button 
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Wishlist"
          >
            <FaRegHeart className="text-xl" />
          </motion.button>

          {/* Login / Register button */}
          <motion.button 
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-[#0a2342] border-2 border-[#0a2342] hover:bg-[#0a2342] hover:text-white transition-all duration-300 hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaRegUserCircle className="text-xl" />
            <span>Login / Register</span>
          </motion.button>

          {/* Mobile search icon */}
          <button className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-[#0a2342] transition-all duration-200">
            <FaSearch className="text-xl" />
          </button>

          {/* Hamburger menu toggle */}
          <motion.button
            className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center text-[#0a2342] hover:bg-gray-100 transition-all duration-200 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </motion.button>
        </div>
      </div>

      {/* Desktop bottom navigation with animated underline */}
      <div className="hidden md:block bg-gradient-to-r from-[#0a2342] to-[#122d4f] text-white shadow-inner">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-start gap-6 py-3">
            {MENUDATA.map((item, index) => (
              <motion.li
                key={index}
                className="relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <a
                  href={item.slug}
                  className="flex items-center gap-2 px-2 py-1 text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:text-blue-200"
                >
                  <span className="text-lg transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </motion.li>
            ))}
           
          </ul>
        </div>
      </div>

      {/* Mobile dropdown menu with glassmorphism and staggered animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden relative bg-gradient-to-b from-[#0a2342] to-[#0e2a4a] shadow-2xl overflow-hidden border-t border-blue-800/30"
          >
            <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
              <ul className="flex flex-col py-2 px-5">
                {MENUDATA.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                    className="border-b border-blue-800/40 last:border-0"
                  >
                    <a
                      href={item.slug}
                      className="flex items-center gap-4 py-4 text-base font-medium text-white/90 hover:text-white hover:pl-2 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl w-8">{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
                
                {/* Wishlist item for mobile */}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: MENUDATA.length * 0.05 }}
                  className="border-b border-blue-800/40"
                >
                  <button className="flex items-center gap-4 py-4 text-base font-medium text-white/90 hover:text-white hover:pl-2 transition-all duration-200 w-full">
                    <FaRegHeart className="text-xl w-8" />
                    <span>My Wishlist</span>
                  </button>
                </motion.li>

                {/* Mobile login button */}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (MENUDATA.length + 1) * 0.05 }}
                  className="pt-4 pb-2"
                >
                  <button className="flex items-center justify-center w-full gap-2 bg-white text-[#0a2342] py-3 rounded-xl font-bold shadow-lg">
                    <FaRegUserCircle className="text-xl" />
                    <span>Login / Register</span>
                  </button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
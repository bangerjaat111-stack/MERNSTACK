import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

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
  FaMoon,
  FaSun
} from "react-icons/fa";

export default function Navbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  // MENU LINKS
  const MENUDATA = [
    { icon: <FaCar />, name: 'NEW CARS', slug: '/new-cars' },

    { icon: <FaTags />, name: 'USED CARS', slug: '/used-cars' },

    { icon: <FaRegNewspaper />, name: 'NEWS & REVIEWS', slug: '/news' },

    { icon: <FaVideo />, name: 'VIDEOS', slug: '/videos' },

    { icon: <FaHandHoldingUsd />, name: 'SELL CAR', slug: '/sell' },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    },

    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1]
      }
    },

    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (

    <nav
      className={`w-full backdrop-blur-sm shadow-lg sticky top-0 z-50 transition-all duration-300 border-b
      ${darkMode
          ? 'bg-[#081120]/95 border-gray-700 text-white'
          : 'bg-white/95 border-gray-100 text-black'
        }`}
    >

      {/* TOP SECTION */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* LOGO */}
        <motion.div
          className="flex-shrink-0 cursor-pointer flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/">
            <img
              src={logo}
              alt="AutoSyntax"
              className="h-20 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex flex-1 max-w-2xl relative group">

          <div
            className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300
            ${searchFocused
                ? 'text-[#0a2342]'
                : darkMode
                  ? 'text-gray-400'
                  : 'text-gray-400'
              }`}
          >
            <FaSearch className="text-lg" />
          </div>

          <input
            type="text"
            placeholder="Search by brand, model, or keyword..."
            className={`w-full py-3 pl-12 pr-14 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#0a2342]/20 focus:border-[#0a2342] transition-all duration-300
            ${darkMode
                ? 'bg-[#111827] border-gray-700 text-white placeholder-gray-400 hover:bg-[#1a2332]'
                : 'bg-gray-50/50 border-gray-200 text-black hover:bg-white'
              }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />

          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-[#0a2342] text-white hover:bg-[#1e3a6b] transition-all duration-300 hover:scale-105 active:scale-95">
            <FaSearch className="text-sm" />
          </button>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

          {/* DARK MODE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 10 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
            ${darkMode
                ? 'bg-yellow-400 text-black'
                : 'bg-[#0a2342] text-white'
              }`}
          >

            <AnimatePresence mode="wait">

              {darkMode ? (

                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaSun className="text-lg" />
                </motion.div>

              ) : (

                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaMoon className="text-lg" />
                </motion.div>

              )}

            </AnimatePresence>

          </motion.button>

          {/* WISHLIST BUTTON */}
          <motion.button
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
            ${darkMode
                ? 'bg-gray-800 text-white hover:bg-red-500/20 hover:text-red-400'
                : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
              }`}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Wishlist"
          >
            <FaRegHeart className="text-xl" />
          </motion.button>

          {/* LOGIN BUTTON */}
          <Link to="/login">

            <motion.button
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-semibold border-2 transition-all duration-300 hover:shadow-md
              ${darkMode
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-[#0a2342] text-[#0a2342] hover:bg-[#0a2342] hover:text-white'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >

              <FaRegUserCircle className="text-xl" />

              <span>Login</span>

            </motion.button>

          </Link>

          {/* MOBILE SEARCH ICON */}
          <button
            className={`md:hidden p-2 rounded-full transition-all duration-200
            ${darkMode
                ? 'text-white hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#0a2342]'
              }`}
          >
            <FaSearch className="text-xl" />
          </button>

          {/* MOBILE MENU TOGGLE */}
          <motion.button
            className={`md:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none
            ${darkMode
                ? 'text-white hover:bg-gray-800'
                : 'text-[#0a2342] hover:bg-gray-100'
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
          >
            {isMobileMenuOpen
              ? <FaTimes className="text-xl" />
              : <FaBars className="text-xl" />
            }
          </motion.button>

        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <div
        className={`hidden md:block text-white shadow-inner transition-all duration-300
        ${darkMode
            ? 'bg-gradient-to-r from-[#050b16] to-[#0f172a]'
            : 'bg-gradient-to-r from-[#0a2342] to-[#122d4f]'
          }`}
      >

        <div className="container mx-auto px-4">

          <ul className="flex flex-wrap items-center justify-start gap-6 py-3">

            {MENUDATA.map((item, index) => (

              <motion.li
                key={index}
                className="relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >

                <Link
                  to={item.slug}
                  className="flex items-center gap-2 px-2 py-1 text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:text-blue-200"
                >
                  <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>

                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>

              </motion.li>

            ))}

          </ul>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {isMobileMenuOpen && (

          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`md:hidden relative shadow-2xl overflow-hidden border-t transition-all duration-300
            ${darkMode
                ? 'bg-gradient-to-b from-[#050b16] to-[#0f172a] border-gray-700'
                : 'bg-gradient-to-b from-[#0a2342] to-[#0e2a4a] border-blue-800/30'
              }`}
          >

            <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">

              <ul className="flex flex-col py-2 px-5">

                {MENUDATA.map((item, index) => (

                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300
                    }}
                    className="border-b border-blue-800/40 last:border-0"
                  >

                    <Link
                      to={item.slug}
                      className="flex items-center gap-4 py-4 text-base font-medium text-white/90 hover:text-white hover:pl-2 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >

                      <span className="text-xl w-8">
                        {item.icon}
                      </span>

                      <span>{item.name}</span>

                    </Link>

                  </motion.li>

                ))}

                {/* MOBILE WISHLIST */}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: MENUDATA.length * 0.05 }}
                  className="border-b border-blue-800/40"
                >

                  <button className="flex items-center gap-4 py-4 text-base font-medium text-white/90 hover:text-white hover:pl-2 transition-all duration-200 w-full">

                    <FaRegHeart className="text-xl w-8" />

                    <span>Wishlist</span>

                  </button>

                </motion.li>

                {/* MOBILE LOGIN */}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: (MENUDATA.length + 1) * 0.05
                  }}
                  className="pt-4 pb-2"
                >

                  <Link to="/login">

                    <button
                      className={`flex items-center justify-center w-full gap-2 py-3 rounded-xl font-bold shadow-lg transition-all duration-300
                      ${darkMode
                          ? 'bg-white text-black'
                          : 'bg-white text-[#0a2342]'
                        }`}
                    >

                      <FaRegUserCircle className="text-xl" />

                      <span>Login / Register</span>

                    </button>

                  </Link>

                </motion.li>

              </ul>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}
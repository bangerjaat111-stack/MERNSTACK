import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import logo from '../../assets/logo.png';
import Profile from './Profile.jsx';
import {useAuth} from '../../Context/DataContext.jsx'
import {
  RiCarLine, RiPriceTag3Line, RiNewspaperLine, RiVideoLine,
  RiAuctionLine, RiFireLine, RiMoonLine, RiSunLine,
  RiHeartLine, RiMenuLine, RiCloseLine, RiArrowRightLine,
  RiUserLine, RiShieldCheckLine,
} from 'react-icons/ri';
import { FiLogIn } from "react-icons/fi";


const MENU = [
  { icon: RiCarLine, name: 'New Cars', slug: '/new-cars' },
  { icon: RiPriceTag3Line, name: 'Used Cars', slug: '/used-cars' },
  { icon: RiNewspaperLine, name: 'News & Reviews', slug: '/news', badge: 'LIVE' },
  { icon: RiVideoLine, name: 'Videos', slug: '/videos', badge: '' },
  { icon: RiAuctionLine, name: 'Sell Car', slug: '/sell' },
];

const TICKER_ITEMS = [
  '2025 BMW M5 TOURING', 'FERRARI F80 REVEALED', 'LAMBORGHINI TEMERARIO',
  'PORSCHE 911 ST', 'MERCEDES-AMG GT63', 'BUGATTI TOURBILLON',
  'ASTON MARTIN VANTAGE F1', 'RIMAC NEVERA R',
];

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none">
      <circle cx="9.5" cy="9.5" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 8C8.4 7.1 9.2 6.6 10.2 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d="M14 14L19 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchRef = useRef(null);
  const {signin}=useAuth()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  return (
    <nav
      className={[
        'font-sans w-full sticky top-0 z-50 transition-all duration-300 border-b',
        dark
          ? 'bg-[#080A0D] border-red-900/20'
          : 'bg-white border-amber-600/15',
        scrolled
          ? dark ? 'shadow-[0_8px_40px_rgba(200,0,20,0.22)]' : 'shadow-[0_8px_40px_rgba(210,110,0,0.14)]'
          : '',
      ].join(' ')}
    >
      {/* Gradient top line */}
      <div
        className={[
          'absolute top-0 left-0 right-0 h-[2px] pointer-events-none animate-pulse',
          dark
            ? 'bg-gradient-to-r from-red-600 via-red-800 to-red-500'
            : 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700',
        ].join(' ')}
      />

      {/* ═══ TOP ROW ═══ */}
      <div className="flex items-center gap-3 px-4 h-[70px]">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .45, ease: 'easeOut' }}
          className="shrink-0"
        >
          
          <Link to="/" className="flex items-center gap-[11px] no-underline">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center"
            > 
                          
              <img
                src={logo}
                alt="AutoSyntax Logo"
                className={[
                  'w-[60px] h-[60px] object-contain',
                  dark
                    ? 'drop-shadow-[0_0_10px_rgba(255,40,60,0.35)]'
                    : 'drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]',
                ].join(' ')}
              />
            </motion.div>

            {/* Desktop wordmark */}
            <div className="hidden sm:block leading-none">
              <div className="text-[24px] font-extrabold tracking-[0.04em] uppercase" style={{ fontFamily: 'Syne, sans-serif' }}>
                <span className={dark ? 'bg-gradient-to-br from-red-500 to-red-400 bg-clip-text text-transparent' : 'bg-gradient-to-br from-amber-600 to-amber-400 bg-clip-text text-transparent'}>
                  Auto
                </span>
                <span className={dark ? 'text-gray-50' : 'text-amber-950'}>Syntax</span>
              </div>
              <div className={['text-[8px] font-medium tracking-[0.32em] uppercase mt-[3px]', dark ? 'text-white/30' : 'text-amber-900/40'].join(' ')}>
                Drive The Future
              </div>
            </div>

            {/* Mobile wordmark */}
            <div className="sm:hidden text-[18px] font-extrabold tracking-[0.05em] uppercase" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className={dark ? 'bg-gradient-to-br from-red-500 to-red-400 bg-clip-text text-transparent' : 'bg-gradient-to-br from-amber-600 to-amber-400 bg-clip-text text-transparent'}>
                Auto
              </span>
              <span className={dark ? 'text-gray-50' : 'text-amber-950'}>Syntax</span>
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP SEARCH — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15, duration: .4 }}
          className={[
            'hidden md:flex flex-1 max-w-[460px] mx-auto items-center gap-[10px] h-10 px-[14px] rounded-xl border transition-all duration-200 focus-within:ring-2',
            dark
              ? 'bg-red-900/5 border-red-900/20 focus-within:border-red-600/55 focus-within:ring-red-600/10'
              : 'bg-amber-600/5 border-amber-600/15 focus-within:border-amber-600/50 focus-within:ring-amber-600/10',
          ].join(' ')}
        >
          <SearchIcon className={['w-4 h-4 flex-shrink-0', dark ? 'text-white/30' : 'text-amber-900/40'].join(' ')} />
          <input
            type="text"
            placeholder="Search cars, brands, models…"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className={['flex-1 bg-transparent border-none outline-none text-[13px] font-normal', dark ? 'text-gray-50 placeholder:text-white/30' : 'text-amber-950 placeholder:text-amber-900/40'].join(' ')}
          />
          <AnimatePresence>
            {searchVal && (
              <motion.button
                initial={{ opacity: 0, scale: .8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .8 }}
                className={[
                  'rounded-lg px-[10px] py-1 text-[10px] font-bold tracking-[0.1em] text-white border-none cursor-pointer',
                  dark ? 'bg-gradient-to-br from-red-600 to-red-500' : 'bg-gradient-to-br from-amber-600 to-amber-400',
                ].join(' ')}
              >
                GO →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: .2, duration: .4 }}
          className="flex items-center gap-2 ml-auto"
        >
          {/* Mobile search toggle — hidden on desktop */}
          <motion.button
            whileTap={{ scale: .9 }}
            onClick={() => setSearchOpen(o => !o)}
            className={[
              'md:hidden w-9 h-9 rounded-[10px] border flex items-center justify-center cursor-pointer transition-all duration-200',
              dark
                ? 'bg-red-900/7 border-red-900/20 text-white/55 hover:border-red-500/35 hover:text-gray-50 hover:bg-red-900/10'
                : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60 hover:border-amber-500/35 hover:text-amber-950 hover:bg-amber-600/10',
            ].join(' ')}
          >
            <AnimatePresence mode="wait">
              {searchOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .15 }}><RiCloseLine size={18} /></motion.span>
                : <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .15 }}><SearchIcon className="w-[17px] h-[17px]" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: .9 }}
            whileHover={{ rotate: 20 }}
            onClick={toggleTheme}
            className={[
              'w-9 h-9 rounded-[10px] border flex items-center justify-center cursor-pointer transition-all duration-200',
              dark
                ? 'bg-red-900/7 border-red-900/20 text-white/55 hover:border-red-500/35 hover:text-gray-50 hover:bg-red-900/10'
                : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60 hover:border-amber-500/35 hover:text-amber-950 hover:bg-amber-600/10',
            ].join(' ')}
          >
            <AnimatePresence mode="wait">
              {dark
                ? <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .18 }}><RiSunLine size={17} /></motion.span>
                : <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .18 }}><RiMoonLine size={17} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Wishlist — hidden on mobile, shown on desktop */}
          <motion.button
            whileTap={{ scale: .9 }}
            whileHover={{ scale: 1.08 }}
            className={[
              'hidden md:flex w-9 h-9 rounded-[10px] border items-center justify-center cursor-pointer transition-all duration-200',
              dark
                ? 'bg-red-900/7 border-red-900/20 text-white/55 hover:border-red-500/35 hover:text-gray-50 hover:bg-red-900/10'
                : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60 hover:border-amber-500/35 hover:text-amber-950 hover:bg-amber-600/10',
            ].join(' ')}
          >
            <RiHeartLine size={17} />
          </motion.button>

          {/* sign in */}
          {
            signin? <Profile  />:
              <Link to="/signin" className="no-underline">
                <motion.button
                  whileTap={{ scale: .96 }}
                  whileHover={{ scale: 1.04 }}
                  className={[
                    'relative p-[1.5px] rounded-[11px] border-none cursor-pointer',
                    dark ? 'bg-gradient-to-br from-red-600 to-red-500' : 'bg-gradient-to-br from-amber-600 to-amber-400',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex items-center gap-[7px] px-4 h-[34px] rounded-[10px] text-[12px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300',
                      'hover:bg-transparent hover:text-white',
                      dark ? 'bg-[#080A0D] text-gray-50' : 'bg-white text-amber-950',
                    ].join(' ')}
                  >
                    <FiLogIn   size={14} />
                    <span className="hidden sm:inline">sign in</span>
                  </span>
                </motion.button>
              </Link>

          }

          {/* Sign Up */}
          <Link to="/signup" className="no-underline">
            <motion.button
              whileTap={{ scale: .96 }}
              whileHover={{ scale: 1.04 }}
              className={[
                'relative p-[1.5px] rounded-[11px] border-none cursor-pointer',
                dark ? 'bg-gradient-to-br from-red-600 to-red-500' : 'bg-gradient-to-br from-amber-600 to-amber-400',
              ].join(' ')}
            >
              <span
                className={[
                  'flex items-center gap-[7px] px-4 h-[34px] rounded-[10px] text-[12px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300',
                  'hover:bg-transparent hover:text-white',
                  dark ? 'bg-[#080A0D] text-gray-50' : 'bg-white text-amber-950',
                ].join(' ')}
              >
                <RiUserLine size={14} />
                <span className="hidden sm:inline">Sign Up</span>
              </span>
            </motion.button>
          </Link>

          {/* Hamburger — hidden on desktop */}
          <motion.button
            whileTap={{ scale: .9 }}
            onClick={() => setMenuOpen(o => !o)}
            className={[
              'md:hidden w-9 h-9 rounded-[10px] border flex items-center justify-center cursor-pointer transition-all duration-200',
              dark
                ? 'bg-red-900/7 border-red-900/20 text-white/55 hover:border-red-500/35 hover:text-gray-50 hover:bg-red-900/10'
                : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60 hover:border-amber-500/35 hover:text-amber-950 hover:bg-amber-600/10',
            ].join(' ')}
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><RiCloseLine size={19} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><RiMenuLine size={19} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* ═══ MOBILE SEARCH DROPDOWN ═══ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .22 }}
            className={['md:hidden overflow-hidden', dark ? 'bg-[#080A0D]' : 'bg-white'].join(' ')}
          >
            <div className="px-4 pb-[14px] pt-1">
              <div
                className={[
                  'flex items-center gap-[10px] h-[42px] px-[14px] rounded-xl border transition-all duration-200 focus-within:ring-2',
                  dark
                    ? 'bg-red-900/5 border-red-900/20 focus-within:border-red-600/55 focus-within:ring-red-600/10'
                    : 'bg-amber-600/5 border-amber-600/15 focus-within:border-amber-600/50 focus-within:ring-amber-600/10',
                ].join(' ')}
              >
                <SearchIcon className={['w-4 h-4 flex-shrink-0', dark ? 'text-white/30' : 'text-amber-900/40'].join(' ')} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search cars, brands, models…"
                  className={['flex-1 bg-transparent border-none outline-none text-[13px]', dark ? 'text-gray-50 placeholder:text-white/30' : 'text-amber-950 placeholder:text-amber-900/40'].join(' ')}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ DESKTOP MENU BAR ═══ */}
      <div
        className={[
          'hidden md:block border-t',
          dark ? 'bg-[#0D0F16] border-red-900/20' : 'bg-[#FFFDF8] border-amber-600/15',
        ].join(' ')}
      >
        <div className="flex items-center px-5">
          <ul className="flex items-stretch list-none p-0 m-0">
            {MENU.map((item, i) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.slug;
              return (
                <motion.li
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.3 }}
                >
                  {/* Active/hover underline */}
                  <span
                    className={[
                      'absolute bottom-0 left-0 right-0 h-[2px] rounded-sm transition-transform duration-300 origin-left',
                      dark ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-amber-600 to-amber-400',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    ].join(' ')}
                  />
                  <Link
                    to={item.slug}
                    className={[
                      'flex items-center gap-[7px] px-4 h-11 no-underline text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200 whitespace-nowrap',
                      isActive
                        ? dark ? 'text-gray-50' : 'text-amber-950'
                        : dark ? 'text-white/55 hover:text-gray-50' : 'text-amber-800/60 hover:text-amber-950',
                    ].join(' ')}
                  >
                    <Icon
                      size={14}
                      className={[
                        'transition-colors duration-200',
                        isActive
                          ? dark ? 'text-red-500' : 'text-amber-600'
                          : dark ? 'text-white/30 group-hover:text-red-500' : 'text-amber-900/40 group-hover:text-amber-600',
                      ].join(' ')}
                    />
                    {item.name}
                    {item.badge && (
                      <span
                        className={[
                          'px-[7px] py-[2px] rounded-[6px] text-[8px] font-bold tracking-[0.1em] text-white',
                          dark ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-gradient-to-r from-amber-600 to-amber-400',
                        ].join(' ')}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            className="ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
          >
            <Link to="/deals" className="no-underline">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: .97 }}
                className={[
                  'flex items-center gap-[7px] px-4 py-[6px] rounded-[9px] text-[11px] font-bold tracking-[0.12em] uppercase border-none cursor-pointer text-white',
                  dark ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500' : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400',
                ].join(' ')}
              >
                <RiFireLine size={13} /> Hot Deals <RiArrowRightLine size={12} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══ TICKER ═══ */}
      <div
        className={[
          'border-t overflow-hidden py-[5px]',
          dark
            ? 'bg-[#06080C] border-red-900/20'
            : 'bg-[#FFF8EE] border-amber-600/15',
        ].join(' ')}
      >
        <div className="flex w-max animate-marquee">

          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span
              key={i}
              className={[
                'inline-flex items-center gap-3 mr-10 text-[11px] font-semibold tracking-[0.2em] uppercase',
                dark ? 'text-white/85' : 'text-amber-900/40',
              ].join(' ')}
            >
              {/* Dot */}
              <span
                className={[
                  'w-1 h-1 rounded-full shrink-0 opacity-80',
                  i % 2 === 0
                    ? dark
                      ? 'bg-red-600'
                      : 'bg-amber-600'
                    : dark
                      ? 'bg-red-400'
                      : 'bg-amber-400',
                ].join(' ')}
              />

              {/* Text */}
              {t}
            </span>
          ))}

        </div>
      </div>


      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: .3, ease: [.4, 0, .2, 1] }}
            className={[
              'md:hidden overflow-hidden border-t',
              dark ? 'bg-[#050709] border-red-900/20' : 'bg-[#FFF9F0] border-amber-600/15',
            ].join(' ')}
          >
            <div className="px-[14px] pt-[10px] pb-6">

              {/* Nav items */}
              <ul className="list-none p-0 m-0 mb-4">
                {[...MENU, { icon: RiFireLine, name: 'Hot Deals', slug: '/deals', hot: true }].map((item, i) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.slug;
                  return (
                    <motion.li
                      key={i}
                      initial={{ x: -18, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.045, type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <Link
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={[
                          'flex items-center gap-3 px-[14px] py-3 rounded-xl no-underline border-l-[3px] transition-all duration-[180ms]',
                          isActive
                            ? dark
                              ? 'bg-red-900/8 border-red-600 hover:bg-red-900/10'
                              : 'bg-amber-600/7 border-amber-600 hover:bg-amber-600/10'
                            : dark
                              ? 'border-transparent hover:bg-red-900/6'
                              : 'border-transparent hover:bg-amber-600/6',
                        ].join(' ')}
                      >
                        <span
                          className={[
                            'flex items-center justify-center w-[34px] h-[34px] rounded-[9px] shrink-0',
                            isActive || item.hot
                              ? dark ? 'bg-gradient-to-br from-red-700 to-red-500' : 'bg-gradient-to-br from-amber-700 to-amber-400'
                              : dark ? 'bg-red-900/8' : 'bg-amber-600/8',
                          ].join(' ')}
                        >
                          <Icon
                            size={16}
                            className={isActive || item.hot ? 'text-white' : dark ? 'text-white/30' : 'text-amber-900/40'}
                          />
                        </span>
                        <span
                          className={[
                            'flex-1 text-[14px] font-semibold',
                            isActive
                              ? dark ? 'text-gray-50' : 'text-amber-950'
                              : dark ? 'text-white/55' : 'text-amber-800/60',
                          ].join(' ')}
                        >
                          {item.name}
                        </span>
                        {item.badge && (
                          <span
                            className={[
                              'px-2 py-[2px] rounded-[6px] text-[8px] font-bold text-white',
                              dark ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-gradient-to-r from-amber-600 to-amber-400',
                            ].join(' ')}
                          >
                            {item.badge}
                          </span>
                        )}
                        <RiArrowRightLine size={14} className={dark ? 'text-white/30' : 'text-amber-900/40'} />
                      </Link>
                      {i < MENU.length && (
                        <div className={['h-px mx-[14px]', dark ? 'bg-red-900/20' : 'bg-amber-600/15'].join(' ')} />
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .28 }}
                className="flex flex-col gap-[10px]"
              >
                <Link to="/signup" className="no-underline">
                  <motion.button
                    whileTap={{ scale: .98 }}
                    className={[
                      'w-full h-[46px] rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 text-[13px] font-bold tracking-[0.12em] uppercase text-white',
                      dark ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500' : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400',
                    ].join(' ')}
                  >
                    <RiUserLine size={16} /> Create Account
                  </motion.button>
                </Link>

                <div className="flex gap-[10px]">
                  {[
                    { icon: dark ? RiSunLine : RiMoonLine, label: dark ? 'Light Mode' : 'Dark Mode', action: toggleTheme },
                    { icon: RiHeartLine, label: 'Saved', action: () => { } },
                    { icon: RiShieldCheckLine, label: 'Pro', action: () => { } },
                  ].map((b, i) => {
                    const BIcon = b.icon;
                    return (
                      <motion.button
                        key={i}
                        whileTap={{ scale: .97 }}
                        onClick={b.action}
                        className={[
                          'flex-1 h-10 rounded-[10px] cursor-pointer flex items-center justify-center gap-[6px] text-[11px] font-semibold tracking-[0.08em] uppercase border',
                          dark
                            ? 'bg-red-900/7 border-red-900/20 text-white/55'
                            : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60',
                        ].join(' ')}
                      >
                        <BIcon size={14} /> {b.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

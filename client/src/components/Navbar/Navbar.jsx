import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import logo from '../../assets/logo.png';
import Profile from './Profile.jsx';
import { useAuth } from '../../Context/DataContext.jsx';
import {
  RiCarLine, RiPriceTag3Line, RiNewspaperLine, RiVideoLine,
  RiAuctionLine, RiFireLine, RiMoonLine, RiSunLine,
  RiHeartLine, RiMenuLine, RiCloseLine, RiArrowRightLine,
  RiUserLine, RiShieldCheckLine, RiDeleteBin6Line,
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

const SEARCH_CARS = [
  { brand: 'Tata', name: 'Nexon EV Max', price: '₹14.49 Lakh', fuel: 'Electric', image: 'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp', link: '/new-cars' },
  { brand: 'Tata', name: 'Curvv EV', price: '₹17.49 Lakh', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Tata', name: 'Sierra EV', price: '₹18.79 Lakh', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Tata', name: 'Punch', price: '₹6.13 Lakh', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Mahindra', name: 'Thar Roxx', price: '₹12.99 Lakh', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Mahindra', name: 'XUV700 AX7', price: '₹21.50 Lakh', fuel: 'Diesel', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJf515PddNnEAY5MrtqKHlREy7yRKHCt_Zfw&s', link: '/new-cars' },
  { brand: 'Mahindra', name: 'Scorpio N', price: '₹13.69 Lakh', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Hyundai', name: 'Creta SX(O)', price: '₹13.45 Lakh', fuel: 'Petrol', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg', link: '/new-cars' },
  { brand: 'Hyundai', name: 'Verna Turbo', price: '₹10.96 Lakh', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Maruti Suzuki', name: 'Swift VXI', price: '₹6.49 Lakh', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Maruti Suzuki', name: 'Dzire ZXI', price: '₹6.79 Lakh', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Maruti Suzuki', name: 'Brezza ZXI+', price: '₹11.45 Lakh', fuel: 'Petrol', image: 'https://stimg.cardekho.com/images/car-images/630x420/Maruti/Brezza/10387/1755776291575/front-left-side-47.jpg', link: '/deals' },
  { brand: 'Kia', name: 'Seltos GTX+', price: '₹18.20 Lakh', fuel: 'Petrol', image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80', link: '/deals' },
  { brand: 'BMW', name: '3 Series Gran Limousine', price: '₹56.50 Lakh', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop', link: '/deals' },
  { brand: 'Toyota', name: 'Innova Hycross', price: '₹19.77 Lakh', fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1622551842564-2ad0c2d2c7e5?q=80&w=800&auto=format&fit=crop', link: '/new-cars' },
  { brand: 'Toyota', name: 'Fortuner Legender', price: '₹43.66 Lakh', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop', link: '/new-cars' }
];

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const { wishlist, removeFromWishlist, clearWishlist, count } = useWishlist();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchRef = useRef(null);
  const { signin } = useAuth();

  const searchResults = useMemo(() => {
    if (!searchVal.trim()) return [];
    const q = searchVal.toLowerCase();
    return SEARCH_CARS.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.fuel.toLowerCase().includes(q));
  }, [searchVal]);

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
          className="relative hidden md:flex flex-1 max-w-[460px] mx-auto"
        >
          <div
            className={[
              'w-full flex items-center gap-[10px] h-10 px-[14px] rounded-xl border transition-all duration-200 focus-within:ring-2',
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
                <button
                  type="button"
                  onClick={() => setSearchVal('')}
                  className="text-xs font-bold text-white/50 hover:text-white bg-transparent border-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Live Search Results Dropdown */}
          <AnimatePresence>
            {searchVal.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className={[
                  'absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl overflow-hidden z-50 p-2 max-h-80 overflow-y-auto',
                  dark ? 'bg-[#0D0F16] border-red-900/40 text-white' : 'bg-white border-amber-600/25 text-slate-900',
                ].join(' ')}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((car, idx) => (
                    <Link
                      key={idx}
                      to={car.link || '/new-cars'}
                      onClick={() => setSearchVal('')}
                      className={[
                        'flex items-center gap-3 p-2 rounded-xl transition-colors no-underline',
                        dark ? 'hover:bg-white/10 text-white' : 'hover:bg-amber-50 text-slate-900',
                      ].join(' ')}
                    >
                      <img src={car.image} alt={car.name} className="w-12 h-10 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{car.brand} {car.name}</p>
                        <p className="text-[10px] text-amber-500 font-extrabold">{car.price} · {car.fuel}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-600/20 text-red-500 uppercase">View</span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No cars found matching "{searchVal}"
                  </div>
                )}
              </motion.div>
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
            onClick={() => setWishlistOpen(true)}
            className={[
              'hidden md:flex relative w-9 h-9 rounded-[10px] border items-center justify-center cursor-pointer transition-all duration-200',
              dark
                ? 'bg-red-900/7 border-red-900/20 text-white/55 hover:border-red-500/35 hover:text-gray-50 hover:bg-red-900/10'
                : 'bg-amber-600/7 border-amber-600/15 text-amber-800/60 hover:border-amber-500/35 hover:text-amber-950 hover:bg-amber-600/10',
            ].join(' ')}
            title="View Wishlist"
          >
            <RiHeartLine size={17} />
            {wishlist && wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </motion.button>

          {/* sign in */}
          {
            signin ? <Profile /> :
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
                    <FiLogIn size={14} />
                    <span className="hidden sm:inline">sign in</span>
                  </span>
                </motion.button>
              </Link>

          }

          {/* Sign Up — completely hidden when logged in */}
          {!signin && (
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
          )}

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
            <div className="px-4 pb-[14px] pt-1 relative">
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
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  className={['flex-1 bg-transparent border-none outline-none text-[13px]', dark ? 'text-gray-50 placeholder:text-white/30' : 'text-amber-950 placeholder:text-amber-900/40'].join(' ')}
                />
              </div>

              {/* Mobile Search Results Overlay */}
              {searchVal.trim() && (
                <div className={[
                  'mt-2 rounded-2xl border shadow-xl overflow-hidden p-2 max-h-60 overflow-y-auto',
                  dark ? 'bg-[#0D0F16] border-red-900/40 text-white' : 'bg-white border-amber-600/25 text-slate-900',
                ].join(' ')}>
                  {searchResults.length > 0 ? (
                    searchResults.map((car, idx) => (
                      <Link
                        key={idx}
                        to={car.link || '/new-cars'}
                        onClick={() => { setSearchVal(''); setSearchOpen(false); }}
                        className={[
                          'flex items-center gap-3 p-2 rounded-xl transition-colors no-underline',
                          dark ? 'hover:bg-white/10 text-white' : 'hover:bg-amber-50 text-slate-900',
                        ].join(' ')}
                      >
                        <img src={car.image} alt={car.name} className="w-10 h-8 object-cover rounded-md flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{car.brand} {car.name}</p>
                          <p className="text-[10px] text-amber-500 font-bold">{car.price}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">No cars found</div>
                  )}
                </div>
              )}
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
                {!signin && (
                  <Link to="/signup" className="no-underline">
                    <motion.button
                      whileTap={{ scale: .98 }}
                      className={[
                        'w-full h-[46px] rounded-xl border-none flex items-center justify-center gap-2 text-[13px] font-bold tracking-[0.12em] uppercase text-white cursor-pointer transition-all duration-300',
                        dark ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500' : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400',
                      ].join(' ')}
                    >
                      <RiUserLine size={16} /> Create Account
                    </motion.button>
                  </Link>
                )}

                <div className="flex gap-[10px]">
                  {[
                    { icon: dark ? RiSunLine : RiMoonLine, label: dark ? 'Light Mode' : 'Dark Mode', action: toggleTheme },
                    { icon: RiHeartLine, label: `Saved (${count})`, action: () => { setWishlistOpen(true); setMenuOpen(false); } },
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

      {/* ═══ WISHLIST SLIDE-OVER DRAWER ═══ */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={[
                'relative w-full max-w-md h-full flex flex-col shadow-2xl z-10 border-l',
                dark ? 'bg-[#0B0D13] border-red-900/20 text-white' : 'bg-white border-amber-600/20 text-slate-900'
              ].join(' ')}
            >
              {/* Drawer Header */}
              <div className={['p-5 flex items-center justify-between border-b', dark ? 'border-white/10' : 'border-slate-200'].join(' ')}>
                <div className="flex items-center gap-2">
                  <div className={['p-2 rounded-xl', dark ? 'bg-red-900/20 text-red-500' : 'bg-amber-100 text-amber-600'].join(' ')}>
                    <RiHeartLine size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base leading-none">Your Saved Wishlist</h3>
                    <p className={['text-xs mt-1', dark ? 'text-white/50' : 'text-slate-500'].join(' ')}>{count} car{count !== 1 ? 's' : ''} saved</p>
                  </div>
                </div>

                <button
                  onClick={() => setWishlistOpen(false)}
                  className={['p-2 rounded-xl cursor-pointer border-none', dark ? 'bg-white/5 text-white/70 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'].join(' ')}
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className={['w-16 h-16 rounded-full flex items-center justify-center', dark ? 'bg-white/5 text-white/30' : 'bg-slate-100 text-slate-400'].join(' ')}>
                      <RiHeartLine size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">No cars in wishlist yet</h4>
                      <p className={['text-xs mt-1 max-w-xs', dark ? 'text-white/50' : 'text-slate-500'].join(' ')}>
                        Click the heart icon on any car to save it here for quick comparison and price alerts.
                      </p>
                    </div>
                    <Link
                      to="/new-cars"
                      onClick={() => setWishlistOpen(false)}
                      className={[
                        'px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white no-underline shadow',
                        dark ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500' : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400'
                      ].join(' ')}
                    >
                      Browse Cars
                    </Link>
                  </div>
                ) : (
                  wishlist.map((car, idx) => (
                    <div
                      key={car.id || car.name || idx}
                      className={['flex items-center gap-3 p-3 rounded-2xl border transition-all', dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-200'].join(' ')}
                    >
                      <img
                        src={car.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop'}
                        alt={car.name || car.title}
                        className="w-20 h-16 rounded-xl object-cover bg-black/20"
                      />

                      <div className="flex-1 min-w-0">
                        <p className={['text-[10px] font-bold uppercase tracking-wider', dark ? 'text-red-400' : 'text-amber-600'].join(' ')}>
                          {car.brand || 'AutoSyntax'}
                        </p>
                        <h4 className="font-bold text-sm truncate">{car.name || car.title}</h4>
                        <p className="font-extrabold text-xs mt-0.5">
                          {typeof car.price === 'number' ? `₹${car.price} Lakh` : car.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromWishlist(car.id || car.name || car.title)}
                        className="p-2 text-red-500 hover:text-red-600 rounded-xl hover:bg-red-500/10 cursor-pointer border-none transition-colors"
                        title="Remove from wishlist"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {wishlist.length > 0 && (
                <div className={['p-4 border-t space-y-2', dark ? 'border-white/10 bg-[#080A0D]' : 'border-slate-200 bg-slate-50'].join(' ')}>
                  <div className="flex gap-2">
                    <button
                      onClick={clearWishlist}
                      className={['flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer', dark ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-100'].join(' ')}
                    >
                      Clear All
                    </button>
                    <Link
                      to="/profile"
                      onClick={() => setWishlistOpen(false)}
                      className={[
                        'flex-1 text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white no-underline',
                        dark ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500' : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400'
                      ].join(' ')}
                    >
                      View in Profile
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { Link } from 'react-router-dom';
import {
  RiCarLine, RiPriceTag3Line, RiSearchLine, RiArrowRightLine,
  RiFireLine, RiStarFill, RiMapPinLine, RiShieldCheckLine,
  RiCustomerService2Line, RiExchangeLine, RiCheckLine,
  RiArrowLeftSLine, RiArrowRightSLine, RiPlayCircleLine,
  RiTimeLine, RiThumbUpLine, RiNewspaperLine, RiHomeSmileLine
} from 'react-icons/ri';

/* ─── Static Data ─── */
const BRANDS = [
  { name: 'Maruti',   initials: 'MS', color: 'blue'   },
  { name: 'Tata',     initials: 'TA', color: 'teal'   },
  { name: 'Hyundai',  initials: 'HY', color: 'red'    },
  { name: 'Mahindra', initials: 'MA', color: 'amber'  },
  { name: 'Kia',      initials: 'KI', color: 'coral'  },
  { name: 'Toyota',   initials: 'TO', color: 'green'  },
  { name: 'Honda',    initials: 'HO', color: 'purple' },
  { name: 'BMW',      initials: 'BM', color: 'teal'   },
];

const POPULAR_CARS = [
  { 
    name: 'Tata Punch',          
    price: '₹5.65 – 10.60 L', 
    tag: 'Best Seller', 
    fuel: 'Petrol / CNG',  
    km: '18.97 kmpl',
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/172825/punch-facelift-exterior-right-front-three-quarter.png?isig=0&q=80'  // Real SUV image
  },
  { 
    name: 'Maruti Brezza',       
    price: '₹8.26 – 13.01 L', 
    tag: 'Top Rated',   
    fuel: 'Petrol',        
    km: '17.38 kmpl',
    image: 'https://stimg.cardekho.com/images/car-images/630x420/Maruti/Brezza/10387/1755776291575/front-left-side-47.jpg'
  },
  { 
    name: 'Hyundai Creta',       
    price: '₹11.11 – 20.45 L',
    tag: 'Hot Deal',    
    fuel: 'Petrol / Diesel',
    km: '16.80 kmpl',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ac7?w=500&h=300&fit=crop'
  },
  { 
    name: 'Mahindra XUV 3XO',   
    price: '₹7.49 – 15.49 L', 
    tag: 'New Launch',  
    fuel: 'Petrol / Diesel',
    km: '20.11 kmpl',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop'
  },
  { 
    name: 'Tata Nexon EV',       
    price: '₹14.49 – 19.49 L',
    tag: 'Electric',    
    fuel: 'Electric',       
    km: '465 km range',
    image: 'https://images.unsplash.com/photo-1593941707882-5c149f6c7e67?w=500&h=300&fit=crop'
  },
  { 
    name: 'Kia Seltos',          
    price: '₹10.89 – 20.35 L',
    tag: 'Popular',     
    fuel: 'Petrol / Diesel',
    km: '16.10 kmpl',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&h=300&fit=crop'
  },
];

const BODY_TYPES = [
  { name: 'SUV',       icon: RiCarLine,         count: 48 },
  { name: 'Hatchback', icon: RiCarLine,         count: 32 },
  { name: 'Sedan',     icon: RiCarLine,         count: 27 },
  { name: 'MUV',       icon: RiCarLine,         count: 15 },
];

const BUDGETS = ['Under ₹5L', '₹5L – 8L', '₹8L – 12L', '₹12L – 20L', 'Above ₹20L'];

const SERVICES = [
  { icon: RiShieldCheckLine,      title: 'Free RC Check',       desc: 'Verify ownership & history before you buy' },
  { icon: RiExchangeLine,         title: 'Easy Exchange',        desc: 'Get best value for your existing car' },
  { icon: RiCustomerService2Line, title: '24/7 Support',         desc: 'Expert help whenever you need it' },
  { icon: RiHomeSmileLine,        title: 'Home Inspection',      desc: 'We inspect the car right at your doorstep' },
];

const NEWS = [
  { title: 'Tata Sierra 2025 Officially Launched at ₹11.49 Lakh',  tag: 'Launch',  time: '2h ago' },
  { title: 'Top 5 Electric Cars Under ₹20 Lakh in India 2025',     tag: 'Electric', time: '5h ago' },
  { title: 'Maruti e Vitara vs Hyundai Creta Electric — Compared', tag: 'Compare', time: '8h ago' },
];

/* ─── Helper functions ─── */
function tagClass(tag, dark) {
  const map = {
    'Best Seller': dark ? 'bg-red-900/40 text-red-300'     : 'bg-red-100 text-red-700',
    'Top Rated':   dark ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700',
    'Hot Deal':    dark ? 'bg-orange-900/40 text-orange-300': 'bg-orange-100 text-orange-700',
    'New Launch':  dark ? 'bg-green-900/40 text-green-300'  : 'bg-green-100 text-green-700',
    'Electric':    dark ? 'bg-teal-900/40 text-teal-300'    : 'bg-teal-100 text-teal-700',
    'Popular':     dark ? 'bg-blue-900/40 text-blue-300'    : 'bg-blue-100 text-blue-700',
  };
  return map[tag] || (dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600');
}

function newsTagClass(tag, dark) {
  const map = {
    Launch:   dark ? 'bg-red-900/40 text-red-300'    : 'bg-red-100 text-red-700',
    Electric: dark ? 'bg-teal-900/40 text-teal-300'  : 'bg-teal-100 text-teal-700',
    Compare:  dark ? 'bg-blue-900/40 text-blue-300'  : 'bg-blue-100 text-blue-700',
  };
  return map[tag] || (dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600');
}

function brandRingClass(color) {
  const map = {
    blue:   'ring-blue-400/40',
    teal:   'ring-teal-400/40',
    red:    'ring-red-400/40',
    amber:  'ring-amber-400/40',
    coral:  'ring-orange-400/40',
    green:  'ring-green-400/40',
    purple: 'ring-purple-400/40',
  };
  return map[color] || 'ring-gray-400/30';
}

function brandBgClass(color, dark) {
  const map = {
    blue:   dark ? 'bg-blue-900/30 text-blue-300'     : 'bg-blue-50 text-blue-700',
    teal:   dark ? 'bg-teal-900/30 text-teal-300'     : 'bg-teal-50 text-teal-700',
    red:    dark ? 'bg-red-900/30 text-red-300'       : 'bg-red-50 text-red-700',
    amber:  dark ? 'bg-amber-900/30 text-amber-300'   : 'bg-amber-50 text-amber-700',
    coral:  dark ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-50 text-orange-700',
    green:  dark ? 'bg-green-900/30 text-green-300'   : 'bg-green-50 text-green-700',
    purple: dark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700',
  };
  return map[color] || (dark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700');
}

/* ─── Car SVG Illustration (used only in hero section now) ─── */
function CarIllustration({ dark }) {
  const body  = dark ? '#1e2030' : '#e8f0fe';
  const glass = dark ? '#334155' : '#bfdbfe';
  const wheel = dark ? '#374151' : '#94a3b8';
  const line  = dark ? '#3b82f6' : '#2563eb';
  return (
    <svg viewBox="0 0 320 160" className="w-full max-w-xs mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="160" cy="148" rx="100" ry="8" fill={dark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'} />
      <rect x="40" y="80" width="240" height="55" rx="10" fill={body} />
      <path d="M80 80 L110 42 L210 42 L240 80Z" fill={body} />
      <rect x="115" y="48" width="40" height="26" rx="4" fill={glass} opacity="0.9" />
      <rect x="165" y="48" width="38" height="26" rx="4" fill={glass} opacity="0.9" />
      <circle cx="95" cy="135" r="18" fill={wheel} />
      <circle cx="95" cy="135" r="10" fill={dark ? '#1f2937' : '#e2e8f0'} />
      <circle cx="225" cy="135" r="18" fill={wheel} />
      <circle cx="225" cy="135" r="10" fill={dark ? '#1f2937' : '#e2e8f0'} />
      <rect x="40" y="92" width="30" height="8" rx="4" fill={line} opacity="0.7" />
      <rect x="250" y="92" width="30" height="8" rx="4" fill={line} opacity="0.7" />
      <path d="M40 105 L280 105" stroke={line} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
    </svg>
  );
}

export default function Home() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState('new');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  /* theme shorthands */
  const bg     = dark ? 'bg-[#080A0D]'  : 'bg-white';
  const bgSec  = dark ? 'bg-[#0D0F16]'  : 'bg-slate-50';
  const bgCard = dark ? 'bg-[#13151E]'  : 'bg-white';
  const border = dark ? 'border-red-900/20'   : 'border-amber-600/14';
  const textHi = dark ? 'text-gray-50'        : 'text-slate-900';
  const textSb = dark ? 'text-white/55'       : 'text-slate-500';
  const gradText = dark
    ? 'bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';
  const gradBtnSm = `${gradBtn} text-xs font-bold tracking-widest uppercase rounded-lg px-4 py-2 cursor-pointer border-none`;
  const inputCls = `w-full bg-transparent outline-none text-sm ${textHi} placeholder:${textSb}`;
  const sectionHead = `text-2xl sm:text-3xl font-extrabold tracking-tight ${textHi}`;

  return (
    <div className={`${bg} min-h-screen`}>

      {/* ══════════════════════════════════════════════
          1. HERO (keeps the SVG illustration)
      ══════════════════════════════════════════════ */}
      <section className={`${bgSec} border-b ${border} py-10 sm:py-16 px-4`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${dark ? 'border-red-900/30 text-red-400 bg-red-900/10' : 'border-amber-500/30 text-amber-700 bg-amber-50'}`}>
              <RiFireLine size={13} /> India's Fastest Growing Car Portal
            </div>
            <h1 className={`text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight ${textHi}`}>
              Find Your <span className={gradText}>Perfect Car</span><br />in Minutes
            </h1>
            <p className={`text-base sm:text-lg leading-relaxed max-w-md ${textSb}`}>
              Browse 10,000+ new &amp; used cars. Compare prices, read expert reviews and get the best deal near you.
            </p>
            <div className={`flex items-center gap-3 px-4 h-14 rounded-2xl border ${dark ? 'bg-white/5 border-red-900/25' : 'bg-white border-amber-500/20 shadow-sm'}`}>
              <RiSearchLine size={18} className={textSb} />
              <input className={inputCls} placeholder="Search brand, model or budget…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button className={`${gradBtn} rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide border-none cursor-pointer whitespace-nowrap`}>Search</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map(b => (
                <button key={b} onClick={() => setBudgetFilter(b === budgetFilter ? '' : b)} className={[
                  'text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-200',
                  b === budgetFilter ? (dark ? 'bg-red-600 border-red-500 text-white' : 'bg-amber-500 border-amber-400 text-white') : (dark ? 'bg-white/5 border-red-900/20 text-white/55 hover:border-red-500/40' : 'bg-white border-amber-500/20 text-slate-500 hover:border-amber-400'),
                ].join(' ')}>{b}</button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex  flex-col items-center gap-4">
             <img className='h-full w-full rounded-2xl' src="https://wallpapercave.com/wp/wp7132237.jpg" alt="" />
           
            <div className={`w-full grid grid-cols-3 gap-px rounded-2xl overflow-hidden border ${border}`}>
              
              {[
                { n: '10K+', label: 'Cars Listed' },
                { n: '500+', label: 'Brands & Models' },
                { n: '2L+',  label: 'Happy Buyers' },
              ].map((s, i) => (
                <div key={i} className={`${bgCard} px-4 py-3 text-center`}>
                  <div className={`text-xl font-extrabold ${gradText}`}>{s.n}</div>
                  <div className={`text-[11px] font-medium mt-0.5 ${textSb}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. NEW / USED TABS + BODY TYPE
      ══════════════════════════════════════════════ */}
      <section className={`${bg} py-10 px-4 border-b ${border}`}>
        <div className="max-w-6xl mx-auto">
          <div className={`inline-flex rounded-xl p-1 mb-8 border ${dark ? 'bg-white/5 border-red-900/20' : 'bg-slate-100 border-slate-200'}`}>
            {['new', 'used'].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={[
                'px-6 py-2 rounded-[10px] text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer border-none',
                activeTab === t ? gradBtn : (dark ? 'text-white/50 bg-transparent hover:text-white/80' : 'text-slate-500 bg-transparent hover:text-slate-700'),
              ].join(' ')}>{t === 'new' ? 'New Cars' : 'Used Cars'}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BODY_TYPES.map((bt, i) => {
              const Icon = bt.icon;
              return (
                <Link key={i} to={`/${activeTab}-cars?body=${bt.name.toLowerCase()}`} className={[
                  'group flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all duration-200 no-underline cursor-pointer',
                  dark ? 'bg-white/4 border-red-900/15 hover:bg-red-900/10 hover:border-red-500/30' : 'bg-white border-slate-200 hover:border-amber-400/60 hover:bg-amber-50/50 shadow-sm',
                ].join(' ')}>
                  <span className={[
                    'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200',
                    dark ? 'bg-white/8 group-hover:bg-red-900/20' : 'bg-slate-100 group-hover:bg-amber-100',
                  ].join(' ')}>
                    <Icon size={22} className={dark ? 'text-white/60 group-hover:text-red-400' : 'text-slate-500 group-hover:text-amber-600'} />
                  </span>
                  <span className={`text-xs font-bold tracking-wide ${textHi}`}>{bt.name}</span>
                  <span className={`text-[10px] font-medium ${textSb}`}>{bt.count} cars</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. POPULAR CARS — NOW WITH REAL CAR IMAGES
      ══════════════════════════════════════════════ */}
      <section className={`${bgSec} py-12 px-4 border-b ${border}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${gradText}`}>Most Searched</p>
              <h2 className={sectionHead}>Popular Cars</h2>
            </div>
            <Link to="/new-cars" className={`hidden sm:flex items-center gap-1 text-sm font-semibold ${dark ? 'text-red-400 hover:text-red-300' : 'text-amber-600 hover:text-amber-700'} no-underline transition-colors`}>
              View All <RiArrowRightLine size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_CARS.map((car, i) => (
              <Link key={i} to={`/new-cars/${car.name.toLowerCase().replace(/ /g, '-')}`} className={[
                'group block rounded-2xl border overflow-hidden transition-all duration-300 no-underline',
                dark ? 'bg-[#13151E] border-red-900/15 hover:border-red-500/30 hover:shadow-[0_4px_24px_rgba(220,20,40,0.12)]' : 'bg-white border-slate-200 hover:border-amber-400/60 hover:shadow-lg',
              ].join(' ')}>
                {/* Real car image */}
                <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${tagClass(car.tag, dark)} z-10`}>
                    {car.tag}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className={`font-bold text-base leading-tight ${textHi}`}>{car.name}</h3>
                    <p className={`text-[11px] font-semibold mt-0.5 ${gradText}`}>{car.price}</p>
                  </div>
                  <div className={`flex items-center gap-3 text-[11px] font-medium ${textSb} border-t pt-3 ${border}`}>
                    {/* You can add fuel/km info here if desired */}
                  </div>
                  <div className="flex gap-2">
                    <button className={`flex-1 py-2 rounded-xl text-xs font-bold tracking-wide border cursor-pointer transition-all duration-200 ${dark ? 'border-red-900/25 text-white/60 hover:bg-red-900/15 hover:text-red-300 bg-transparent' : 'border-slate-200 text-slate-500 hover:bg-amber-50 hover:text-amber-700 bg-transparent'}`}>
                      Get Price
                    </button>
                    <button className={`flex-1 py-2 rounded-xl text-xs font-bold tracking-wide cursor-pointer border-none ${gradBtn}`}>
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-6">
            <Link to="/new-cars" className={`${gradBtnSm} no-underline`}>View All Cars →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. POPULAR BRANDS
      ══════════════════════════════════════════════ */}
      <section className={`${bg} py-12 px-4 border-b ${border}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${gradText}`}>Top Manufacturers</p>
              <h2 className={sectionHead}>Popular Brands</h2>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {BRANDS.map((b, i) => (
              <Link key={i} to={`/new-cars?brand=${b.name.toLowerCase()}`} className="group flex flex-col items-center gap-2 no-underline">
                <div className={[
                  'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-extrabold text-sm ring-2 ring-transparent transition-all duration-200',
                  brandBgClass(b.color, dark),
                  `group-hover:${brandRingClass(b.color)}`,
                  'group-hover:scale-110',
                ].join(' ')}>{b.initials}</div>
                <span className={`text-xs font-semibold text-center leading-tight ${textSb}`}>{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. ELECTRIC BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`relative overflow-hidden rounded-3xl border ${dark ? 'bg-gradient-to-br from-teal-950 via-[#0a1628] to-[#0D0F16] border-teal-900/30' : 'bg-gradient-to-br from-teal-50 via-blue-50 to-white border-teal-200'} p-8 sm:p-12`}>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${dark ? 'bg-teal-900/40 text-teal-300 border border-teal-700/30' : 'bg-teal-100 text-teal-700 border border-teal-200'}`}>
                  Go Electric
                </div>
                <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dark ? 'text-teal-100' : 'text-teal-900'}`}>Explore Electric Vehicles</h2>
                <p className={`text-sm leading-relaxed ${dark ? 'text-teal-300/70' : 'text-teal-700/80'}`}>Browse 20+ EVs available in India. Compare range, charging time &amp; total cost of ownership.</p>
                <div className="flex flex-wrap gap-4">
                  {['465 km Range', '₹14L Starting', 'Fast Charging'].map((s, i) => (
                    <span key={i} className={`flex items-center gap-1.5 text-xs font-semibold ${dark ? 'text-teal-300' : 'text-teal-700'}`}>
                      <RiCheckLine size={14} /> {s}
                    </span>
                  ))}
                </div>
              </div>
              <Link to="/new-cars?fuel=electric" className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold tracking-wide no-underline border-none cursor-pointer ${dark ? 'bg-teal-500 text-teal-950 hover:bg-teal-400' : 'bg-teal-600 text-white hover:bg-teal-700'} transition-colors`}>
                Explore Now <RiArrowRightLine />
              </Link>
            </div>
            <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full ${dark ? 'bg-teal-900/20' : 'bg-teal-100/60'}`} />
            <div className={`absolute -right-6 bottom-0 w-32 h-32 rounded-full ${dark ? 'bg-teal-800/15' : 'bg-teal-200/50'}`} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. WHY US — SERVICES
      ══════════════════════════════════════════════ */}
      <section className={`${bgSec} py-12 px-4 border-t ${border}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${gradText}`}>Why AutoSyntax</p>
            <h2 className={`${sectionHead} max-w-md mx-auto`}>Everything You Need, In One Place</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={[
                  'flex flex-col items-start gap-3 p-6 rounded-2xl border transition-all duration-200',
                  dark ? 'bg-[#13151E] border-red-900/15 hover:border-red-500/25' : 'bg-white border-slate-200 hover:border-amber-400/50 shadow-sm',
                ].join(' ')}>
                  <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${dark ? 'bg-red-900/20' : 'bg-amber-50'}`}>
                    <Icon size={22} className={dark ? 'text-red-400' : 'text-amber-600'} />
                  </span>
                  <div>
                    <h3 className={`font-bold text-sm mb-1 ${textHi}`}>{s.title}</h3>
                    <p className={`text-xs leading-relaxed ${textSb}`}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. SELL YOUR CAR CTA
      ══════════════════════════════════════════════ */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`relative overflow-hidden rounded-3xl border ${dark ? 'border-red-900/25' : 'border-amber-400/30'} ${dark ? 'bg-gradient-to-br from-red-950/60 to-[#0D0F16]' : 'bg-gradient-to-br from-amber-50 to-white'} p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
            <div className="space-y-2 max-w-md">
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${textHi}`}>Sell Your Car at the <span className={gradText}>Best Price</span></h2>
              <p className={`text-sm leading-relaxed ${textSb}`}>Get instant valuation, connect with 5,000+ verified dealers and sell in just 7 days.</p>
              <div className="flex flex-wrap gap-4 pt-1">
                {['Free Valuation', 'Zero Commission', '7-Day Guarantee'].map((f, i) => (
                  <span key={i} className={`flex items-center gap-1.5 text-xs font-semibold ${dark ? 'text-white/60' : 'text-slate-500'}`}>
                    <RiCheckLine size={13} className={dark ? 'text-red-400' : 'text-amber-500'} /> {f}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/sell" className={`shrink-0 flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold tracking-wide no-underline border-none cursor-pointer ${gradBtn}`}>
              <RiPriceTag3Line size={18} /> Sell My Car
            </Link>
            <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full ${dark ? 'bg-red-900/10' : 'bg-amber-100/60'}`} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. LATEST NEWS
      ══════════════════════════════════════════════ */}
      <section className={`${bgSec} py-12 px-4 border-t ${border}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${gradText}`}>Stay Updated</p>
              <h2 className={sectionHead}>Latest News</h2>
            </div>
            <Link to="/news" className={`hidden sm:flex items-center gap-1 text-sm font-semibold no-underline transition-colors ${dark ? 'text-red-400 hover:text-red-300' : 'text-amber-600 hover:text-amber-700'}`}>
              All News <RiArrowRightLine size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {NEWS.map((n, i) => (
              <Link key={i} to="/news" className={[
                'group block p-5 rounded-2xl border no-underline transition-all duration-200',
                dark ? 'bg-[#13151E] border-red-900/15 hover:border-red-500/25' : 'bg-white border-slate-200 hover:border-amber-400/50 shadow-sm',
              ].join(' ')}>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 ${newsTagClass(n.tag, dark)}`}>{n.tag}</span>
                <h3 className={`font-semibold text-sm leading-snug mb-3 group-hover:${dark ? 'text-red-300' : 'text-amber-700'} transition-colors ${textHi}`}>{n.title}</h3>
                <div className={`flex items-center gap-2 text-[11px] font-medium ${textSb}`}><RiTimeLine size={12} /> {n.time}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. TRUST STRIP
      ══════════════════════════════════════════════ */}
      <section className={`${bg} py-8 px-4 border-t ${border}`}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { icon: RiThumbUpLine,     stat: '4.8★',  label: 'App Rating' },
            { icon: RiShieldCheckLine, stat: '100%',   label: 'Verified Listings' },
            { icon: RiMapPinLine,      stat: '500+',   label: 'Cities Covered' },
            { icon: RiTimeLine,        stat: '<2 min', label: 'Avg. Response Time' },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className={`flex items-center justify-center w-9 h-9 rounded-xl ${dark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <Icon size={18} className={dark ? 'text-white/40' : 'text-slate-400'} />
                </span>
                <div>
                  <div className={`text-sm font-extrabold leading-tight ${gradText}`}>{t.stat}</div>
                  <div className={`text-[11px] font-medium ${textSb}`}>{t.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
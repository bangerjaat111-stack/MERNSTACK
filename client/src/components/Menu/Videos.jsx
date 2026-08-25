import React, { useState, useMemo } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import {
  RiPlayCircleLine, RiSearchLine, RiFireLine, RiTimeLine,
  RiEyeLine, RiStarFill, RiCloseLine, RiFilmLine, RiShareForwardLine
} from 'react-icons/ri';

const VIDEOS_DATA = [
  {
    id: 1,
    title: '2026 Tata Sierra EV First Look & Walkaround | Concept to Reality',
    channel: 'MotorBeam',
    category: 'Walkarounds',
    views: '450K',
    duration: '14:20',
    rating: '4.9',
    thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ', // Sample embed
    blurb: 'In-depth walkaround of the upcoming Tata Sierra EV. Check out the glass roof, retro design cues, and interior space.'
  },
  {
    id: 2,
    title: 'Mahindra Thar Roxx 5-Door vs Force Gurkha 5-Door | Ultimate Offroad Battle',
    channel: 'PowerDrift',
    category: 'Comparisons',
    views: '1.2M',
    duration: '22:15',
    rating: '4.8',
    thumbnail: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ',
    blurb: 'We take both 5-door offroad beasts to extreme mud and rock trails. Which SUV reigns supreme?'
  },
  {
    id: 3,
    title: 'Hyundai Creta EV 2026 Test Drive Review | Range, Acceleration & Features',
    channel: 'Faisal Khan',
    category: 'Reviews',
    views: '890K',
    duration: '18:45',
    rating: '4.9',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ',
    blurb: 'Real-world highway range test of the electric Creta. 0-100 km/h acceleration test and charging speeds.'
  },
  {
    id: 4,
    title: 'BMW M5 Touring (727 HP Hybrid) Drag Race vs Porsche Panamera Turbo S',
    channel: 'CarWow India',
    category: 'Drag Races',
    views: '2.4M',
    duration: '11:05',
    rating: '5.0',
    thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ',
    blurb: 'Quarter-mile drag race and rolling acceleration test between two V8 hybrid performance monsters.'
  },
  {
    id: 5,
    title: 'Top 5 Electric Cars in India Under ₹20 Lakh (2026 Edition)',
    channel: 'CarDekho',
    category: 'EV Specials',
    views: '620K',
    duration: '16:30',
    rating: '4.7',
    thumbnail: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ',
    blurb: 'Comprehensive buying guide covering Nexon EV, Punch EV, Windsor EV, and eVX.'
  },
  {
    id: 6,
    title: 'Maruti Suzuki Dzire 5-Star BNCAP Crash Test Breakdown & Review',
    channel: 'AutoCar India',
    category: 'Reviews',
    views: '740K',
    duration: '12:50',
    rating: '4.8',
    thumbnail: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop',
    embedId: 'dQw4w9WgXcQ',
    blurb: 'Full review of the 5-star rated new Dzire with sunroof, 360-degree camera, and refined Z-series engine.'
  }
];

const CATEGORIES = ['All', 'Reviews', 'Comparisons', 'Drag Races', 'EV Specials', 'Walkarounds'];

export default function Videos() {
  const { dark } = useTheme();
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filtered = useMemo(() => {
    return VIDEOS_DATA.filter((v) => {
      const matchCat = activeCat === 'All' || v.category === activeCat;
      const matchSearch =
        searchQuery.trim() === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, searchQuery]);

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradText = dark
    ? 'bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              <RiFilmLine size={14} /> AutoSyntax TV & Media
            </div>
            <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 ${textHi}`}>
              Car Video <span className={gradText}>Reviews & Test Drives</span>
            </h1>
            <p className={`text-sm mt-1 ${textSb}`}>
              Watch expert reviews, high-speed drag races, EV tests, and detailed car walkarounds.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${border} ${cardBg} w-full md:w-80 shadow-sm`}>
            <RiSearchLine size={18} className={textSb} />
            <input
              type="text"
              placeholder="Search reviews, channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent outline-none text-xs font-medium ${textHi} placeholder:${textSb}`}
            />
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border-none ${
                activeCat === cat
                  ? gradBtn
                  : dark
                  ? 'bg-white/5 text-white/60 hover:text-white'
                  : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`group rounded-2xl border ${border} ${cardBg} overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col`}
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <RiPlayCircleLine size={32} />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <RiTimeLine size={12} /> {video.duration}
                </span>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  {video.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-bold ${gradText}`}>{video.channel}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <RiStarFill size={13} /> {video.rating}
                    </span>
                  </div>
                  <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${textHi} group-hover:text-red-500 transition-colors`}>
                    {video.title}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-2 ${textSb}`}>
                    {video.blurb}
                  </p>
                </div>

                <div className={`flex items-center justify-between text-[11px] pt-3 border-t ${border} ${textSb}`}>
                  <span className="flex items-center gap-1">
                    <RiEyeLine size={13} /> {video.views} views
                  </span>
                  <span className="font-bold text-red-500 hover:underline flex items-center gap-1">
                    Watch Now →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border ${border} ${cardBg}`}>
            <p className={`text-base font-bold ${textHi}`}>No videos found</p>
            <p className={`text-xs mt-1 ${textSb}`}>Try clearing your search query or switching categories.</p>
          </div>
        )}

      </div>

      {/* VIDEO MODAL PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-4xl rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-2xl space-y-4 p-4`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  {selectedVideo.category}
                </span>
                <h3 className={`font-bold text-sm sm:text-base line-clamp-1 ${textHi}`}>
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer border-none"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Embed Video iFrame */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.embedId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Footer info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className={`font-bold ${gradText}`}>{selectedVideo.channel}</span>
                <p className={`text-xs mt-0.5 ${textSb}`}>{selectedVideo.blurb}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Video link copied to clipboard!');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'} cursor-pointer`}
              >
                <RiShareForwardLine size={16} /> Share Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

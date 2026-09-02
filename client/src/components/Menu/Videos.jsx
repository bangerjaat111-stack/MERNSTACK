import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { GENERATED_200_VIDEOS, CATEGORIES } from '../../data/videosData';
import {
  RiPlayCircleLine, RiSearchLine, RiTimeLine,
  RiEyeLine, RiStarFill, RiCloseLine, RiFilmLine, RiShareForwardLine, RiArrowLeftLine
} from 'react-icons/ri';

export default function Videos() {
  const { dark } = useTheme();
  const [activeCat, setActiveCat] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    return GENERATED_200_VIDEOS.filter((v) => {
      const matchCat =
        activeCat === 'All' ||
        v.category === activeCat ||
        v.brand === activeCat;

      const q = searchVal.toLowerCase().trim();
      const matchSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [activeCat, searchVal]);

  const displayedVideos = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

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
              <RiFilmLine size={14} /> AutoSyntax TV · 200 YouTube Car Reviews & Deliveries
            </div>
            <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 ${textHi}`}>
              Explore <span className={gradText}>200 YouTube Car Videos</span>
            </h1>
            <p className={`text-sm mt-1 ${textSb}`}>
              Watch authentic Indian car delivery videos, offroad challenges, and detailed drive reviews for all cars.
            </p>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-80">
            <div className={`flex items-center gap-2 px-4 h-11 rounded-xl border transition-all ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              <RiSearchLine className={dark ? 'text-white/40' : 'text-slate-400'} size={18} />
              <input
                type="text"
                placeholder="Search 200 car videos, brands..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full bg-transparent border-none outline-none text-xs font-medium"
              />
              {searchVal && (
                <button onClick={() => setSearchVal('')} className="bg-transparent border-none cursor-pointer text-xs font-bold text-slate-400">✕</button>
              )}
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setVisibleCount(12);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border-none ${
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

        {/* VIDEO COUNTER */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Showing {displayedVideos.length} of {filtered.length} YouTube Videos</span>
          {filtered.length === 200 && <span className="text-red-500 font-extrabold">200 Videos Available</span>}
        </div>
       

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`group rounded-2xl border ${border} ${cardBg} overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between`}
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnailFallback}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                
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

                {/* Brand & Category Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  {video.brand} · {video.category}
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
                    Watch Car Video →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filtered.length && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filtered.length))}
              className={`px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer border-none shadow-lg transition-all ${gradBtn}`}
            >
              Load More Car Videos ({filtered.length - visibleCount} Remaining)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border ${border} ${cardBg}`}>
            <p className={`text-base font-bold ${textHi}`}>No car videos found matching your search</p>
            <p className={`text-xs mt-1 ${textSb}`}>Try searching for Swift, Thar, Nexon, Creta, or clearing your search query.</p>
          </div>
        )}

      </div>

      {/* YOUTUBE IFRAME EMBED MODAL PLAYER WITH PROMINENT CROSS CLOSE & BACK BUTTON */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-2xl space-y-4 p-5 cursor-default my-auto`}
          >
            
            {/* Modal Header with BACK and CROSS (X) BUTTON */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-3">
              <button
                onClick={() => setSelectedVideo(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-none"
              >
                <RiArrowLeftLine size={18} /> Back to Videos
              </button>

              <div className="hidden sm:block flex-1 text-center truncate px-2">
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full mr-2">
                  {selectedVideo.brand} {selectedVideo.model}
                </span>
                <span className={`font-bold text-sm ${textHi}`}>
                  {selectedVideo.title}
                </span>
              </div>

              {/* HIGH VISIBILITY RED CLOSE CROSS BUTTON */}
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close YouTube Video"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider cursor-pointer border-none shadow-lg transition-transform hover:scale-105"
              >
                <RiCloseLine size={20} /> Close ✕
              </button>
            </div>

            {/* Embed YouTube iFrame Player */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
              <iframe
                width="560"
                height="315"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?si=1PQB-Wj4h0mOxYE8&autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Video Footer info & Close Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1">
              <div>
                <span className={`font-bold ${gradText}`}>{selectedVideo.channel} · {selectedVideo.views} views</span>
                <p className={`text-xs mt-0.5 ${textSb}`}>{selectedVideo.blurb}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${selectedVideo.embedId}`);
                    alert('YouTube video link copied!');
                  }}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'} cursor-pointer`}
                >
                  <RiShareForwardLine size={16} /> Share Link
                </button>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer border-none shadow"
                >
                  Close & Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

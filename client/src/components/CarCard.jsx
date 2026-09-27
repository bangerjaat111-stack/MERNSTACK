import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../Context/WishlistContext.jsx';
import { useTheme } from '../Context/ThemeContext.jsx';
import { Gauge, Fuel, Settings2, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { RiHeartLine, RiHeartFill, RiCalculatorLine } from 'react-icons/ri';

export default function CarCard({ car, onCalcEmi, onViewDetail }) {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const isSaved = isWishlisted(car.id || car._id || car.title);

  const handleCardClick = () => {
    if (onViewDetail) {
      onViewDetail(car);
    } else if (car.id || car._id) {
      navigate(`/used-cars/${car.id || car._id}`);
    }
  };

  const border = dark ? 'border-red-900/20' : 'border-slate-200';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';

  const displayImage = car.img || car.thumbnail || car.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop';
  
  // Format title: Year + Brand + Model + Variant
  const title = car.title || `${car.year || 2023} ${car.brand || ''} ${car.model || ''} ${car.variant || ''}`.trim();
  const price = car.price || (car.priceNum ? `₹${(car.priceNum / 100000).toFixed(2)} Lakh` : 'Price on Request');
  const km = car.km ? (typeof car.km === 'number' ? `${car.km.toLocaleString()} km` : car.km) : '20,000 km';
  const year = car.year || '2023';
  const fuel = car.fuel || car.engine?.fuelType || 'Petrol';
  const trans = car.trans || car.engine?.transmission || 'Automatic';
  const city = car.city || 'Gurgaon';
  const tag = car.tag || (car.inspectionScore ? 'Great Deal' : 'Certified');
  const rating = car.rating || '4.8';
  const emiText = car.emi ? `Est. ₹${car.emi.toLocaleString('en-IN')}/mo` : `Est. ₹${Math.round((car.priceNum || 600000) * 0.018).toLocaleString('en-IN')}/mo`;

  return (
    <div
      onClick={handleCardClick}
      className={`group rounded-3xl border ${border} ${cardBg} overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer`}
    >
      {/* IMAGE CONTAINER WITH OVERLAY BADGES */}
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <img
          src={displayImage}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Deal Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider ${
            tag === 'Good Deal' || tag === '5-Star Safety'
              ? 'bg-emerald-500 text-white'
              : tag === 'Great Deal' || tag === 'Certified'
              ? 'bg-white text-slate-900 font-black'
              : 'bg-amber-500 text-black font-black'
          }`}>
            {tag}
          </span>
        </div>

        {/* Top-Right Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(car);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-800 flex items-center justify-center border-none cursor-pointer hover:bg-red-600 hover:text-white transition-colors shadow-md z-10"
          title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isSaved ? <RiHeartFill size={17} className="text-red-600" /> : <RiHeartLine size={17} />}
        </button>

        {/* Bottom Right Brand Badge Logo */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center border border-white/20 text-[10px] font-black uppercase shadow">
          {car.brand ? car.brand.slice(0, 2) : 'AS'}
        </div>
      </div>

      {/* CARD CONTENT DETAILS */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title & Subtitle */}
          <h3 className={`font-extrabold text-base leading-snug line-clamp-1 ${textHi} group-hover:text-red-500 transition-colors`}>
            {title}
          </h3>
          <p className={`text-xs ${textSb} mt-0.5 flex items-center gap-1 font-medium`}>
            <span>{km}</span> · <span>{city}</span>
          </p>

          {/* Price & Est Monthly EMI row */}
          <div className="flex items-baseline justify-between mt-3">
            <span className={`text-xl font-black ${textHi}`}>
              {price}
            </span>
            <span className="text-[11px] font-bold text-amber-700 dark:text-red-400 bg-amber-50 dark:bg-red-950/40 px-2.5 py-1 rounded-md border border-amber-200 dark:border-red-900/30">
              {emiText}
            </span>
          </div>

          {/* 3 Metrics Specs Row */}
          <div className={`grid grid-cols-3 gap-2 mt-4 pt-3 border-t ${dark ? 'border-white/10' : 'border-slate-100'} text-center`}>
            <div>
              <span className={`block font-extrabold text-xs ${textHi}`}>{km.split(' ')[0]}</span>
              <span className={`text-[10px] uppercase font-semibold ${textSb}`}>KM DRIVEN</span>
            </div>
            <div>
              <span className={`block font-extrabold text-xs ${textHi}`}>{fuel}</span>
              <span className={`text-[10px] uppercase font-semibold ${textSb}`}>FUEL</span>
            </div>
            <div>
              <span className={`block font-extrabold text-xs ${textHi}`}>{trans}</span>
              <span className={`text-[10px] uppercase font-semibold ${textSb}`}>TRANS</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Rating / Seller & View Details Action */}
        <div className={`pt-3 border-t ${dark ? 'border-white/10' : 'border-slate-100'} flex items-center justify-between text-xs`}>
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Star size={13} fill="currentColor" />
            <span className={textHi}>{rating}</span>
            <span className={`font-normal ${textSb}`}>· {car.contact?.name || 'Verified Seller'}</span>
          </div>

          <span className="font-extrabold text-xs text-red-500 group-hover:underline flex items-center gap-0.5">
            View details <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

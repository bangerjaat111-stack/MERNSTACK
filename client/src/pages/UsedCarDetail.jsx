import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext.jsx';
import { useWishlist } from '../Context/WishlistContext.jsx';
import { showSuccessToast } from '../components/Notification/Tost';
import axios from 'axios';
import { API_URL } from '../config/api.js';
import {
 RiShieldCheckLine, RiMapPinLine, 
  RiHeartLine, RiHeartFill, RiShareLine, RiPhoneLine, RiCalendarLine,
  RiDashboard3Line, RiGasStationLine, RiCompass3Line, 
  RiArrowLeftLine, RiCheckDoubleLine
} from 'react-icons/ri';

const MOCK_USED_CARS_DETAILS = {
  '101': {
    id: 101,
    title: '2021 Maruti Suzuki Swift VXI',
    brand: 'Maruti Suzuki',
    model: 'Swift VXI',
    year: 2021,
    price: '₹6.12 Lakh',
    priceNum: 612000,
    emi: 11900,
    km: '24,500 km',
    fuel: 'Petrol',
    trans: 'Manual',
    owner: '1st Owner',
    city: 'Gurgaon',
    location: 'Sector 54, Gurgaon',
    insurance: 'Comprehensive till Oct 2026',
    color: 'Pearl Arctic White',
    regState: 'HR-26 (Haryana)',
    inspectionScore: '9.2 / 10',
    description: 'Immaculately maintained single-owner hatchback. Full service history at authorized dealership. Non-accidental, original paint, brand new tires.',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
    ],
    seller: {
      name: 'AutoSyntax Verified Seller',
      phone: '+91 98765 43210',
      type: 'Certified Dealer',
      rating: '4.9 ★ (120 Reviews)'
    }
  },
  '102': {
    id: 102,
    title: '2020 Hyundai Creta SX(O)',
    brand: 'Hyundai',
    model: 'Creta SX(O)',
    year: 2020,
    price: '₹13.45 Lakh',
    priceNum: 1345000,
    emi: 24800,
    km: '38,200 km',
    fuel: 'Diesel',
    trans: 'Automatic',
    owner: '1st Owner',
    city: 'Pune',
    location: 'Baner, Pune',
    insurance: 'Zero Dep Insurance Active',
    color: 'Phantom Black',
    regState: 'MH-12 (Maharashtra)',
    inspectionScore: '9.5 / 10',
    description: 'Top-end diesel automatic Creta with Panoramic Sunroof, Bose 8-Speaker Audio, Wireless Charger, and 6 Airbags.',
    images: [
      'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
    ],
    seller: {
      name: 'AutoSyntax Pune Hub',
      phone: '+91 98123 45678',
      type: 'Direct Hub',
      rating: '4.8 ★'
    }
  }
};

export default function UsedCarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [car, setCar] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [testDriveBooked, setTestDriveBooked] = useState(false);

  useEffect(() => {
    const fetchCarDetail = async () => {
      if (id) {
        try {
          const res = await axios.get(`${API_URL}/used-cars/${id}`);
          if (res.data?.status && res.data?.data) {
            const d = res.data.data;
            setCar({
              id: d._id || d.id || id,
              title: d.title || `${d.brand} ${d.model}`,
              brand: d.brand || 'AutoSyntax',
              model: d.model || '',
              year: d.year || 2022,
              price: d.price || `₹${((d.priceNum || 500000) / 100000).toFixed(2)} Lakh`,
              priceNum: d.priceNum || 500000,
              emi: Math.round(((d.priceNum || 500000) * 0.8 * 0.085 / 12) * 1.2),
              km: d.km || '20,000 km',
              fuel: d.fuel || 'Petrol',
              trans: d.trans || 'Manual',
              owner: d.owner || '1st Owner',
              city: d.city || 'Gurgaon',
              location: d.location || `${d.city || 'Gurgaon'}, India`,
              insurance: d.insurance || 'Valid Insurance Active',
              color: d.color || 'Pearl White',
              regState: d.regState || `${d.city || 'HR-26'}`,
              inspectionScore: d.inspectionScore || '9.4 / 10',
              description: d.description || 'Certified vehicle in immaculate condition. Fully inspected by AutoSyntax experts.',
              images: d.images && d.images.length > 0 ? d.images : [d.img || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'],
              seller: {
                name: d.contact?.name || 'AutoSyntax Verified Seller',
                phone: d.contact?.phone || '+91 98765 43210',
                type: 'Verified Seller',
                rating: '4.9 ★'
              }
            });
            return;
          }
        } catch (err) {
          console.error('API detail fetch error, checking local mock:', err);
        }
      }

      if (id && MOCK_USED_CARS_DETAILS[id]) {
        setCar(MOCK_USED_CARS_DETAILS[id]);
      } else {
        // Fallback default structure
        setCar({
          id: id || 101,
          title: '2022 Tata Nexon XZ+',
          brand: 'Tata Motors',
          model: 'Nexon XZ+',
          year: 2022,
          price: '₹8.95 Lakh',
          priceNum: 895000,
          emi: 16700,
          km: '12,800 km',
          fuel: 'Petrol',
          trans: 'Manual',
          owner: '1st Owner',
          city: 'Bengaluru',
          location: 'Indiranagar, Bengaluru',
          insurance: 'Valid till 2026',
          color: 'Foliage Green',
          regState: 'KA-01 (Karnataka)',
          inspectionScore: '9.4 / 10',
          description: 'Certified 5-star safety rated compact SUV in pristine condition with touchscreen infotainment & rear camera.',
          images: [
            'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'
          ],
          seller: {
            name: 'AutoSyntax Verified Direct Seller',
            phone: '+91 99887 76655',
            type: 'Verified Seller',
            rating: '4.9 ★'
          }
        });
      }
    };
    fetchCarDetail();
  }, [id]);

  if (!car) return null;

  const isSaved = isWishlisted(car.id || car.title);

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-slate-200';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  const handleBookTestDrive = (e) => {
    e.preventDefault();
    setTestDriveBooked(true);
    showSuccessToast('Test drive appointment booked successfully!');
  };

  return (
    <div className={`min-h-screen ${bg} py-8 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Link */}
        <Link
          to="/used-cars"
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider no-underline ${dark ? 'text-white/60 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <RiArrowLeftLine size={16} /> Back to Used Cars List
        </Link>

        {/* HEADER TITLE & ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {car.brand}
              </span>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                <RiShieldCheckLine /> Score: {car.inspectionScore}
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${textHi}`}>
              {car.title}
            </h1>
            <p className={`text-xs mt-1 ${textSb} flex items-center gap-2`}>
              <RiMapPinLine className="text-red-500" /> {car.location} · Registered: {car.regState}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(car)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-transform hover:scale-105 ${
                isSaved ? 'bg-red-600 text-white border-red-500 shadow' : dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              {isSaved ? <RiHeartFill size={18} /> : <RiHeartLine size={18} />}
              {isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: car.title, url: window.location.href });
                } else {
                  showSuccessToast('Link copied to clipboard!');
                }
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-800'}`}
              title="Share Listing"
            >
              <RiShareLine size={18} />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT 2 COLUMNS: GALLERY & SPECS */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Image Gallery */}
            <div className={`rounded-3xl border ${border} ${cardBg} overflow-hidden shadow-xl space-y-3 p-3`}>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-black/60">
                <img
                  src={car.images[activeImageIdx] || car.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {car.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 cursor-pointer transition-all shrink-0 p-0 ${
                      activeImageIdx === idx ? 'border-red-500 scale-105 shadow' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* KEY HIGHLIGHTS SPEC GRID */}
            <div className={`p-6 rounded-3xl border ${border} ${cardBg} space-y-4 shadow-xl`}>
              <h3 className={`text-base font-extrabold ${textHi}`}>Key Vehicle Highlights</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className={`p-3 rounded-2xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <RiDashboard3Line className="text-red-500 mb-1" size={18} />
                  <span className="text-[10px] text-slate-400 block font-semibold">KILOMETERS</span>
                  <strong className={`font-bold text-sm ${textHi}`}>{car.km}</strong>
                </div>

                <div className={`p-3 rounded-2xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <RiGasStationLine className="text-amber-500 mb-1" size={18} />
                  <span className="text-[10px] text-slate-400 block font-semibold">FUEL TYPE</span>
                  <strong className={`font-bold text-sm ${textHi}`}>{car.fuel}</strong>
                </div>

                <div className={`p-3 rounded-2xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <RiCompass3Line className="text-blue-500 mb-1" size={18} />
                  <span className="text-[10px] text-slate-400 block font-semibold">TRANSMISSION</span>
                  <strong className={`font-bold text-sm ${textHi}`}>{car.trans}</strong>
                </div>

                <div className={`p-3 rounded-2xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <RiCalendarLine className="text-green-500 mb-1" size={18} />
                  <span className="text-[10px] text-slate-400 block font-semibold">OWNERSHIP</span>
                  <strong className={`font-bold text-sm ${textHi}`}>{car.owner}</strong>
                </div>
              </div>
            </div>

            {/* OVERVIEW & DESCRIPTION */}
            <div className={`p-6 rounded-3xl border ${border} ${cardBg} space-y-3 shadow-xl ${textHi}`}>
              <h3 className="text-base font-extrabold">Detailed Vehicle Description</h3>
              <p className={`text-xs leading-relaxed ${textSb}`}>
                {car.description}
              </p>
              
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <p><span className="text-slate-400 font-semibold">Insurance Status:</span> <strong>{car.insurance}</strong></p>
                <p><span className="text-slate-400 font-semibold">Exterior Color:</span> <strong>{car.color}</strong></p>
                <p><span className="text-slate-400 font-semibold">Registration State:</span> <strong>{car.regState}</strong></p>
                <p><span className="text-slate-400 font-semibold">Quality Inspection:</span> <strong className="text-green-500">200+ Point Verified</strong></p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PRICE & BOOK TEST DRIVE */}
          <div className="space-y-6">

            {/* Price Box */}
            <div className={`p-6 rounded-3xl border ${border} ${cardBg} space-y-4 shadow-xl`}>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Offered Price</span>
                <h2 className="text-3xl font-black text-red-500 mt-1">{car.price}</h2>
                <p className="text-xs text-amber-500 font-bold mt-1">
                  Est. EMI starting ₹{car.emi.toLocaleString('en-IN')} / month
                </p>
              </div>

              {/* Verified Seller info */}
              <div className={`p-4 rounded-2xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-100'} space-y-2 text-xs`}>
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${textHi}`}>{car.seller.name}</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-500 font-bold text-[10px]">{car.seller.type}</span>
                </div>
                <p className={textSb}>{car.seller.rating}</p>
                <p className="font-extrabold text-red-500 flex items-center gap-1">
                  <RiPhoneLine /> {car.seller.phone}
                </p>
              </div>

              {/* Book Test drive form */}
              {testDriveBooked ? (
                <div className="p-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-center space-y-2">
                  <RiCheckDoubleLine size={32} className="mx-auto text-green-500" />
                  <h4 className="font-bold text-sm text-green-500">Test Drive Appointed!</h4>
                  <p className="text-xs text-slate-300">
                    Our sales representative will call you shortly to confirm your doorstep appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTestDrive} className="space-y-3 pt-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${textHi}`}>Schedule Free Doorstep Test Drive</h4>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none font-semibold ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none font-semibold ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
                  >
                    Confirm Free Test Drive Appointment
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

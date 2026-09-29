import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { API_URL } from '../../config/api.js';
import {
  RiCarLine,  RiCloseLine,
   RiFilter3Line, RiShieldCheckLine,
  RiCalculatorLine,  RiHeartLine, RiHeartFill
} from 'react-icons/ri';

// EMI Calculator Modal Component
function EmiCalculatorModal({ car, onClose, dark }) {
  const parsePrice = (priceStr) => {
    if (!priceStr) return 600000;
    const clean = priceStr.replace(/[^0-9.]/g, '');
    const val = parseFloat(clean);
    if (isNaN(val)) return 600000;
    if (priceStr.toLowerCase().includes('crore')) return Math.round(val * 10000000);
    if (priceStr.toLowerCase().includes('lakh')) return Math.round(val * 100000);
    return Math.round(val);
  };

  const initialPrice = parsePrice(car?.variants?.[0]?.price || car?.price);
  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  const downPayment = Math.round((carPrice * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, carPrice - downPayment);

  const calculateEmi = () => {
    if (loanAmount <= 0) return 0;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEmi();
  const totalPayable = emi * tenureYears * 12;
  const totalInterest = Math.max(0, totalPayable - loanAmount);

  const formatINR = (val) => {
    return '₹ ' + val.toLocaleString('en-IN');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl rounded-3xl border ${
          dark ? 'bg-[#0D0F16] border-red-900/40 text-white' : 'bg-white border-amber-600/25 text-slate-900'
        } p-6 shadow-2xl space-y-6 cursor-default max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
              Car Loan Calculator
            </span>
            <h2 className="text-xl font-black uppercase mt-1">
              EMI Calculator {car ? `— ${car.title}` : ''}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-red-600 hover:text-white transition-colors cursor-pointer border-none text-slate-300"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        {/* EMI Summary Card */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-red-600 via-red-700 to-amber-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-white/80">Estimated Monthly EMI</span>
            <h3 className="text-3xl font-black mt-0.5">{formatINR(emi)} <span className="text-sm font-normal">/ month</span></h3>
            <p className="text-[11px] text-white/80 mt-1">For {tenureYears} Years @ {interestRate}% Interest Rate</p>
          </div>
          <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/20 pt-3 sm:pt-0 sm:pl-5 text-xs space-y-1">
            <p>Loan Amount: <strong>{formatINR(loanAmount)}</strong></p>
            <p>Total Interest: <strong>{formatINR(totalInterest)}</strong></p>
            <p>Total Payable: <strong>{formatINR(totalPayable)}</strong></p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-4 text-xs font-semibold">
          {/* Car Price */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Car Price:</span>
              <span className="font-extrabold text-amber-500">{formatINR(carPrice)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="15000000"
              step="50000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Down Payment ({downPaymentPercent}%):</span>
              <span className="font-extrabold text-red-500">{formatINR(downPayment)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Interest Rate (% p.a.):</span>
              <span className="font-extrabold text-amber-500">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="18"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Loan Tenure (Years):</span>
              <span className="font-extrabold text-red-500">{tenureYears} Years ({tenureYears * 12} Months)</span>
            </div>
            <div className="flex gap-2 pt-1">
              {[1, 2, 3, 4, 5, 6, 7].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTenureYears(yr)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                    tenureYears === yr
                      ? 'bg-red-600 text-white border-red-500 shadow'
                      : dark ? 'bg-white/5 text-white/70 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {yr} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <p className="text-[10px] text-slate-400">
            *Indicative calculation. Subject to bank approval & credit score.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider border-none cursor-pointer hover:bg-red-700 transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Newcars() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState('All');
  const [activeBodyType, setActiveBodyType] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [emiCar, setEmiCar] = useState(null);

  // Sync search query parameter from URL (Navbar search)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q !== null) {
      setSearchVal(q);
    } else {
      setSearchVal('');
    }
  }, [location.search]);

  // Fetch cars from backend API (/car)
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/car`);
        if (response.data && response.data.data) {
          setCars(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching cars API:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Compute unique brands and body types dynamically
  const brands = useMemo(() => {
    const set = new Set(cars.map(c => c.brand).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [cars]);

  const bodyTypes = useMemo(() => {
    const set = new Set(cars.map(c => c.bodyType).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [cars]);

  // Filter cars logic
  const filteredCars = useMemo(() => {
    return cars.filter(c => {
      const matchBrand = activeBrand === 'All' || (c.brand && c.brand.toLowerCase() === activeBrand.toLowerCase());
      const matchBody = activeBodyType === 'All' || (c.bodyType && c.bodyType.toLowerCase() === activeBodyType.toLowerCase());
      
      const q = searchVal.toLowerCase().trim();
      const matchQuery = !q ||
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.brand && c.brand.toLowerCase().includes(q)) ||
        (c.model && c.model.toLowerCase().includes(q)) ||
        (c.segment && c.segment.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.engine?.fuelType && c.engine.fuelType.toLowerCase().includes(q));

      return matchBrand && matchBody && matchQuery;
    });
  }, [cars, activeBrand, activeBodyType, searchVal]);

  // Theme styling definitions
  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';

  return (
    <div className={`min-h-screen ${bg} py-8 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-7xl mx-auto space-y-6">

    

        {/* BRAND FILTERS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1 shrink-0">
            <RiFilter3Line size={14} /> Brands:
          </span>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap ${
                activeBrand === b
                  ? dark ? 'bg-red-600 text-white border-red-500' : 'bg-amber-600 text-white border-amber-500'
                  : dark ? 'bg-white/5 border-white/10 text-white/60 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* BODY TYPE FILTERS */}
        {bodyTypes.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1 shrink-0">
              <RiCarLine size={14} /> Body Type:
            </span>
            {bodyTypes.map((bt) => (
              <button
                key={bt}
                onClick={() => setActiveBodyType(bt)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer border whitespace-nowrap ${
                  activeBodyType === bt
                    ? dark ? 'bg-red-700 text-white border-red-600' : 'bg-amber-700 text-white border-amber-600'
                    : dark ? 'bg-white/5 border-white/5 text-white/40 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {bt}
              </button>
            ))}
          </div>
        )}

        {/* CARS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`h-80 rounded-2xl animate-pulse ${dark ? 'bg-white/5' : 'bg-slate-200'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => {
              const startPrice = car.variants?.[0]?.price || 'N/A';
              const isSaved = isWishlisted(car);

              return (
                <div
                  key={car._id || car.id || car.title}
                  onClick={() => setSelectedCar(car)}
                  className={`group rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between`}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={car.thumbnail}
                      alt={car.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Brand & BodyType Badge */}
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                      {car.brand} · {car.bodyType}
                    </span>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(car);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-110 border-none cursor-pointer z-10"
                      title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {isSaved ? (
                        <RiHeartFill size={18} className="text-red-500" />
                      ) : (
                        <RiHeartLine size={18} className="text-white hover:text-red-400" />
                      )}
                    </button>

                    {/* Price Tag */}
                    <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-red-400 font-extrabold text-xs px-3 py-1 rounded-lg border border-red-500/30">
                      Starts {startPrice}
                    </span>
                  </div>

                  {/* Content Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className={`font-extrabold text-base leading-snug line-clamp-1 ${textHi} group-hover:text-red-500 transition-colors`}>
                        {car.title}
                      </h3>
                      <p className={`text-xs mt-1 line-clamp-2 ${textSb}`}>
                        {car.description}
                      </p>
                    </div>

                    {/* Engine & Transmission preview */}
                    <div className={`p-2.5 rounded-xl ${dark ? 'bg-white/5 border border-white/5' : 'bg-slate-100/90 border border-slate-200/60'} space-y-1`}>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span className="truncate">Fuel: {car.engine?.fuelType || 'Petrol / Diesel'}</span>
                        <span className="text-red-500 font-bold shrink-0 ml-1">{car.engine?.transmission || 'Manual/AMT'}</span>
                      </div>
                      {car.safety?.airbags && (
                        <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          <RiShieldCheckLine size={12} className="text-red-500" /> {car.safety.airbags} Airbags · {car.segment}
                        </div>
                      )}
                    </div>

                    {/* Footer link replaced Model Year with EMI Calculator */}
                    <div className={`flex items-center justify-between text-xs pt-2 border-t ${border} ${textSb}`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEmiCar(car);
                        }}
                        className="flex items-center gap-1.5 font-bold text-amber-500 hover:text-amber-400 cursor-pointer border-none bg-transparent"
                        title="Calculate Car Loan EMI"
                      >
                        <RiCalculatorLine size={15} /> EMI Calculator
                      </button>
                      <span className="font-bold text-red-500 group-hover:underline">View Specs & Variants →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* NO RESULTS FOUND STATE */}
        {!loading && filteredCars.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border ${border} ${cardBg}`}>
            <RiCarLine size={48} className="mx-auto text-slate-500 mb-3" />
            <p className={`text-base font-bold ${textHi}`}>No cars found matching your search</p>
            <p className={`text-xs mt-1 ${textSb}`}>Try adjusting your brand, body type or search query.</p>
            <button
              onClick={() => {
                setActiveBrand('All');
                setActiveBodyType('All');
                setSearchVal('');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* CAR DETAILS MODAL */}
      {selectedCar && (
        <div
          onClick={() => setSelectedCar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 cursor-default my-auto max-h-[92vh] overflow-y-auto scrollbar-thin`}
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2 truncate">
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  {selectedCar.brand}
                </span>
                <h2 className={`font-extrabold text-base sm:text-lg ${textHi} truncate`}>
                  {selectedCar.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(selectedCar)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-none font-bold text-xs cursor-pointer transition-transform hover:scale-105 ${
                    isWishlisted(selectedCar)
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={isWishlisted(selectedCar) ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  {isWishlisted(selectedCar) ? (
                    <><RiHeartFill size={16} className="text-white" /> Saved</>
                  ) : (
                    <><RiHeartLine size={16} /> Wishlist</>
                  )}
                </button>
                <button
                  onClick={() => setEmiCar(selectedCar)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-extrabold cursor-pointer border-none shadow transition-transform hover:scale-105"
                >
                  <RiCalculatorLine size={16} /> EMI
                </button>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-400 hover:bg-red-700  tracking-wider cursor-pointer border-none shadow transition-transform hover:scale-105"
                >
                  <RiCloseLine size={20} /> 
                </button>
              </div>
            </div>

            {/* Image & Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="relative h-56 rounded-xl overflow-hidden bg-black/40">
                <img
                  src={selectedCar.thumbnail}
                  alt={selectedCar.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <h3 className={`text-lg font-black ${textHi}`}>{selectedCar.title}</h3>
                <p className={`text-xs ${textSb} leading-relaxed`}>{selectedCar.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2.5 rounded-lg border ${border} ${dark ? 'bg-black/30' : 'bg-slate-50'}`}>
                    <span className="text-[10px] text-slate-400 block font-semibold">BODY TYPE</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.bodyType}</span>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${border} ${dark ? 'bg-black/30' : 'bg-slate-50'}`}>
                    <span className="text-[10px] text-slate-400 block font-semibold">SEGMENT</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.segment}</span>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${border} ${dark ? 'bg-black/30' : 'bg-slate-50'}`}>
                    <span className="text-[10px] text-slate-400 block font-semibold">FUEL TYPE</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine?.fuelType || 'Petrol / Diesel'}</span>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${border} ${dark ? 'bg-black/30' : 'bg-slate-50'}`}>
                    <span className="text-[10px] text-slate-400 block font-semibold">TRANSMISSION</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine?.transmission || 'Manual/AMT'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VARIANTS TABLE */}
            {selectedCar.variants && selectedCar.variants.length > 0 && (
              <div className={`p-4 rounded-xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-100/80'} space-y-2`}>
                <h4 className={`text-xs font-black uppercase tracking-wider ${textHi}`}>Available Variants & Prices</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {selectedCar.variants.map((v, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg border ${border} ${dark ? 'bg-black/30' : 'bg-white'} flex justify-between items-center`}>
                      <span className={`font-semibold ${textHi}`}>{v.name}</span>
                      <span className="font-extrabold text-red-500 ml-2">{v.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DETAILED SPECIFICATIONS */}
            {selectedCar.engine && (
              <div className={`p-4 rounded-xl border ${border} ${dark ? 'bg-white/5' : 'bg-slate-100/80'} space-y-3`}>
                <h4 className={`text-xs font-black uppercase tracking-wider ${textHi}`}>Engine & Performance Specs</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">DISPLACEMENT</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine.displacement || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">MAX POWER</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine.maxPower || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">MAX TORQUE</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine.maxTorque || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">DRIVETRAIN</span>
                    <span className={`font-bold ${textHi}`}>{selectedCar.engine.drivetrain || 'FWD'}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* EMI CALCULATOR MODAL DIALOG */}
      {emiCar && (
        <EmiCalculatorModal
          car={emiCar}
          onClose={() => setEmiCar(null)}
          dark={dark}
        />
      )}

    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { showSuccessToast } from '../Notification/Tost';
import {
  RiFireLine, RiPriceTag3Line, RiPercentLine, RiTimeLine,
  RiCheckLine, RiCloseLine, RiCalculatorLine, RiArrowRightLine,
  RiShieldCheckLine, RiCarLine, RiHeartLine, RiHeartFill
} from 'react-icons/ri';

const HOT_DEALS_DATA = [
  {
    id: 1,
    name: 'Tata Nexon EV Max (XZ+ Lux)',
    brand: 'Tata',
    originalPrice: 17.49,
    dealPrice: 15.29,
    discount: '₹2.20 Lakh OFF',
    discountPct: '12.5%',
    tag: 'Festive Flash Deal',
    expiry: 'Ends in 14h 20m',
    fuel: 'Electric',
    city: 'Gurgaon / Delhi NCR',
    img: 'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp',
    perks: ['Free 7.2 kW Wallbox Charger', '1-Year Free Insurance', 'Zero Down Payment EMI']
  },
  {
    id: 2,
    name: 'Hyundai Creta SX (O) Turbo Petrol',
    brand: 'Hyundai',
    originalPrice: 18.90,
    dealPrice: 17.35,
    discount: '₹1.55 Lakh OFF',
    discountPct: '8.2%',
    tag: 'Special Exchange Bonus',
    expiry: 'Ends in 08h 45m',
    fuel: 'Petrol',
    city: 'Mumbai / Pune',
    img: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg',
    perks: ['₹50,000 Exchange Bonus', '5-Year Extended Warranty', 'Free Accessories Package']
  },
  {
    id: 3,
    name: 'Mahindra XUV700 AX7 Diesel AT (7-Str)',
    brand: 'Mahindra',
    originalPrice: 22.80,
    dealPrice: 21.10,
    discount: '₹1.70 Lakh OFF',
    discountPct: '7.5%',
    tag: 'Year-End Stock Clearance',
    expiry: 'Ends in 1 day',
    fuel: 'Diesel',
    city: 'Bengaluru / Hyderabad',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJf515PddNnEAY5MrtqKHlREy7yRKHCt_Zfw&s',
    perks: ['Free ADAS Feature Calibration', 'Low Interest EMI @ 7.99%', 'Free Doorstep Delivery']
  },
  {
    id: 4,
    name: 'Maruti Suzuki Brezza ZXI+ Dual Tone',
    brand: 'Maruti',
    originalPrice: 12.50,
    dealPrice: 11.45,
    discount: '₹1.05 Lakh OFF',
    discountPct: '8.4%',
    tag: 'Hot Seller Deal',
    expiry: 'Ends in 18h 10m',
    fuel: 'Petrol',
    city: 'Delhi NCR',
    img: 'https://stimg.cardekho.com/images/car-images/630x420/Maruti/Brezza/10387/1755776291575/front-left-side-47.jpg',
    perks: ['Corporate Bonus Included', 'Free Maintenance Service for 2 Years', 'Instant Loan Approval']
  },
  {
    id: 5,
    name: 'BMW 3 Series Gran Limousine M Sport',
    brand: 'BMW',
    originalPrice: 62.00,
    dealPrice: 56.50,
    discount: '₹5.50 Lakh OFF',
    discountPct: '8.9%',
    tag: 'Luxury Privilege Offer',
    expiry: 'Ends in 2 days',
    fuel: 'Petrol',
    city: 'Pan India',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    perks: ['3-Year Service Inclusive Package', '0% Processing Fee', 'Guaranteed Buyback']
  },
  {
    id: 6,
    name: 'Kia Seltos GTX+ 1.5 Turbo DCT',
    brand: 'Kia',
    originalPrice: 19.50,
    dealPrice: 18.20,
    discount: '₹1.30 Lakh OFF',
    discountPct: '6.7%',
    tag: 'Limited Festive Allocation',
    expiry: 'Ends in 05h 30m',
    fuel: 'Petrol',
    city: 'Chandigarh / Jaipur',
    img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80',
    perks: ['Dual Dashcam Fitted Free', '3-Year Roadside Assistance', 'Scrappage Incentive']
  }
];

export default function Hotdeals() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showEmiCalc, setShowEmiCalc] = useState(false);

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(10); // In Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // %
  const [tenureYears, setTenureYears] = useState(5); // Years

  // EMI calculation formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculatedEmi = useMemo(() => {
    const p = loanAmount * 100000;
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;
    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanAmount, interestRate, tenureYears]);

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

  const handleClaimDeal = (e) => {
    e.preventDefault();
    showSuccessToast('Deal claimed! Our dealership representative will contact you shortly.');
    setSelectedDeal(null);
  };

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              <RiFireLine size={16} /> Exclusive Flash Discounts
            </div>
            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 ${textHi}`}>
              Hot Car Deals & <span className={gradText}>Special Offers</span>
            </h1>
            <p className={`text-sm mt-1 ${textSb}`}>
              Save up to ₹5.5 Lakh on new cars with verified dealer discounts, cash bonuses, and low-rate financing.
            </p>
          </div>

          <button
            onClick={() => setShowEmiCalc(!showEmiCalc)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider cursor-pointer border ${dark ? 'border-red-900/30 text-red-400 hover:bg-red-900/20' : 'border-amber-500/30 text-amber-700 hover:bg-amber-50'}`}
          >
            <RiCalculatorLine size={18} /> {showEmiCalc ? 'Close EMI Calculator' : 'Open EMI Calculator'}
          </button>
        </div>

        {/* EMI CALCULATOR SECTION */}
        {showEmiCalc && (
          <div className={`p-6 sm:p-8 rounded-3xl border ${border} ${cardBg} shadow-2xl space-y-6 animate-fadeIn`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold ${textHi}`}>🧮 Interactive Auto Loan EMI Calculator</h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-700'}`}>
                Instant Calculation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-4 md:col-span-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className={textSb}>Loan Amount:</span>
                    <span className={gradText}>₹{loanAmount} Lakh</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className={textSb}>Interest Rate:</span>
                    <span className={gradText}>{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className={textSb}>Loan Tenure:</span>
                    <span className={gradText}>{tenureYears} Years ({tenureYears * 12} Months)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(parseInt(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* OUTPUT DISPLAY */}
              <div className={`p-6 rounded-2xl border ${dark ? 'bg-gradient-to-br from-red-950/40 to-[#0D0F16] border-red-900/30' : 'bg-gradient-to-br from-amber-50 to-white border-amber-200'} text-center space-y-2`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${textSb}`}>Estimated Monthly EMI</p>
                <p className={`text-3xl font-extrabold ${gradText}`}>
                  ₹{calculatedEmi.toLocaleString('en-IN')}<span className="text-xs font-normal"> / mo</span>
                </p>
                <p className={`text-[11px] ${textSb}`}>Total Principal: ₹{loanAmount} Lakh</p>
              </div>
            </div>
          </div>
        )}

        {/* DEALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOT_DEALS_DATA.map((deal) => (
            <div
              key={deal.id}
              className={`group rounded-3xl border ${border} ${cardBg} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
            >
              {/* IMAGE HEADER */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={deal.img}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Savings Badge */}
                <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                  🔥 {deal.discount} ({deal.discountPct})
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist({ ...deal, price: `₹${deal.dealPrice.toFixed(2)} Lakh` })}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center cursor-pointer border-none hover:scale-110 transition-transform"
                  title="Toggle Wishlist"
                >
                  {isInWishlist(deal) ? (
                    <RiHeartFill size={16} className="text-red-500" />
                  ) : (
                    <RiHeartLine size={16} className="text-white/80" />
                  )}
                </button>

                {/* Timer Badge */}
                <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <RiTimeLine size={13} className="text-red-400" /> {deal.expiry}
                </span>
              </div>

              {/* BODY DETAILS */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${dark ? 'bg-white/10 text-white/70' : 'bg-slate-100 text-slate-700'}`}>
                    {deal.tag}
                  </span>
                  <h3 className={`font-extrabold text-base leading-snug ${textHi}`}>
                    {deal.name}
                  </h3>

                  {/* PRICE COMPARISON */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className={`text-2xl font-extrabold ${gradText}`}>
                      ₹{deal.dealPrice.toFixed(2)} L
                    </span>
                    <span className={`text-sm font-semibold line-through ${textSb}`}>
                      ₹{deal.originalPrice.toFixed(2)} L
                    </span>
                  </div>

                  {/* PERKS LIST */}
                  <div className="space-y-1 pt-2">
                    {deal.perks.map((perk, i) => (
                      <p key={i} className={`flex items-center gap-1.5 text-xs ${textSb}`}>
                        <RiCheckLine size={14} className="text-green-500 flex-shrink-0" /> {perk}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button
                  onClick={() => setSelectedDeal(deal)}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer flex items-center justify-center gap-2 ${gradBtn}`}
                >
                  Claim Hot Deal <RiArrowRightLine size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CLAIM DEAL MODAL */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-md rounded-3xl border ${border} ${cardBg} p-6 shadow-2xl space-y-5`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  Limited Time Deal
                </span>
                <h3 className={`font-bold text-base mt-1 ${textHi}`}>{selectedDeal.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDeal(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border-none cursor-pointer"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-1 text-xs`}>
              <div className="flex justify-between font-bold">
                <span className={textSb}>Special Offer Price:</span>
                <span className={gradText}>₹{selectedDeal.dealPrice} Lakh</span>
              </div>
              <div className="flex justify-between">
                <span className={textSb}>Your Total Savings:</span>
                <span className="text-green-500 font-bold">{selectedDeal.discount}</span>
              </div>
            </div>

            <form onSubmit={handleClaimDeal} className="space-y-4 text-xs">
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>Your Name</label>
                <input type="text" placeholder="Enter your full name" className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`} required />
              </div>
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>Mobile Number</label>
                <input type="tel" placeholder="e.g. 9876543210" className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`} required />
              </div>
              <button type="submit" className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}>
                Lock Deal & Book Test Drive
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

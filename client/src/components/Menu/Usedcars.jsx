import React, { useState, useMemo } from "react";
import { useTheme } from "../../Context/ThemeContext.jsx";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import {
  MapPin, Fuel, Gauge, Settings2, Calendar, Heart,
  SlidersHorizontal, X, ArrowUpDown, BadgeCheck, Calculator, Star
} from "lucide-react";
import { RiHeartLine, RiHeartFill, RiCalculatorLine, RiCloseLine } from "react-icons/ri";

const CARS = [
  { id: 101, title: "Maruti Suzuki Swift VXI", year: 2021, price: "₹6.12 Lakh", priceNum: 612000, emi: 11900, km: 24500, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Gurgaon", tag: "Certified", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" },
  { id: 102, title: "Hyundai Creta SX(O)", year: 2020, price: "₹13.45 Lakh", priceNum: 1345000, emi: 24800, km: 38200, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Pune", tag: "Low KM", img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg" },
  { id: 103, title: "Tata Nexon XZ+", year: 2022, price: "₹8.95 Lakh", priceNum: 895000, emi: 16700, km: 12800, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Bengaluru", tag: "5-Star Safety", img: "https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp" },
  { id: 104, title: "Honda City ZX CVT", year: 2019, price: "₹8.55 Lakh", priceNum: 855000, emi: 15900, km: 45600, fuel: "Petrol", trans: "CVT", owner: "2nd Owner", city: "Delhi", tag: "Sunroof", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop" },
  { id: 105, title: "Mahindra XUV700 AX7", year: 2023, price: "₹21.50 Lakh", priceNum: 2150000, emi: 39500, km: 8100, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Mumbai", tag: "Almost New", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJf515PddNnEAY5MrtqKHlREy7yRKHCt_Zfw&s" },
  { id: 106, title: "Kia Seltos HTX", year: 2021, price: "₹11.89 Lakh", priceNum: 1189000, emi: 21900, km: 29900, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Chandigarh", tag: "Certified", img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80" },
  { id: 107, title: "Toyota Innova Crysta GX", year: 2018, price: "₹14.50 Lakh", priceNum: 1450000, emi: 26700, km: 61200, fuel: "Diesel", trans: "Manual", owner: "2nd Owner", city: "Gurgaon", tag: "Verified", img: "https://images.unsplash.com/photo-1622551842564-2ad0c2d2c7e5?q=80&w=800&auto=format&fit=crop" },
  { id: 108, title: "Volkswagen Virtus GT DSG", year: 2022, price: "₹13.25 Lakh", priceNum: 1325000, emi: 24300, km: 15300, fuel: "Petrol", trans: "Automatic", owner: "1st Owner", city: "Jaipur", tag: "Great Deal", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop" },
  { id: 109, title: "BMW 3 Series 320d Luxury", year: 2019, price: "₹28.90 Lakh", priceNum: 2890000, emi: 52000, km: 31000, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Delhi", tag: "Luxury Certified", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop" }
];

const FUELS = ["Petrol", "Diesel", "CNG", "Electric"];
const TRANS = ["Manual", "Automatic", "CVT"];
const BUDGETS = [
  { label: "Under ₹7 Lakh", max: 700000 },
  { label: "₹7 – 12 Lakh", max: 1200000 },
  { label: "₹12 – 20 Lakh", max: 2000000 },
  { label: "₹20 Lakh+", max: Infinity },
];

export default function Usedcars() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [fuelFilter, setFuelFilter] = useState([]);
  const [transFilter, setTransFilter] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState(null);
  const [selectedCity, setSelectedCity] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // EMI Calculator State
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [carPriceInput, setCarPriceInput] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [loanTenure, setLoanTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(9.5);

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const results = useMemo(() => {
    let list = CARS.filter((c) => {
      if (fuelFilter.length && !fuelFilter.includes(c.fuel)) return false;
      if (transFilter.length && !transFilter.includes(c.trans)) return false;
      if (budgetFilter !== null && c.priceNum > BUDGETS[budgetFilter].max) return false;
      if (selectedCity !== "All" && c.city !== selectedCity) return false;
      return true;
    });
    if (sortBy === "price_low") list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    if (sortBy === "price_high") list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    if (sortBy === "km_low") list = [...list].sort((a, b) => a.km - b.km);
    if (sortBy === "year_new") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [fuelFilter, transFilter, budgetFilter, selectedCity, sortBy]);

  const clearAll = () => {
    setFuelFilter([]);
    setTransFilter([]);
    setBudgetFilter(null);
    setSelectedCity("All");
  };

  const calculateEmi = () => {
    const principal = Math.max(0, carPriceInput - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    if (principal <= 0 || monthlyRate <= 0) return 0;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-slate-200';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  return (
    <div className={`min-h-screen ${bg} py-8 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              <BadgeCheck size={14} /> 200+ Point Quality Checked
            </div>
            <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 ${textHi}`}>
              Verified <span className={dark ? 'text-red-500' : 'text-amber-600'}>Used Cars</span>
            </h1>
            <p className={`text-sm mt-1 ${textSb}`}>
              Inspected, certified pre-owned cars with 1-Year Warranty &amp; instant financing.
            </p>
          </div>

          <button
            onClick={() => setShowEmiModal(true)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg border-none cursor-pointer ${gradBtn}`}
          >
            <RiCalculatorLine size={18} /> Calculate Auto Loan EMI
          </button>
        </div>

        {/* CITIES FILTER BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className={`text-xs font-bold uppercase ${textSb} mr-2`}>City:</span>
          {["All", "Gurgaon", "Delhi", "Mumbai", "Pune", "Bengaluru", "Jaipur"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer border-none ${
                selectedCity === c
                  ? gradBtn
                  : dark
                  ? 'bg-white/5 text-white/60 hover:text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Panel */}
          <aside className={`hidden lg:block w-64 p-5 rounded-2xl border ${border} ${cardBg} h-fit space-y-6`}>
            <FilterPanel
              fuelFilter={fuelFilter}
              transFilter={transFilter}
              budgetFilter={budgetFilter}
              toggle={toggle}
              setFuelFilter={setFuelFilter}
              setTransFilter={setTransFilter}
              setBudgetFilter={setBudgetFilter}
              clearAll={clearAll}
              dark={dark}
            />
          </aside>

          {/* Car Grid Container */}
          <main className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border ${border} ${cardBg} ${textHi}`}
              >
                <SlidersHorizontal size={14} /> Filters
              </button>

              <div className="ml-auto flex items-center gap-2 text-xs">
                <span className={textSb}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-1.5 rounded-xl border outline-none font-bold text-xs ${border} ${cardBg} ${textHi}`}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="km_low">KM: Low to High</option>
                  <option value="year_new">Year: Newest</option>
                </select>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((car) => {
                const saved = isWishlisted(car.id || car.title);
                return (
                  <div
                    key={car.id}
                    className={`group rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-800">
                      <img
                        src={car.img}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        {car.year}
                      </span>
                      {car.tag && (
                        <span className="absolute top-3 right-12 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                          {car.tag}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist({ ...car, name: car.title })}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors"
                      >
                        {saved ? <RiHeartFill size={16} className="text-red-500" /> : <RiHeartLine size={16} />}
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className={`font-bold text-base line-clamp-1 ${textHi}`}>{car.title}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`text-lg font-extrabold ${dark ? 'text-red-400' : 'text-amber-600'}`}>{car.price}</span>
                          <span className={`text-xs ${textSb}`}>EMI ₹{car.emi.toLocaleString()}/mo</span>
                        </div>

                        <div className={`grid grid-cols-2 gap-2 mt-3 text-xs ${textSb}`}>
                          <span className="flex items-center gap-1"><Gauge size={12} /> {car.km.toLocaleString()} km</span>
                          <span className="flex items-center gap-1"><Fuel size={12} /> {car.fuel}</span>
                          <span className="flex items-center gap-1"><Settings2 size={12} /> {car.trans}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {car.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <button
                          onClick={() => {
                            setCarPriceInput(car.priceNum);
                            setShowEmiModal(true);
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'} cursor-pointer`}
                        >
                          Calc EMI
                        </button>
                        <button className={`flex-1 py-2 rounded-xl text-xs font-bold border-none cursor-pointer ${gradBtn}`}>
                          Book Drive
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {results.length === 0 && (
              <div className={`p-12 text-center rounded-2xl border ${border} ${cardBg}`}>
                <p className={`text-base font-bold ${textHi}`}>No used cars found</p>
                <button onClick={clearAll} className="mt-2 text-xs font-bold text-red-500 underline cursor-pointer">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>

      </div>

      {/* EMI CALCULATOR MODAL */}
      {showEmiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-lg p-6 rounded-2xl border ${border} ${cardBg} space-y-5 shadow-2xl`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${textHi}`}>
                <RiCalculatorLine className="text-red-500" /> Auto Loan EMI Calculator
              </h3>
              <button onClick={() => setShowEmiModal(false)} className="bg-transparent border-none text-slate-400 hover:text-white cursor-pointer">
                <RiCloseLine size={24} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className={textSb}>Car Price</span>
                  <span className={textHi}>₹{carPriceInput.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="50000"
                  value={carPriceInput}
                  onChange={(e) => setCarPriceInput(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className={textSb}>Down Payment</span>
                  <span className={textHi}>₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max={carPriceInput * 0.8}
                  step="25000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block font-bold mb-1 ${textSb}`}>Tenure (Years)</label>
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${border} ${cardBg} ${textHi}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block font-bold mb-1 ${textSb}`}>Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${border} ${cardBg} ${textHi}`}
                  />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border ${dark ? 'bg-red-900/10 border-red-900/30' : 'bg-amber-50 border-amber-200'} text-center space-y-1`}>
                <p className={`text-xs font-bold uppercase ${textSb}`}>Estimated Monthly EMI</p>
                <p className={`text-3xl font-extrabold ${dark ? 'text-red-400' : 'text-amber-600'}`}>
                  ₹{calculateEmi().toLocaleString('en-IN')}<span className="text-xs font-normal">/month</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ fuelFilter, transFilter, budgetFilter, toggle, setFuelFilter, setTransFilter, setBudgetFilter, clearAll, dark }) {
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  return (
    <div className="space-y-5 text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className={`font-bold text-sm uppercase ${textHi}`}>Filters</h3>
        <button onClick={clearAll} className="text-red-500 font-bold hover:underline bg-transparent border-none cursor-pointer">
          Reset
        </button>
      </div>

      <div>
        <p className={`font-bold uppercase tracking-wider mb-2 ${textSb}`}>Budget</p>
        {BUDGETS.map((b, i) => (
          <label key={i} className={`flex items-center gap-2 py-1 cursor-pointer ${textHi}`}>
            <input
              type="radio"
              name="budget"
              checked={budgetFilter === i}
              onChange={() => setBudgetFilter(budgetFilter === i ? null : i)}
              className="accent-red-500"
            />
            {b.label}
          </label>
        ))}
      </div>

      <div>
        <p className={`font-bold uppercase tracking-wider mb-2 ${textSb}`}>Fuel Type</p>
        {FUELS.map((f) => (
          <label key={f} className={`flex items-center gap-2 py-1 cursor-pointer ${textHi}`}>
            <input
              type="checkbox"
              checked={fuelFilter.includes(f)}
              onChange={() => toggle(setFuelFilter, fuelFilter, f)}
              className="accent-red-500"
            />
            {f}
          </label>
        ))}
      </div>

      <div>
        <p className={`font-bold uppercase tracking-wider mb-2 ${textSb}`}>Transmission</p>
        {TRANS.map((t) => (
          <label key={t} className={`flex items-center gap-2 py-1 cursor-pointer ${textHi}`}>
            <input
              type="checkbox"
              checked={transFilter.includes(t)}
              onChange={() => toggle(setTransFilter, transFilter, t)}
              className="accent-red-500"
            />
            {t}
          </label>
        ))}
      </div>
    </div>
  );
}
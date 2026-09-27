import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext.jsx';
import CarCard from '../components/CarCard.jsx';
import FilterBar, { BUDGET_OPTIONS } from '../components/FilterBar.jsx';
import { BadgeCheck, SlidersHorizontal, Search } from 'lucide-react';
import { RiCalculatorLine, RiCloseLine } from 'react-icons/ri';
import axios from 'axios';
import { API_URL } from '../config/api.js';

const MOCK_USED_CARS = [
  { id: 101, title: 'Maruti Suzuki Swift VXI', brand: 'Maruti Suzuki', year: 2021, price: '₹6.12 Lakh', priceNum: 612000, emi: 11900, km: '24,500 km', fuel: 'Petrol', trans: 'Manual', owner: '1st Owner', city: 'Gurgaon', tag: 'Certified', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop' },
  { id: 102, title: 'Hyundai Creta SX(O)', brand: 'Hyundai', year: 2020, price: '₹13.45 Lakh', priceNum: 1345000, emi: 24800, km: '38,200 km', fuel: 'Diesel', trans: 'Automatic', owner: '1st Owner', city: 'Pune', tag: 'Low KM', img: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg' },
  { id: 103, title: 'Tata Nexon XZ+', brand: 'Tata Motors', year: 2022, price: '₹8.95 Lakh', priceNum: 895000, emi: 16700, km: '12,800 km', fuel: 'Petrol', trans: 'Manual', owner: '1st Owner', city: 'Bengaluru', tag: '5-Star Safety', img: 'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp' },
  { id: 104, title: 'Honda City ZX CVT', brand: 'Honda', year: 2019, price: '₹8.55 Lakh', priceNum: 855000, emi: 15900, km: '45,600 km', fuel: 'Petrol', trans: 'CVT', owner: '2nd Owner', city: 'Delhi', tag: 'Sunroof', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop' },
  { id: 105, title: 'Mahindra XUV700 AX7', brand: 'Mahindra', year: 2023, price: '₹21.50 Lakh', priceNum: 2150000, emi: 39500, km: '8,100 km', fuel: 'Diesel', trans: 'Automatic', owner: '1st Owner', city: 'Mumbai', tag: 'Almost New', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJf515PddNnEAY5MrtqKHlREy7yRKHCt_Zfw&s' },
  { id: 106, title: 'Kia Seltos HTX', brand: 'Kia', year: 2021, price: '₹11.89 Lakh', priceNum: 1189000, emi: 21900, km: '29,900 km', fuel: 'Petrol', trans: 'Manual', owner: '1st Owner', city: 'Chandigarh', tag: 'Certified', img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80' },
  { id: 107, title: 'Toyota Innova Crysta GX', brand: 'Toyota', year: 2018, price: '₹14.50 Lakh', priceNum: 1450000, emi: 26700, km: '61,200 km', fuel: 'Diesel', trans: 'Manual', owner: '2nd Owner', city: 'Gurgaon', tag: 'Verified', img: 'https://images.unsplash.com/photo-1622551842564-2ad0c2d2c7e5?q=80&w=800&auto=format&fit=crop' },
  { id: 108, title: 'Volkswagen Virtus GT DSG', brand: 'Volkswagen', year: 2022, price: '₹13.25 Lakh', priceNum: 1325000, emi: 24300, km: '15,300 km', fuel: 'Petrol', trans: 'Automatic', owner: '1st Owner', city: 'Jaipur', tag: 'Great Deal', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop' },
  { id: 109, title: 'BMW 3 Series 320d Luxury', brand: 'BMW', year: 2019, price: '₹28.90 Lakh', priceNum: 2890000, emi: 52000, km: '31,000 km', fuel: 'Diesel', trans: 'Automatic', owner: '1st Owner', city: 'Delhi', tag: 'Luxury Certified', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop' }
];

export default function UsedCars() {
  const { dark } = useTheme();
  const location = useLocation();

  const [usedCars, setUsedCars] = useState(MOCK_USED_CARS);
  const [loading, setLoading] = useState(false);
  const [fuelFilter, setFuelFilter] = useState([]);
  const [transFilter, setTransFilter] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Search filter from query string or local input
  const searchParams = new URLSearchParams(location.search);
  const querySearch = searchParams.get('search') || '';
  const [searchVal, setSearchVal] = useState(querySearch);

  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
  }, [location.search]);

  useEffect(() => {
    const fetchPublicUsedCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/used-cars`);
        if (res.data?.status && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          const apiCars = res.data.data.map((c, i) => ({
            id: c._id || c.id || i + 101,
            title: c.title || `${c.brand} ${c.model}`,
            brand: c.brand || 'Other',
            model: c.model || '',
            year: Number(c.year) || 2022,
            price: c.price || `₹${((c.priceNum || 500000) / 100000).toFixed(2)} Lakh`,
            priceNum: c.priceNum || 500000,
            emi: Math.round(((c.priceNum || 500000) * 0.8 * 0.085 / 12) * 1.2),
            km: c.km || '20,000 km',
            fuel: c.fuel || 'Petrol',
            trans: c.trans || 'Manual',
            owner: c.owner || '1st Owner',
            city: c.city || 'Gurgaon',
            tag: c.tag || 'Approved',
            img: c.img || c.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
            images: c.images || [c.img],
            status: c.status
          }));

          const merged = [...apiCars];
          MOCK_USED_CARS.forEach((mock) => {
            if (!merged.some(m => m.title.toLowerCase() === mock.title.toLowerCase())) {
              merged.push(mock);
            }
          });
          setUsedCars(merged);
        }
      } catch (err) {
        console.error('Failed to load used cars from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicUsedCars();
  }, []);

  // EMI Calculator Modal State
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [carPriceInput, setCarPriceInput] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [loanTenure, setLoanTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(8.5);

  const results = useMemo(() => {
    let list = usedCars.filter((c) => {
      if (fuelFilter.length && !fuelFilter.includes(c.fuel)) return false;
      if (transFilter.length && !transFilter.includes(c.trans)) return false;
      if (budgetFilter !== null && c.priceNum > BUDGET_OPTIONS[budgetFilter].max) return false;
      if (selectedCity !== 'All' && c.city !== selectedCity) return false;
      if (searchVal.trim()) {
        const q = searchVal.toLowerCase().trim();
        const matchTitle = (c.title || '').toLowerCase().includes(q);
        const matchBrand = (c.brand || '').toLowerCase().includes(q);
        const matchModel = (c.model || '').toLowerCase().includes(q);
        const matchCity = (c.city || '').toLowerCase().includes(q);
        const matchFuel = (c.fuel || '').toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchModel && !matchCity && !matchFuel) return false;
      }
      return true;
    });

    if (sortBy === 'price_low') list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    if (sortBy === 'price_high') list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    if (sortBy === 'km_low') list = [...list].sort((a, b) => (parseInt(a.km) || 0) - (parseInt(b.km) || 0));
    if (sortBy === 'year_new') list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [usedCars, fuelFilter, transFilter, budgetFilter, selectedCity, sortBy, searchVal]);

  const clearAll = () => {
    setFuelFilter([]);
    setTransFilter([]);
    setBudgetFilter(null);
    setSelectedCity('All');
    setSearchVal('');
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

        {/* SEARCH BAR & CITIES FILTER */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${border} ${cardBg} w-full sm:w-80 shadow-sm`}>
            <Search size={16} className={textSb} />
            <input
              type="text"
              placeholder="Search used cars, brands, cities..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className={`w-full bg-transparent border-none outline-none text-xs font-semibold ${textHi}`}
            />
            {searchVal && (
              <button onClick={() => setSearchVal('')} className="text-xs text-slate-400 border-none bg-transparent cursor-pointer">
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full">
            <span className={`text-xs font-bold uppercase ${textSb} mr-1 shrink-0`}>City:</span>
            {['All', 'Gurgaon', 'Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Jaipur', 'Chandigarh'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer border-none ${
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
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filter Panel */}
          <aside className={`hidden lg:block w-64 p-5 rounded-2xl border ${border} ${cardBg} h-fit space-y-6 shrink-0`}>
            <FilterBar
              fuelFilter={fuelFilter}
              transFilter={transFilter}
              budgetFilter={budgetFilter}
              selectedCity={selectedCity}
              onFuelChange={setFuelFilter}
              onTransChange={setTransFilter}
              onBudgetChange={setBudgetFilter}
              onCityChange={setSelectedCity}
              onReset={clearAll}
            />
          </aside>

          {/* Cars Grid Container */}
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
              {results.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onCalcEmi={(c) => {
                    setCarPriceInput(c.priceNum || 1000000);
                    setShowEmiModal(true);
                  }}
                />
              ))}
            </div>

            {results.length === 0 && (
              <div className={`p-12 text-center rounded-2xl border ${border} ${cardBg}`}>
                <p className={`text-base font-bold ${textHi}`}>No used cars found matching your filter criteria</p>
                <button onClick={clearAll} className="mt-2 text-xs font-bold text-red-500 underline cursor-pointer border-none bg-transparent">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>

      </div>

      {/* MOBILE FILTERS MODAL */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden">
          <div className={`w-full max-w-xs h-full p-5 overflow-y-auto ${cardBg} ${textHi} border-l ${border}`}>
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
              <h3 className="font-bold text-sm uppercase">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded bg-white/10 text-white border-none cursor-pointer">
                <RiCloseLine size={20} />
              </button>
            </div>
            <FilterBar
              fuelFilter={fuelFilter}
              transFilter={transFilter}
              budgetFilter={budgetFilter}
              selectedCity={selectedCity}
              onFuelChange={setFuelFilter}
              onTransChange={setTransFilter}
              onBudgetChange={setBudgetFilter}
              onCityChange={setSelectedCity}
              onReset={clearAll}
            />
          </div>
        </div>
      )}

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

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className={textSb}>Car Price</span>
                  <span className={textHi}>₹{carPriceInput.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="10000000"
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
                    {[1, 2, 3, 4, 5, 6, 7].map((y) => (
                      <option key={y} value={y}>
                        {y} Years
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block font-bold mb-1 ${textSb}`}>Interest Rate (% p.a.)</label>
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

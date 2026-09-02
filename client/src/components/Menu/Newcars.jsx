import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Fuel, Cog, Users, Gauge, Heart, Calculator } from "lucide-react";
import { useWishlist } from "../../Context/WishlistContext.jsx";
import { useTheme } from "../../Context/ThemeContext.jsx";
import { CARS_DATA } from "../../data/carsData.js";
import { RiCalculatorLine, RiCloseLine, RiHeartFill, RiHeartLine, RiGasStationLine } from "react-icons/ri";

const BRANDS = ["Maruti Suzuki", "Tata", "Mahindra", "Hyundai", "Kia", "Toyota", "Honda"];
const BODY_TYPES = [...new Set(CARS_DATA.map((c) => c.bodyType))];
const FUEL_TYPES = [...new Set(CARS_DATA.map((c) => c.fuel))];

function formatPrice(lakh) {
  if (lakh >= 100) {
    return `₹${(lakh / 100).toFixed(2)} Cr`;
  }
  return `₹${lakh.toFixed(2)} Lakh`;
}

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="border-b border-slate-200 dark:border-white/10 py-4">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="h-4 w-4 rounded border-slate-300 dark:border-white/20 accent-red-600 dark:accent-red-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function CarCard({ car, onOpenEmi }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const saved = isWishlisted(car);

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-red-900/20 bg-white dark:bg-[#0D0F16] overflow-hidden hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Car Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {car.tag && (
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-red-600 text-white shadow">
              {car.tag}
            </span>
          )}
          <button
            onClick={() => toggleWishlist(car)}
            aria-label="Save to wishlist"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-none shadow"
          >
            {saved ? <RiHeartFill size={18} className="text-red-600" /> : <RiHeartLine size={18} className="text-slate-600 dark:text-slate-300" />}
          </button>
        </div>

        {/* Details Section */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-red-500 dark:text-red-400 uppercase tracking-widest">
              {car.brand}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              {car.bodyType}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
            {car.brand} {car.name}
          </h3>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              {formatPrice(car.price)}
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">ex-showroom</span>
          </div>

          {/* FUEL AVERAGE HIGHLIGHT BADGE */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 dark:bg-red-900/20 border border-amber-500/20 dark:border-red-900/30 text-amber-900 dark:text-red-300 text-xs font-bold mt-2">
            <RiGasStationLine size={18} className="text-amber-600 dark:text-red-400 shrink-0" />
            <span>Fuel Average: <strong className="text-slate-900 dark:text-white font-extrabold">{car.fuelAverage}</strong></span>
          </div>

          {/* Specs Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Fuel size={13} /> {car.fuel}
            </span>
            <span className="flex items-center gap-1">
              <Cog size={13} /> {car.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} /> {car.seats} Seats
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 flex gap-2">
        <button
          onClick={() => onOpenEmi(car.price * 100000)}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/20 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
        >
          EMI Calculator
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-800 hover:to-red-600 text-white text-xs font-bold cursor-pointer transition-colors border-none shadow">
          Get Best Offer
        </button>
      </div>
    </div>
  );
}

export default function NewCars() {
  const { dark } = useTheme();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popularity");
  const [brands, setBrands] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // EMI Calculator Modal State
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [carPriceInput, setCarPriceInput] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [loanTenure, setLoanTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(9.5);

  const toggle = (setFn) => (value) =>
    setFn((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const filtered = useMemo(() => {
    let result = CARS_DATA.filter((c) => {
      const matchesQuery =
        query.trim() === "" ||
        `${c.brand} ${c.name}`.toLowerCase().includes(query.toLowerCase());
      const matchesBrand = brands.length === 0 || brands.includes(c.brand);
      const matchesBody = bodyTypes.length === 0 || bodyTypes.includes(c.bodyType);
      const matchesFuel = fuels.length === 0 || fuels.includes(c.fuel);
      return matchesQuery && matchesBrand && matchesBody && matchesFuel;
    });

    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [query, sort, brands, bodyTypes, fuels]);

  const clearAll = () => {
    setBrands([]);
    setBodyTypes([]);
    setFuels([]);
    setQuery("");
  };

  const calculateEmi = () => {
    const principal = Math.max(0, carPriceInput - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    if (principal <= 0 || monthlyRate <= 0) return 0;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const activeFilterCount = brands.length + bodyTypes.length + fuels.length;

  const FiltersPanel = (
    <div className="rounded-2xl border border-slate-200 dark:border-red-900/20 bg-white dark:bg-[#0D0F16] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline border-none bg-transparent cursor-pointer"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>
      <FilterGroup title="Brand" options={BRANDS} selected={brands} onToggle={toggle(setBrands)} />
      <FilterGroup title="Body Type" options={BODY_TYPES} selected={bodyTypes} onToggle={toggle(setBodyTypes)} />
      <FilterGroup title="Fuel Type" options={FUEL_TYPES} selected={fuels} onToggle={toggle(setFuels)} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080A0D] transition-colors duration-300 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-900/20 text-red-400 border border-red-900/30">
              New Cars Catalog · Maruti, Tata, Mahindra, Kia, Hyundai, Toyota, Honda
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              New Cars in India (2026)
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore {filtered.length} latest cars with ex-showroom prices, specs, <strong className="text-red-500">fuel averages</strong>, &amp; loan EMIs.
            </p>
          </div>

          <button
            onClick={() => setShowEmiModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-xs font-bold uppercase tracking-wider border-none cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
          >
            <RiCalculatorLine size={18} /> Auto Loan EMI Calculator
          </button>
        </div>

        {/* Brand quick filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">Brands:</span>
          {BRANDS.map((b) => {
            const isSelected = brands.includes(b);
            return (
              <button
                key={b}
                onClick={() => toggle(setBrands)(b)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-red-600 border-red-600 text-white shadow'
                    : dark
                    ? 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-red-500'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search Maruti, Tata, Thar, Creta..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D0F16] text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500/40"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-transparent border-none cursor-pointer">✕</button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D0F16] text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <SlidersHorizontal size={16} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D0F16] text-xs font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden mb-6">{FiltersPanel}</div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6">{FiltersPanel}</div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                <p className="text-slate-500 dark:text-slate-400 font-bold text-base">
                  No cars match your selected filters.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-3 text-xs font-extrabold uppercase text-red-600 dark:text-red-400 hover:underline bg-transparent border-none cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onOpenEmi={(p) => {
                      setCarPriceInput(p);
                      setShowEmiModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EMI CALCULATOR MODAL */}
      {showEmiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-2xl border border-slate-200 dark:border-red-900/30 bg-white dark:bg-[#0D0F16] text-slate-900 dark:text-white space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <RiCalculatorLine className="text-red-500" /> New Car Loan EMI Calculator
              </h3>
              <button onClick={() => setShowEmiModal(false)} className="bg-transparent border-none text-slate-400 hover:text-white cursor-pointer">
                <RiCloseLine size={24} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Ex-Showroom Car Price</span>
                  <span className="font-extrabold text-red-500">₹{carPriceInput.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="400000"
                  max="10000000"
                  step="50000"
                  value={carPriceInput}
                  onChange={(e) => setCarPriceInput(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Down Payment</span>
                  <span>₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max={carPriceInput * 0.8}
                  step="25000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-500 dark:text-slate-400">Tenure (Years)</label>
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none font-bold text-slate-900 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(y => <option key={y} value={y}>{y} Years</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-500 dark:text-slate-400">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-red-900/30 bg-red-900/10 text-center space-y-1">
                <p className="text-xs font-bold uppercase text-slate-400">Estimated Monthly EMI</p>
                <p className="text-3xl font-extrabold text-red-500">
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
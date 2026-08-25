import React, { useState, useMemo } from "react";
import {

  MapPin,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  Heart,
  ChevronDown,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  BadgeCheck,
} from "lucide-react";

/* ---------------------------------------------------------
   Mock inventory — swap with your API data later.
--------------------------------------------------------- */
const CARS = [
  { id: 1, title: "Maruti Suzuki Swift VXI", year: 2021, price: 612000, emi: 11900, km: 24500, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Gurgaon", tag: "Great Price", color: "from-amber-400 to-orange-500" },
  { id: 2, title: "Hyundai Creta SX(O)", year: 2020, price: 1345000, emi: 24800, km: 38200, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Pune", tag: "Low KM", color: "from-slate-500 to-slate-700" },
  { id: 3, title: "Tata Nexon XZ+", year: 2022, price: 895000, emi: 16700, km: 12800, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Bengaluru", tag: null, color: "from-sky-500 to-blue-700" },
  { id: 4, title: "Honda City ZX", year: 2019, price: 855000, emi: 15900, km: 45600, fuel: "Petrol", trans: "CVT", owner: "2nd Owner", city: "Delhi", tag: null, color: "from-rose-500 to-red-700" },
  { id: 5, title: "Mahindra XUV700 AX7", year: 2023, price: 2150000, emi: 39500, km: 8100, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Mumbai", tag: "Almost New", color: "from-neutral-700 to-neutral-900" },
  { id: 6, title: "Kia Seltos HTX", year: 2021, price: 1189000, emi: 21900, km: 29900, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Chandigarh", tag: null, color: "from-emerald-500 to-teal-700" },
  { id: 7, title: "Toyota Innova Crysta GX", year: 2018, price: 1450000, emi: 26700, km: 61200, fuel: "Diesel", trans: "Manual", owner: "2nd Owner", city: "Lucknow", tag: null, color: "from-indigo-500 to-violet-700" },
  { id: 8, title: "Volkswagen Virtus GT", year: 2022, price: 1325000, emi: 24300, km: 15300, fuel: "Petrol", trans: "Automatic", owner: "1st Owner", city: "Jaipur", tag: "Great Price", color: "from-amber-400 to-orange-500" },
  { id: 9, title: "Maruti Suzuki Baleno Zeta", year: 2020, price: 585000, emi: 10800, km: 33400, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Ahmedabad", tag: null, color: "from-cyan-500 to-sky-700" },
  { id: 10, title: "Hyundai Venue SX", year: 2021, price: 795000, emi: 14700, km: 27600, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Noida", tag: null, color: "from-fuchsia-500 to-pink-700" },
  { id: 11, title: "Renault Kwid RXT", year: 2019, price: 325000, emi: 6100, km: 41200, fuel: "Petrol", trans: "Manual", owner: "2nd Owner", city: "Indore", tag: "Great Price", color: "from-amber-400 to-orange-500" },
  { id: 12, title: "Skoda Octavia Style", year: 2018, price: 1095000, emi: 20200, km: 58900, fuel: "Petrol", trans: "Automatic", owner: "2nd Owner", city: "Chennai", tag: null, color: "from-lime-600 to-green-800" },
  { id: 13, title: "Ford EcoSport Titanium", year: 2019, price: 675000, emi: 12500, km: 39800, fuel: "Diesel", trans: "Manual", owner: "1st Owner", city: "Kolkata", tag: null, color: "from-blue-600 to-indigo-800" },
  { id: 14, title: "Tata Punch Adventure", year: 2023, price: 745000, emi: 13800, km: 6200, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Hyderabad", tag: "Almost New", color: "from-neutral-700 to-neutral-900" },
  { id: 15, title: "MG Hector Sharp", year: 2021, price: 1595000, emi: 29400, km: 22100, fuel: "Diesel", trans: "Manual", owner: "1st Owner", city: "Pune", tag: null, color: "from-red-600 to-rose-800" },
  { id: 16, title: "Maruti Suzuki Ertiga ZXI", year: 2020, price: 895000, emi: 16500, km: 31700, fuel: "CNG", trans: "Manual", owner: "1st Owner", city: "Surat", tag: null, color: "from-teal-500 to-emerald-700" },
  { id: 17, title: "Jeep Compass Longitude", year: 2020, price: 1685000, emi: 31000, km: 26400, fuel: "Diesel", trans: "Automatic", owner: "1st Owner", city: "Bengaluru", tag: null, color: "from-stone-600 to-stone-800" },
  { id: 18, title: "Hyundai i20 Sportz", year: 2022, price: 725000, emi: 13400, km: 14900, fuel: "Petrol", trans: "Manual", owner: "1st Owner", city: "Lucknow", tag: "Low KM", color: "from-slate-500 to-slate-700" },
  { id: 19, title: "Tata Tiago XZ", year: 2021, price: 495000, emi: 9200, km: 28300, fuel: "CNG", trans: "Manual", owner: "1st Owner", city: "Bhopal", tag: null, color: "from-orange-500 to-amber-700" },
  { id: 20, title: "Kia Sonet GTX+", year: 2022, price: 985000, emi: 18200, km: 17600, fuel: "Petrol", trans: "Automatic", owner: "1st Owner", city: "Mumbai", tag: null, color: "from-purple-600 to-violet-800" },
  { id: 21, title: "Tata Nexon EV Max", year: 2022, price: 1425000, emi: 26300, km: 19800, fuel: "Electric", trans: "Automatic", owner: "1st Owner", city: "Delhi", tag: "Low KM", color: "from-emerald-400 to-green-600" },
];

const FUELS = ["Petrol", "Diesel", "CNG", "Electric"];
const TRANS = ["Manual", "Automatic", "CVT"];
const BUDGETS = [
  { label: "Under ₹5 Lakh", max: 500000 },
  { label: "₹5 – 10 Lakh", max: 1000000 },
  { label: "₹10 – 15 Lakh", max: 1500000 },
  { label: "₹15 Lakh+", max: Infinity },
];

function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function Usedcars() {
  const [fuelFilter, setFuelFilter] = useState([]);
  const [transFilter, setTransFilter] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [saved, setSaved] = useState(new Set());

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const toggleSaved = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const results = useMemo(() => {
    let list = CARS.filter((c) => {
      if (fuelFilter.length && !fuelFilter.includes(c.fuel)) return false;
      if (transFilter.length && !transFilter.includes(c.trans)) return false;
      if (budgetFilter !== null && c.price > BUDGETS[budgetFilter].max) return false;
      return true;
    });
    if (sortBy === "price_low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "km_low") list = [...list].sort((a, b) => a.km - b.km);
    if (sortBy === "year_new") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [fuelFilter, transFilter, budgetFilter, sortBy]);

  const clearAll = () => {
    setFuelFilter([]);
    setTransFilter([]);
    setBudgetFilter(null);
  };

  const activeCount = fuelFilter.length + transFilter.length + (budgetFilter !== null ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#151515]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Rajdhani', sans-serif; }
      `}</style>

 

      {/* Page heading */}
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
            Used Cars <span className="text-[#F2994A]">in Gurgaon</span>
          </h1>
          <p className="mt-1 text-sm text-black/50">
            {results.length} certified used cars found · inspected &amp; verified
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar filters — desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterPanel
            fuelFilter={fuelFilter}
            transFilter={transFilter}
            budgetFilter={budgetFilter}
            toggle={toggle}
            setFuelFilter={setFuelFilter}
            setTransFilter={setTransFilter}
            setBudgetFilter={setBudgetFilter}
            clearAll={clearAll}
            activeCount={activeCount}
          />
        </aside>

        {/* Results */}
        <main className="flex-1">
          {/* Sort / mobile filter bar */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>

            <div className="ml-auto flex items-center gap-2 text-sm">
              <ArrowUpDown size={14} className="text-black/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm font-medium focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="km_low">KM Driven: Low to High</option>
                <option value="year_new">Year: Newest First</option>
              </select>
            </div>
          </div>

          {/* Car grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((car) => (
              <CarCard key={car.id} car={car} isSaved={saved.has(car.id)} onSave={() => toggleSaved(car.id)} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="mt-16 text-center text-black/50">
              <p className="font-display text-lg font-semibold">No cars match these filters</p>
              <button onClick={clearAll} className="mt-2 text-sm font-medium text-[#F2994A] underline">
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterPanel
              fuelFilter={fuelFilter}
              transFilter={transFilter}
              budgetFilter={budgetFilter}
              toggle={toggle}
              setFuelFilter={setFuelFilter}
              setTransFilter={setTransFilter}
              setBudgetFilter={setBudgetFilter}
              clearAll={clearAll}
              activeCount={activeCount}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-md bg-[#12172B] py-2.5 text-sm font-semibold text-white"
            >
              Show {results.length} cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Filter panel (shared between desktop sidebar + mobile drawer)
--------------------------------------------------------- */
function FilterPanel({
  fuelFilter,
  transFilter,
  budgetFilter,
  toggle,
  setFuelFilter,
  setTransFilter,
  setBudgetFilter,
  clearAll,
  activeCount,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-medium text-[#F2994A]">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Budget">
        {BUDGETS.map((b, i) => (
          <label key={b.label} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input
              type="radio"
              name="budget"
              checked={budgetFilter === i}
              onChange={() => setBudgetFilter(budgetFilter === i ? null : i)}
              className="h-3.5 w-3.5 accent-[#F2994A]"
            />
            {b.label}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Fuel Type">
        {FUELS.map((f) => (
          <label key={f} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input
              type="checkbox"
              checked={fuelFilter.includes(f)}
              onChange={() => toggle(setFuelFilter, fuelFilter, f)}
              className="h-3.5 w-3.5 accent-[#F2994A]"
            />
            {f}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Transmission">
        {TRANS.map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input
              type="checkbox"
              checked={transFilter.includes(t)}
              onChange={() => toggle(setTransFilter, transFilter, t)}
              className="h-3.5 w-3.5 accent-[#F2994A]"
            />
            {t}
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">{title}</p>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   Car card
--------------------------------------------------------- */
function CarCard({ car, isSaved, onSave }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-black/10 bg-white transition hover:shadow-lg">
      {/* Image placeholder */}
      <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${car.color}`}>
        <span className="font-display text-5xl font-bold text-white/25">{car.year}</span>

        {car.tag && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#12172B]">
            <BadgeCheck size={12} className="text-[#F2994A]" />
            {car.tag}
          </span>
        )}

        <button
          onClick={onSave}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
        >
          <Heart size={14} className={isSaved ? "fill-[#F2994A] text-[#F2994A]" : "text-black/50"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        <h3 className="truncate font-display text-[15px] font-bold leading-tight">
          {car.year} {car.title}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-[#12172B]">{formatINR(car.price)}</span>
          <span className="text-xs text-black/40">EMI {formatINR(car.emi)}/mo</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-black/60">
          <span className="flex items-center gap-1.5">
            <Gauge size={13} /> {car.km.toLocaleString("en-IN")} km
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={13} /> {car.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 size={13} /> {car.trans}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} /> {car.owner}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
          <span className="flex items-center gap-1 text-xs text-black/50">
            <MapPin size={12} /> {car.city}
          </span>
          <button className="rounded-md bg-[#12172B] px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-[#F2994A]">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
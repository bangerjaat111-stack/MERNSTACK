import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Fuel, Cog, Users, X, Heart } from "lucide-react";

// ---- Car data — swap for your real API response ----
// Prices are approximate ex-showroom starting price in ₹ Lakh (India, Aug 2026).
// Each brand is a compact tuple list: [name, price, fuel, transmission, seats, bodyType, tag?]
// mapped into full car objects below, so the list is easy to scan and extend.

const STOCK_IMAGES = {
  Hatchback: [
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
  ],
  Sedan: [
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop",
  ],
  SUV: [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop",
  ],
  MPV: [
    "https://images.unsplash.com/photo-1622551842564-2ad0c2d2c7e5?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609520505218-7421df709cdc?q=80&w=800&auto=format&fit=crop",
  ],
  Pickup: [
    "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=800&auto=format&fit=crop",
  ],
  Van: [
    "https://images.unsplash.com/photo-1609520505218-7421df709cdc?q=80&w=800&auto=format&fit=crop",
  ],
};

let imgCounters = {};
function nextImage(bodyType) {
  const pool = STOCK_IMAGES[bodyType] || STOCK_IMAGES.SUV;
  const i = imgCounters[bodyType] || 0;
  imgCounters[bodyType] = (i + 1) % pool.length;
  return pool[i % pool.length];
}

// [name, price(₹L), fuel, transmission, seats, bodyType, tag?]
const BRAND_LINEUPS = {
  Tata: [
    ["Tiago", 4.7, "Petrol", "Manual", 5, "Hatchback"],
    ["Tiago EV", 7.99, "Electric", "Automatic", 5, "Hatchback"],
    ["Altroz", 6.65, "Petrol", "Manual", 5, "Hatchback"],
    ["Tigor", 6.25, "Petrol", "Manual", 5, "Sedan"],
    ["Tigor EV", 12.5, "Electric", "Automatic", 5, "Sedan"],
    ["Punch", 5.7, "Petrol", "Manual", 5, "SUV"],
    ["Punch EV", 9.69, "Electric", "Automatic", 5, "SUV"],
    ["Nexon", 7.4, "Petrol", "Manual", 5, "SUV", "Bestseller"],
    ["Nexon EV", 12.49, "Electric", "Automatic", 5, "SUV"],
    ["Curvv", 9.76, "Petrol", "Manual", 5, "SUV", "New"],
    ["Curvv EV", 14.49, "Electric", "Automatic", 5, "SUV"],
    ["Harrier", 15.49, "Diesel", "Manual", 5, "SUV"],
    ["Harrier EV", 21.49, "Electric", "Automatic", 5, "SUV"],
    ["Safari", 16.19, "Diesel", "Manual", 7, "SUV"],
    ["Sierra", 11.49, "Petrol", "Manual", 5, "SUV", "New"],
    ["Sierra EV", 18.79, "Electric", "Automatic", 5, "SUV", "New"],
    ["Yodha Pickup", 9.55, "Diesel", "Manual", 2, "Pickup"],
  ],
  "Maruti Suzuki": [
    ["Alto K10", 4.0, "Petrol", "Manual", 5, "Hatchback"],
    ["S-Presso", 4.5, "Petrol", "Manual", 5, "Hatchback"],
    ["WagonR", 5.6, "Petrol", "Manual", 5, "Hatchback"],
    ["Celerio", 5.5, "Petrol", "Manual", 5, "Hatchback"],
    ["Swift", 6.5, "Petrol", "Manual", 5, "Hatchback", "Bestseller"],
    ["Baleno", 6.7, "Petrol", "Manual", 5, "Hatchback"],
    ["Dzire", 6.8, "Petrol", "Manual", 5, "Sedan"],
    ["Brezza", 8.3, "Petrol", "Manual", 5, "SUV"],
    ["Fronx", 7.5, "Petrol", "Manual", 5, "SUV"],
    ["Grand Vitara", 10.8, "Petrol", "Automatic", 5, "SUV"],
    ["Victoris", 10.5, "Petrol", "Automatic", 5, "SUV", "New"],
    ["e Vitara", 17.5, "Electric", "Automatic", 5, "SUV", "New"],
    ["Jimny", 13.0, "Petrol", "Manual", 4, "SUV"],
    ["Ertiga", 8.8, "Petrol", "Manual", 7, "MPV"],
    ["XL6", 11.5, "Petrol", "Manual", 6, "MPV"],
    ["Invicto", 25.0, "Hybrid", "Automatic", 7, "MPV"],
    ["Eeco", 5.5, "Petrol", "Manual", 7, "Van"],
  ],
  Mahindra: [
    ["XUV 3XO", 7.79, "Petrol", "Manual", 5, "SUV"],
    ["Bolero", 9.5, "Diesel", "Manual", 7, "SUV"],
    ["Bolero Neo", 9.9, "Diesel", "Manual", 7, "SUV"],
    ["Scorpio Classic", 12.5, "Diesel", "Manual", 7, "SUV"],
    ["Scorpio N", 13.69, "Diesel", "Automatic", 7, "SUV", "New"],
    ["Thar", 10.32, "Diesel", "Manual", 4, "SUV"],
    ["Thar ROXX", 12.52, "Diesel", "Automatic", 5, "SUV"],
    ["XUV700", 13.99, "Diesel", "Automatic", 7, "SUV", "Bestseller"],
    ["XUV400 EV", 15.99, "Electric", "Automatic", 5, "SUV"],
    ["BE 6", 18.9, "Electric", "Automatic", 5, "SUV", "New"],
    ["XEV 9e", 21.9, "Electric", "Automatic", 5, "SUV"],
    ["XEV 9S", 20.5, "Electric", "Automatic", 5, "SUV"],
    ["Marazzo", 13.5, "Diesel", "Manual", 7, "MPV"],
    ["Bolero Pik-up", 8.71, "Diesel", "Manual", 2, "Pickup"],
  ],
  Kia: [
    ["Sonet", 7.41, "Petrol", "Manual", 5, "SUV"],
    ["Seltos", 11.0, "Petrol", "Automatic", 5, "SUV", "Bestseller"],
    ["Syros", 8.42, "Petrol", "Manual", 5, "SUV", "New"],
    ["Syros EV", 13.5, "Electric", "Automatic", 5, "SUV", "New"],
    ["Carens", 11.02, "Petrol", "Manual", 6, "MPV"],
    ["Carens Clavis", 11.5, "Diesel", "Automatic", 6, "MPV"],
    ["Carens Clavis EV", 18.0, "Electric", "Automatic", 6, "MPV", "New"],
    ["Carnival", 63.9, "Diesel", "Automatic", 7, "MPV"],
    ["EV6", 65.97, "Electric", "Automatic", 5, "SUV"],
    ["EV9", 130.0, "Electric", "Automatic", 6, "SUV"],
  ],
  Hyundai: [
    ["Grand i10 Nios", 6.0, "Petrol", "Manual", 5, "Hatchback"],
    ["Aura", 6.5, "Petrol", "Manual", 5, "Sedan"],
    ["Exter", 6.0, "Petrol", "Manual", 5, "SUV"],
    ["i20", 7.0, "Petrol", "Manual", 5, "Hatchback"],
    ["Venue", 8.0, "Petrol", "Manual", 5, "SUV"],
    ["Verna", 11.0, "Petrol", "Automatic", 5, "Sedan"],
    ["Creta", 11.0, "Petrol", "Automatic", 5, "SUV", "Bestseller"],
    ["Creta Electric", 17.99, "Electric", "Automatic", 5, "SUV", "New"],
    ["Alcazar", 15.5, "Diesel", "Automatic", 7, "SUV"],
    ["Tucson", 29.0, "Diesel", "Automatic", 5, "SUV"],
    ["Ioniq 5", 46.0, "Electric", "Automatic", 5, "SUV"],
  ],
  Honda: [
    ["Amaze", 7.0, "Petrol", "Manual", 5, "Sedan"],
    ["City", 12.0, "Petrol", "Automatic", 5, "Sedan", "Bestseller"],
    ["City e:HEV", 19.0, "Hybrid", "Automatic", 5, "Sedan", "New"],
    ["Elevate", 11.8, "Petrol", "Automatic", 5, "SUV"],
    ["ZR-V", 47.99, "Hybrid", "Automatic", 5, "SUV", "New"],
  ],
  Toyota: [
    ["Glanza", 6.5, "Petrol", "Manual", 5, "Hatchback"],
    ["Taisor", 8.0, "Petrol", "Manual", 5, "SUV"],
    ["Urban Cruiser Hyryder", 11.5, "Hybrid", "Automatic", 5, "SUV"],
    ["Rumion", 10.0, "Petrol", "Manual", 7, "MPV"],
    ["Innova Crysta", 21.0, "Diesel", "Manual", 7, "MPV"],
    ["Innova Hycross", 20.0, "Hybrid", "Automatic", 7, "MPV", "Bestseller"],
    ["Fortuner", 34.0, "Diesel", "Automatic", 7, "SUV"],
    ["Fortuner Legender", 42.0, "Diesel", "Automatic", 7, "SUV"],
    ["Camry", 48.0, "Hybrid", "Automatic", 5, "Sedan"],
    ["Land Cruiser", 210.0, "Petrol", "Automatic", 7, "SUV"],
  ],
};

let _id = 1;
const CARS = Object.entries(BRAND_LINEUPS).flatMap(([brand, models]) =>
  models.map(([name, price, fuel, transmission, seats, bodyType, tag]) => ({
    id: _id++,
    brand,
    name,
    price,
    image: nextImage(bodyType),
    fuel,
    transmission,
    seats,
    bodyType,
    ...(tag ? { tag } : {}),
  }))
);

const BRANDS = [...new Set(CARS.map((c) => c.brand))];
const BODY_TYPES = [...new Set(CARS.map((c) => c.bodyType))];
const FUEL_TYPES = [...new Set(CARS.map((c) => c.fuel))];

function formatPrice(lakh) {
  if (lakh >= 100) {
    return `₹${(lakh / 100).toFixed(2)} Cr`;
  }
  return `₹${lakh.toFixed(1)} Lakh`;
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
              className="h-4 w-4 rounded border-slate-300 dark:border-white/20 accent-amber-500 dark:accent-red-500"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function CarCard({ car }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-red-500/10 hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-white/5">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.tag && (
          <span className="absolute top-3 left-3 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-amber-500 dark:bg-red-500 text-white shadow">
            {car.tag}
          </span>
        )}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save car"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={saved ? "fill-amber-500 text-amber-500 dark:fill-red-500 dark:text-red-500" : "text-slate-500 dark:text-slate-300"}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
          {car.brand}
        </p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
          {car.name}
        </h3>
        <p className="text-amber-600 dark:text-red-400 font-extrabold text-xl mt-1">
          {formatPrice(car.price)}
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 ml-1">onwards</span>
        </p>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Fuel size={14} /> {car.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Cog size={14} /> {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} /> {car.seats}
          </span>
        </div>

        <button className="w-full mt-4 py-2.5 rounded-xl bg-amber-500 dark:bg-red-500 hover:bg-amber-600 dark:hover:bg-red-600 text-white text-sm font-semibold transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

export default function NewCars() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popularity");
  const [brands, setBrands] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (setFn) => (value) =>
    setFn((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const filtered = useMemo(() => {
    let result = CARS.filter((c) => {
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
  };

  const activeFilterCount = brands.length + bodyTypes.length + fuels.length;

  const FiltersPanel = (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-amber-600 dark:text-red-400 hover:underline"
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b0d] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            New Cars in India
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} car{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or model..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-red-500/40"
            />
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            <SlidersHorizontal size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-red-500/40"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6">{FiltersPanel}</div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  No cars match your filters.
                </p>
                <button
                  onClick={() => {
                    clearAll();
                    setQuery("");
                  }}
                  className="mt-3 text-sm font-semibold text-amber-600 dark:text-red-400 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-slate-50 dark:bg-[#0b0b0d] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10"
              >
                <X size={16} className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>
            {FiltersPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-amber-500 dark:bg-red-500 text-white text-sm font-semibold"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
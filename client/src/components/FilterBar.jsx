import React from 'react';
import { useTheme } from '../Context/ThemeContext.jsx';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export const BUDGET_OPTIONS = [
  { label: 'Under ₹7 Lakh', max: 700000 },
  { label: '₹7 – 12 Lakh', max: 1200000 },
  { label: '₹12 – 20 Lakh', max: 2000000 },
  { label: '₹20 Lakh+', max: Infinity },
];

export const FUEL_OPTIONS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
export const TRANS_OPTIONS = ['Manual', 'Automatic', 'CVT'];
export const CITY_OPTIONS = ['All', 'Gurgaon', 'Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Jaipur', 'Chandigarh'];

export default function FilterBar({
  fuelFilter = [],
  transFilter = [],
  budgetFilter = null,
  selectedCity = 'All',
  onFuelChange,
  onTransChange,
  onBudgetChange,
  onCityChange,
  onReset
}) {
  const { dark } = useTheme();

  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';

  const toggleArray = (arr = [], setFn, val) => {
    if (arr.includes(val)) {
      setFn(arr.filter((item) => item !== val));
    } else {
      setFn([...arr, val]);
    }
  };

  return (
    <div className="space-y-6 text-xs font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className={`font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${textHi}`}>
          <SlidersHorizontal size={16} /> Filters
        </h3>
        <button
          onClick={onReset}
          className="text-red-500 font-bold hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* City Filter */}
      {onCityChange && (
        <div className="space-y-2">
          <p className={`font-bold uppercase tracking-wider ${textSb}`}>City Location</p>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className={`w-full p-2.5 rounded-xl border outline-none font-semibold ${
              dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Cities' : c}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Budget Filter */}
      {onBudgetChange && (
        <div className="space-y-2">
          <p className={`font-bold uppercase tracking-wider ${textSb}`}>Budget Range</p>
          <div className="space-y-1.5">
            {BUDGET_OPTIONS.map((b, idx) => (
              <label key={idx} className={`flex items-center gap-2 cursor-pointer font-semibold ${textHi}`}>
                <input
                  type="radio"
                  name="budget_filter_radio"
                  checked={budgetFilter === idx}
                  onChange={() => onBudgetChange(budgetFilter === idx ? null : idx)}
                  className="accent-red-500 cursor-pointer"
                />
                {b.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Fuel Type Filter */}
      {onFuelChange && (
        <div className="space-y-2">
          <p className={`font-bold uppercase tracking-wider ${textSb}`}>Fuel Type</p>
          <div className="space-y-1.5">
            {FUEL_OPTIONS.map((f) => (
              <label key={f} className={`flex items-center gap-2 cursor-pointer font-semibold ${textHi}`}>
                <input
                  type="checkbox"
                  checked={fuelFilter.includes(f)}
                  onChange={() => toggleArray(fuelFilter, onFuelChange, f)}
                  className="accent-red-500 cursor-pointer"
                />
                {f}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Transmission Filter */}
      {onTransChange && (
        <div className="space-y-2">
          <p className={`font-bold uppercase tracking-wider ${textSb}`}>Transmission</p>
          <div className="space-y-1.5">
            {TRANS_OPTIONS.map((t) => (
              <label key={t} className={`flex items-center gap-2 cursor-pointer font-semibold ${textHi}`}>
                <input
                  type="checkbox"
                  checked={transFilter.includes(t)}
                  onChange={() => toggleArray(transFilter, onTransChange, t)}
                  className="accent-red-500 cursor-pointer"
                />
                {t}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

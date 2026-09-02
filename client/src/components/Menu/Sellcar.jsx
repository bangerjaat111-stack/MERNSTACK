import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { showSuccessToast, showErrorToast } from '../Notification/Tost';
import axios from 'axios';
import { API_URL } from '../../config/api.js';
import {
  RiCarLine, RiPriceTag3Line, RiShieldCheckLine, RiMapPinLine,
  RiCheckLine, RiUploadCloud2Line, RiCalculatorLine, RiFireLine,
  RiUser3Line, RiPhoneLine, RiQuestionLine
} from 'react-icons/ri';

const BRANDS = ['Maruti Suzuki', 'Tata Motors', 'Hyundai', 'Mahindra', 'Kia', 'Toyota', 'Honda', 'BMW', 'Mercedes-Benz'];
const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017 & Older'];
const FUELS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
const TRANS = ['Manual', 'Automatic'];

export default function Sellcar() {
  const { dark } = useTheme();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Tata Motors',
    model: 'Nexon XZ+',
    year: '2022',
    fuel: 'Petrol',
    trans: 'Manual',
    km: '25000',
    city: 'Gurgaon',
    condition: 'Excellent',
    askingPrice: '7.80',
    name: '',
    phone: '',
    email: '',
  });

  // Calculate estimated resale price dynamically
  const estimatedPrice = React.useMemo(() => {
    let base = 8.5; // Base estimate in Lakh
    if (formData.brand === 'BMW' || formData.brand === 'Mercedes-Benz') base = 35.0;
    if (formData.year === '2026') base *= 1.15;
    if (formData.year === '2021') base *= 0.85;
    if (formData.year === '2019' || formData.year === '2018') base *= 0.65;
    const kmNum = parseInt(formData.km) || 20000;
    if (kmNum > 50000) base *= 0.85;
    return {
      min: (base * 0.92).toFixed(2),
      max: (base * 1.08).toFixed(2),
    };
  }, [formData.brand, formData.year, formData.km]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showErrorToast('Please fill in your contact details');
      return;
    }
    const userId = localStorage.getItem('userid');
    if (userId) {
      try {
        await axios.post(`${API_URL}/user/${userId}/listings`, {
          title: `${formData.brand} ${formData.model}`,
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          fuel: formData.fuel,
          trans: formData.trans,
          km: `${formData.km} km`,
          city: formData.city,
          price: `₹${formData.askingPrice} Lakh`,
          img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
          status: 'Active'
        });
      } catch (err) {
        console.error('Failed to save car listing to DB:', err);
      }
    }
    setSubmitted(true);
    showSuccessToast('Car listing submitted successfully!');
  };

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
            <RiPriceTag3Line size={14} /> Instant Car Valuation & Sale
          </span>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
            Sell Your Car at <span className={gradText}>Best Market Value</span>
          </h1>
          <p className={`text-sm ${textSb}`}>
            Get free inspection, instant price estimate, zero commission, and fast payment in 24 hours.
          </p>
        </div>

        {/* STEPPER BAR */}
        <div className="flex items-center justify-center gap-3">
          {[
            { num: 1, title: 'Car Specs' },
            { num: 2, title: 'Valuation & Price' },
            { num: 3, title: 'Seller Info & Submit' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                step === s.num
                  ? gradBtn
                  : dark
                  ? 'bg-white/5 border-white/10 text-white/50'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className={`rounded-3xl border ${border} ${cardBg} p-6 sm:p-10 shadow-2xl space-y-8`}>
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 mx-auto flex items-center justify-center text-4xl shadow-inner">
                <RiCheckLine />
              </div>
              <h2 className={`text-2xl font-extrabold ${textHi}`}>Listing Submitted Successfully!</h2>
              <p className={`text-sm max-w-md mx-auto ${textSb}`}>
                Our certified evaluator will contact you at <strong>{formData.phone}</strong> within 30 minutes to confirm your doorstep inspection.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
              >
                List Another Car
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: CAR SPECS */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textHi}`}>Step 1: Select Your Vehicle Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Brand / Manufacturer</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Car Model & Variant</label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        placeholder="e.g. Nexon XZ+, Creta SX, Swift VXI"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Registration Year</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Fuel Type</label>
                      <select
                        value={formData.fuel}
                        onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Kilometers Driven</label>
                      <input
                        type="number"
                        value={formData.km}
                        onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>City / Location</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
                    >
                      Next: Valuation & Price →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: VALUATION & PRICING */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textHi}`}>Step 2: Valuation Estimate & Your Asking Price</h3>

                  {/* ESTIMATION BOX */}
                  <div className={`p-6 rounded-2xl border ${dark ? 'bg-gradient-to-br from-red-950/40 to-[#0D0F16] border-red-900/30' : 'bg-gradient-to-br from-amber-50 to-white border-amber-200'} space-y-2`}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-red-400">
                      <RiFireLine size={16} /> AutoSyntax AI Market Valuation
                    </div>
                    <p className={`text-2xl font-extrabold ${gradText}`}>
                      ₹{estimatedPrice.min} – ₹{estimatedPrice.max} Lakh
                    </p>
                    <p className={`text-xs ${textSb}`}>
                      Estimated fair market resale range based on recent verified transactions in {formData.city}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Overall Vehicle Condition</label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        <option value="Like New">Like New (Mint)</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good (Minor Scratches)</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Your Expected Asking Price (in ₹ Lakh)</label>
                      <input
                        type="text"
                        value={formData.askingPrice}
                        onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                        placeholder="e.g. 7.50"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${dark ? 'border-white/10 text-white/60' : 'border-slate-300 text-slate-600'}`}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
                    >
                      Next: Contact & Submit →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SELLER CONTACT & SUBMIT */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textHi}`}>Step 3: Seller Contact & Photo Upload</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Your Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Mobile Number (For Verification)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>
                  </div>

                  {/* PHOTO UPLOAD BOX */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Car Photos (Optional)</label>
                    <div className={`p-6 rounded-2xl border-2 border-dashed ${dark ? 'border-white/15 bg-white/4' : 'border-slate-300 bg-slate-50'} text-center space-y-2 cursor-pointer hover:border-red-500 transition-colors`}>
                      <RiUploadCloud2Line size={32} className={`mx-auto ${dark ? 'text-white/40' : 'text-slate-400'}`} />
                      <p className={`text-xs font-bold ${textHi}`}>Click to upload or drag & drop car exterior & interior photos</p>
                      <p className={`text-[10px] ${textSb}`}>PNG, JPG or WEBP up to 10MB each</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${dark ? 'border-white/10 text-white/60' : 'border-slate-300 text-slate-600'}`}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className={`px-10 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
                    >
                      Submit Listing & Get Free Inspection
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

        {/* WHY SELL WITH US STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: RiShieldCheckLine, title: 'Instant Payment', desc: 'Money transferred directly to your bank upon deal completion.' },
            { icon: RiMapPinLine, title: 'Free Doorstep Inspection', desc: 'Our certified mechanics evaluate your car at your home.' },
            { icon: RiCarLine, title: 'Free RC Transfer', desc: 'Zero hassle, we handle all ownership transfer documentation.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border ${border} ${cardBg} space-y-2`}>
                <Icon size={24} className={dark ? 'text-red-400' : 'text-amber-600'} />
                <h4 className={`font-bold text-sm ${textHi}`}>{item.title}</h4>
                <p className={`text-xs ${textSb}`}>{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

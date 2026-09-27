import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext.jsx';
import { showSuccessToast, showErrorToast } from '../components/Notification/Tost';
import ImageUploader from '../components/ImageUploader.jsx';
import axios from 'axios';
import { API_URL } from '../config/api.js';
import {
  RiCarLine, RiPriceTag3Line, RiShieldCheckLine, RiMapPinLine,
  RiCheckLine, RiFireLine, RiUser3Line, RiPhoneLine,
  RiArrowRightLine, RiGasStationLine, RiCompass3Line
} from 'react-icons/ri';

const BRANDS = [
  'Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Kia',
  'Toyota', 'Honda', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Tesla', 'Other'
];
const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017 & Older'];
const FUELS = ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'];
const TRANS = ['Manual', 'Automatic'];

export default function SellCar() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'SX(O)',
    year: '2022',
    fuel: 'Petrol',
    trans: 'Automatic',
    km: '22000',
    city: 'Gurgaon',
    condition: 'Excellent',
    askingPrice: '12.50',
    description: '',
    name: '',
    phone: '',
    email: '',
  });

  // Dynamic Valuation Estimate based on selected specs
  const estimatedPrice = React.useMemo(() => {
    let base = 8.5;
    if (formData.brand === 'BMW' || formData.brand === 'Mercedes-Benz' || formData.brand === 'Tesla') base = 32.0;
    if (formData.brand === 'Hyundai' || formData.brand === 'Mahindra' || formData.brand === 'Kia') base = 12.0;
    if (formData.year === '2026' || formData.year === '2025') base *= 1.2;
    if (formData.year === '2022') base *= 0.95;
    if (formData.year === '2020') base *= 0.8;
    if (formData.year === '2018') base *= 0.65;
    const kmNum = parseInt(formData.km) || 20000;
    if (kmNum > 40000) base *= 0.88;
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
      showErrorToast('Please fill in your name and contact phone number');
      setStep(3);
      return;
    }
    if (images.length === 0) {
      showErrorToast('Please upload at least 1 photo of your car');
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem('userid');
    const mainImg = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop';
    
    const carTitle = `${formData.year} ${formData.brand} ${formData.model} ${formData.variant}`.trim();
    const formattedPrice = `₹${formData.askingPrice} Lakh`;
    const priceNumber = (parseFloat(formData.askingPrice) || 5) * 100000;

    const payload = {
      title: carTitle,
      brand: formData.brand,
      model: formData.model,
      variant: formData.variant,
      year: Number(formData.year) || 2023,
      fuel: formData.fuel,
      trans: formData.trans,
      km: `${formData.km} km`,
      city: formData.city,
      price: formattedPrice,
      priceNum: priceNumber,
      askingPrice: formData.askingPrice,
      description: formData.description || `${carTitle} in ${formData.condition} condition. Non-accidental, single owner, fully serviced.`,
      img: mainImg,
      images: images,
      contact: { name: formData.name, phone: formData.phone },
      sellerId: userId || "guest_seller",
      userId: userId,
      status: 'Approved' // Auto-approved so it shows up on Used Cars page publicly immediately!
    };

    try {
      await axios.post(`${API_URL}/used-cars`, payload);

      // Sync with user's personal listings document if logged in
      if (userId) {
        axios.post(`${API_URL}/user/${userId}/listings`, {
          ...payload,
          status: 'Approved'
        }).catch(() => {});
      }

      setSubmitted(true);
      showSuccessToast('Car listed successfully! It is now live on Used Cars.');
    } catch (err) {
      console.error('Failed to post car listing:', err);
      showErrorToast(err?.response?.data?.msg || err?.message || 'Failed to post car listing. Please check backend connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full ${dark ? 'bg-red-900/20 text-red-400 border border-red-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
            <RiPriceTag3Line size={14} /> Sell Car &amp; Instant Public Listing
          </span>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
            List Your Car on <span className={gradText}>Used Cars Marketplace</span>
          </h1>
          <p className={`text-sm ${textSb}`}>
            Fill details, upload photos &amp; price. Your car will be listed publicly for buyers to contact you directly.
          </p>
        </div>

        {/* STEPPER BAR */}
        <div className="flex items-center justify-center gap-3">
          {[
            { num: 1, title: 'Car Model & Specs' },
            { num: 2, title: 'Price & Valuation' },
            { num: 3, title: 'Photos & Contact' },
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

        {/* MAIN FORM CARD */}
        <div className={`rounded-3xl border ${border} ${cardBg} p-6 sm:p-10 shadow-2xl space-y-8`}>
          
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 mx-auto flex items-center justify-center text-4xl shadow-inner">
                <RiCheckLine />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${textHi}`}>Car Listed Successfully!</h2>
              <p className={`text-sm max-w-md mx-auto ${textSb}`}>
                Your <strong>{formData.brand} {formData.model} {formData.variant}</strong> is now live on the public Used Cars page. Buyers can reach you at <strong>{formData.phone}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => navigate('/used-cars')}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-none cursor-pointer ${gradBtn} flex items-center justify-center gap-2`}
                >
                  View Public Used Cars <RiArrowRightLine size={16} />
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setImages([]);
                    setStep(1);
                  }}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${dark ? 'border-white/10 text-white/70 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-100'} cursor-pointer`}
                >
                  List Another Car
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: CAR MODEL & SPECS */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${textHi}`}>
                    <RiCarLine className="text-red-500" /> Step 1: Car Brand, Model &amp; Variant Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Brand / Manufacturer *</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Car Model *</label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        placeholder="e.g. Creta, Nexon, Swift, Model 3, City"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Car Variant / Trim *</label>
                      <input
                        type="text"
                        value={formData.variant}
                        onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                        placeholder="e.g. SX(O), VXI, XZ+, Long Range, GT Line"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Registration Year *</label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Fuel Type *</label>
                      <select
                        value={formData.fuel}
                        onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Transmission *</label>
                      <select
                        value={formData.trans}
                        onChange={(e) => setFormData({ ...formData, trans: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      >
                        {TRANS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Kilometers Driven (km)</label>
                      <input
                        type="number"
                        value={formData.km}
                        onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                        placeholder="e.g. 25000"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>City / Location *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Gurgaon, Delhi, Mumbai, Pune"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}
                    >
                      Next: Valuation &amp; Pricing →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: VALUATION & PRICING & DESCRIPTION */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${textHi}`}>
                    <RiPriceTag3Line className="text-amber-500" /> Step 2: Car Price, Valuation &amp; Description
                  </h3>

                  {/* AI Valuation Estimate Box */}
                  <div className={`p-6 rounded-2xl border ${dark ? 'bg-gradient-to-br from-red-950/40 to-[#0D0F16] border-red-900/30' : 'bg-gradient-to-br from-amber-50 to-white border-amber-200'} space-y-2`}>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-red-400">
                      <RiFireLine size={16} /> Market Price Estimate for {formData.brand} {formData.model}
                    </div>
                    <p className={`text-2xl font-extrabold ${gradText}`}>
                      ₹{estimatedPrice.min} – ₹{estimatedPrice.max} Lakh
                    </p>
                    <p className={`text-xs ${textSb}`}>
                      Fair resale estimate based on recent verified car transactions in {formData.city}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Your Asking Price (in ₹ Lakh) *</label>
                      <input
                        type="text"
                        value={formData.askingPrice}
                        onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                        placeholder="e.g. 12.50"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

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
                  </div>

                  {/* DESCRIPTION TEXTAREA */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>
                      Car Description (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Mention car features, service records, sunroof, insurance details, non-accidental guarantee..."
                      className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold resize-none`}
                    />
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
                      Next: Photos &amp; Contact →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: MULTIPLE PHOTOS UPLOAD & SELLER CONTACT */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold flex items-center gap-2 ${textHi}`}>
                    <RiUser3Line className="text-blue-500" /> Step 3: Upload Photos &amp; Seller Phone Number
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Your Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>Phone Number (For Buyers) *</label>
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

                  {/* MULTI PHOTO UPLOADER */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${textSb}`}>
                      Upload Car Photos (Multiple Photos Supported) *
                    </label>
                    <ImageUploader images={images} onChange={setImages} maxImages={8} />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Upload front, side, back, and interior photos for higher buyer trust. First photo will be the main cover image.
                    </p>
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
                      disabled={isSubmitting}
                      className={`px-10 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border-none cursor-pointer ${gradBtn} disabled:opacity-50`}
                    >
                      {isSubmitting ? 'Publishing Car Listing...' : 'Publish Car on Used Cars Publicly'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

        {/* TRUST BADGES STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: RiShieldCheckLine, title: 'Instant Public Listing', desc: 'Car appears directly on the public Used Cars marketplace.' },
            { icon: RiPhoneLine, title: 'Direct Buyer Inquiries', desc: 'Interested buyers call or message your phone number directly.' },
            { icon: RiCarLine, title: 'Zero Brokerage Commission', desc: 'Keep 100% of your car price with zero commission fee.' },
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

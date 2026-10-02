import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { API_URL } from '../../config/api.js';
import {
  RiVideoLine, RiPlayFill, RiCloseLine,RiFilter3Line, 
  RiPriceTag3Line, RiGasStationLine, RiCalculatorLine,
  RiHeartLine, RiHeartFill, RiAddLine
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

// Sample video object (as requested by user)
const SAMPLE_DEFENDER = {
  id: 1,
  title: "Land Rover Defender",
  thumbnail: "https://cdn-s3.autocarindia.com/Land-Rover/defender/Z62_7431%20copy.jpg?w=728&q=75&fm=auto",
  video: "https://youtu.be/gxRQ7iXmtnw?si=nVbjI-xddBi5A9Im",
  description: "Land Rover Defender is a rugged and premium SUV built to combine legendary off-road capability with modern luxury and technology.",
  brand: "Land Rover",
  category: "Reviews",
  price: "₹1.05 Crore - ₹1.50 Crore",
  engine: "2.0L Turbocharged Petrol / 3.0L Turbocharged Petrol / 5.0L Supercharged V8",
  topSpeed: "191 km/h",
  maxPower: "296 bhp - 518 bhp",
  power: "296 bhp - 518 bhp",
  torque: "400 Nm - 625 Nm",
  acceleration: "6.7s - 8.3s (0-100 km/h)",
  transmission: "8-Speed Automatic"
};

// Modal component to Add New Video to MongoDB
function AddVideoModal({ onClose, onVideoAdded, dark }) {
  const [formData, setFormData] = useState({
    title: '',
    video: '',
    thumbnail: '',
    brand: '',
    category: 'Reviews',
    price: '',
    engine: '',
    topSpeed: '',
    power: '',
    torque: '',
    acceleration: '',
    transmission: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoFillDefender = () => {
    setFormData(SAMPLE_DEFENDER);
    setSuccessMsg('Auto-filled with Land Rover Defender details!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.video) {
      setErrorMsg('Please enter at least Title and Video YouTube URL.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const payload = {
        ...formData,
        maxPower: formData.power || formData.maxPower,
      };

      const res = await axios.post(`${API_URL}/video`, payload);

      if (res.data?.status || res.status === 201 || res.status === 200) {
        setSuccessMsg('✅ Video added successfully to MongoDB!');
        if (onVideoAdded) {
          onVideoAdded(res.data?.data || payload);
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg(res.data?.msg || 'Failed to save video');
      }
    } catch (err) {
      console.error('Error adding video:', err);
      setErrorMsg(err.response?.data?.msg || err.message || 'Server error saving video');
    } finally {
      setLoading(false);
    }
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
        } p-6 shadow-2xl space-y-5 cursor-default max-h-[90vh] overflow-y-auto`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
             
              <button
                type="button"
                onClick={handleAutoFillDefender}
                className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 hover:bg-amber-400 text-black border-none cursor-pointer shadow transition-transform hover:scale-105"
              >
                ✨ Auto-Fill Land Rover Defender
              </button>
            </div>
            <h2 className="text-xl font-black uppercase mt-1">
              Add New Car Video
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-red-600 hover:text-white transition-colors cursor-pointer border-none text-slate-300"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/50 text-red-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 text-xs font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          {/* Row 1: Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Car / Video Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Land Rover Defender"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Brand Name *</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Land Rover"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
          </div>

          {/* Row 2: YouTube Video URL & Thumbnail URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">YouTube Video URL *</label>
              <input
                type="url"
                name="video"
                required
                value={formData.video}
                onChange={handleChange}
                placeholder="https://youtu.be/..."
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Thumbnail Image URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://cdn..."
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
          </div>

          {/* Row 3: Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Reviews, Offroad & Drag"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Price Range</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. ₹1.05 Crore - ₹1.50 Crore"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
          </div>

          {/* Row 4: Engine & Power */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Engine Specification</label>
              <input
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                placeholder="e.g. 3.0L Turbocharged Petrol"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Max Power</label>
              <input
                type="text"
                name="power"
                value={formData.power}
                onChange={handleChange}
                placeholder="e.g. 296 bhp - 518 bhp"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
          </div>

          {/* Row 5: Torque, Top Speed, Acceleration, Transmission */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Torque</label>
              <input
                type="text"
                name="torque"
                value={formData.torque}
                onChange={handleChange}
                placeholder="e.g. 400 Nm - 625 Nm"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Top Speed</label>
              <input
                type="text"
                name="topSpeed"
                value={formData.topSpeed}
                onChange={handleChange}
                placeholder="e.g. 191 km/h"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Acceleration</label>
              <input
                type="text"
                name="acceleration"
                value={formData.acceleration}
                onChange={handleChange}
                placeholder="e.g. 6.7s (0-100 km/h)"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Transmission</label>
              <input
                type="text"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                placeholder="e.g. 8-Speed Automatic"
                className={`w-full px-3 py-2.5 rounded-xl border ${
                  dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                } focus:outline-none focus:border-red-500`}
              />
            </div>
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block text-slate-400 mb-1">Car Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Land Rover Defender is a rugged and premium SUV..."
              className={`w-full px-3 py-2.5 rounded-xl border ${
                dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              } focus:outline-none focus:border-red-500`}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border-none cursor-pointer hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider border-none cursor-pointer hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-950/50"
            >
              {loading ? 'Storing in MongoDB...' : 'Save Video to MongoDB'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Videos() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [activeBrand, setActiveBrand] = useState('All');
  const [activeBodyType, setActiveBodyType] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [emiVideo, setEmiVideo] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Callback when a video is successfully created in MongoDB
  const handleVideoAdded = (newVid) => {
    const normalizedNewVid = {
      ...newVid,
      thumbnail: newVid.thumbnailUrl || newVid.thumbnail || newVid.image || '',
      description: newVid.description || newVid.blurb || '',
      bodyType: newVid.bodyType || 'SUV',
      category: newVid.category || 'Reviews',
      engine:
        typeof newVid.engine === 'object' && newVid.engine !== null
          ? newVid.engine
          : {
              type: newVid.engine || '',
              fuelType: newVid.engine?.fuelType || 'Petrol',
              maxPower: newVid.maxPower || newVid.power || '',
              maxTorque: newVid.torque || '',
              transmission: newVid.transmission || '',
              drivetrain: 'FWD',
            },
      variants:
        Array.isArray(newVid.variants) && newVid.variants.length > 0
          ? newVid.variants
          : [{ name: 'Base', price: newVid.price || 'Price on request' }],
      price: newVid.price || '',
    };
    setVideos((prev) => [normalizedNewVid, ...prev]);
  };

  // Sync search query parameter from URL (from Navbar or direct link)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q !== null) {
      setSearchVal(q);
    } else {
      setSearchVal('');
    }
  }, [location.search]);

  // ✅ Fetch videos from backend API (/video) + NORMALIZE for MongoDB + fallback data
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/video`, { timeout: 15000 });

        const raw = Array.isArray(data?.data) ? data.data : [];

        // ✅ Normalize both Mongo docs & fallback raw cars to the shape the UI expects
        const normalized = raw.map((v) => {
          // engine can be object (Mongo) or string (raw fallback)
          const normalizedEngine =
            typeof v.engine === 'object' && v.engine !== null
              ? v.engine
              : {
                  type: v.engine || v.specs?.engine || '',
                  fuelType: v.specs?.fuelType || '',
                  displacement: '',
                  maxPower: v.maxPower || v.power || v.specs?.power || '',
                  maxTorque: v.torque || v.specs?.torque || '',
                  transmission: v.transmission || v.specs?.transmission || '',
                  drivetrain: 'FWD',
                };

          // variants must always be a non-empty array
          const normalizedVariants =
            Array.isArray(v.variants) && v.variants.length > 0
              ? v.variants
              : [{ name: 'Base', price: v.price || v.specs?.price || 'Price on request' }];

          return {
            ...v,
            // image
            thumbnail: v.thumbnailUrl || v.thumbnail || v.image || '',
            // text
            description: v.description || v.blurb || '',
            // filters
            brand: v.brand
              ? v.brand.trim().charAt(0).toUpperCase() + v.brand.trim().slice(1)
              : 'Unknown',
            bodyType: v.bodyType || 'SUV',
            category: v.category || 'Reviews',
            // engine & variants
            engine: normalizedEngine,
            variants: normalizedVariants,
            // price
            price: v.price || normalizedVariants[0]?.price || '',
          };
        });

        setVideos(normalized);
      } catch (err) {
        console.error('❌ Error fetching backend videos API:', err.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Compute unique brands and body types dynamically from backend data
  const brands = useMemo(() => {
    const set = new Set(videos.map(v => v.brand).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [videos]);

  const bodyTypes = useMemo(() => {
    const set = new Set(videos.map(v => v.bodyType).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [videos]);

  // ✅ Filter logic based on brand, bodyType, and search query (uses `category` not `segment`)
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchBrand =
        activeBrand === 'All' ||
        (v.brand && v.brand.toLowerCase() === activeBrand.toLowerCase());

      const matchBody =
        activeBodyType === 'All' ||
        (v.bodyType && v.bodyType.toLowerCase() === activeBodyType.toLowerCase());

      const q = searchVal.toLowerCase().trim();
      const matchQuery =
        !q ||
        (v.title && v.title.toLowerCase().includes(q)) ||
        (v.brand && v.brand.toLowerCase().includes(q)) ||
        (v.model && v.model.toLowerCase().includes(q)) ||
        (v.bodyType && v.bodyType.toLowerCase().includes(q)) ||
        (v.category && v.category.toLowerCase().includes(q)) ||   // ✅ was v.segment
        (v.engine?.fuelType && v.engine.fuelType.toLowerCase().includes(q)) ||
        (v.engine?.type && v.engine.type.toLowerCase().includes(q)) ||
        (v.variants?.[0]?.price && v.variants[0].price.toLowerCase().includes(q));

      return matchBrand && matchBody && matchQuery;
    });
  }, [videos, activeBrand, activeBodyType, searchVal]);

  // Styling helper variables
  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';

  return (
    <div className={`min-h-screen ${bg} py-8 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE HEADER WITH ADD VIDEO OPTION */}
        <div className={`p-6 rounded-2xl border ${border} ${cardBg} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white">
                Video Hub
              </span>
           
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 ${textHi}`}>
              Experience Cars Beyond the Specs
            </h1>
            <p className={`text-xs mt-1 ${textSb}`}>
              Discover the world of automobiles through expert car reviews, thrilling test drives, detailed walk-arounds, comparisons, and exclusive video content.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-linear-to-r from-red-600 via-red-700 to-amber-600 text-white font-extrabold text-xs uppercase tracking-wider border-none cursor-pointer hover:opacity-90 shadow-xl shadow-red-950/40 flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
          >
            <RiAddLine size={18} />  Add Video
          </button>
        </div>

        {/* BRAND & BODY TYPE FILTERS */}
        <div className="flex flex-col gap-3">
          {/* Brands Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1 shrink-0">
              <RiFilter3Line /> Brand:
            </span>
            {brands.map(b => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                  activeBrand === b
                    ? dark
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/50'
                      : 'bg-amber-600 text-white border-amber-500 shadow-md'
                    : dark
                      ? 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Body Types Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1 shrink-0">
              <RiFilter3Line /> Body:
            </span>
            {bodyTypes.map(bt => (
              <button
                key={bt}
                onClick={() => setActiveBodyType(bt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                  activeBodyType === bt
                    ? dark
                      ? 'bg-red-700 text-white border-red-600'
                      : 'bg-amber-700 text-white border-amber-600'
                    : dark
                      ? 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {bt}
              </button>
            ))}
          </div>
        </div>

        {/* CAR VIDEOS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className={`h-80 rounded-2xl animate-pulse ${dark ? 'bg-white/5' : 'bg-slate-200'}`} />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <RiVideoLine size={48} className="mx-auto text-slate-400" />
            <h3 className={`text-lg font-bold ${textHi}`}>No car videos found</h3>
            <p className={`text-xs ${textSb}`}>Try clearing your search query or filters.</p>
            <button
              onClick={() => { setSearchVal(''); setActiveBrand('All'); setActiveBodyType('All'); }}
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider border-none cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => {
              const startingPrice = video.variants?.[0]?.price || video.price || 'Price on request';
              const engineType = video.engine?.type || video.engine?.fuelType || 'Petrol / Diesel';
              const maxPower = video.engine?.maxPower || 'High Performance';
              const transmission = video.engine?.transmission || 'Manual / Automatic';
              const isSaved = isWishlisted(video);

              return (
                <div
                  key={video.id || video._id || video.title}
                  className={`group rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col`}
                >
                  {/* Video Thumbnail with Play Badge */}
                  <div className="relative aspect-video overflow-hidden bg-black/40">
                    <img
                      src={video.thumbnail || video.thumbnailUrl || video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer border-none bg-transparent group/btn"
                    >
                      <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-950/60 group-hover/btn:scale-110 transition-transform">
                        <RiPlayFill size={28} className="ml-1" />
                      </div>
                    </button>

                    {/* Brand & BodyType Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow">
                        {video.brand}
                      </span>
                      {video.bodyType && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                          {video.bodyType}
                        </span>
                      )}
                    </div>

                    {/* Top Right Actions: EMI Calc & Wishlist */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEmiVideo(video);
                        }}
                        className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-amber-500 hover:bg-amber-400 text-black border-none cursor-pointer shadow transition-transform hover:scale-105 flex items-center gap-1"
                        title="Calculate EMI"
                      >
                        <RiCalculatorLine size={12} /> EMI Calc
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(video);
                        }}
                        className="p-1.5 rounded-md bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-110 border-none cursor-pointer"
                        title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        {isSaved ? (
                          <RiHeartFill size={16} className="text-red-500" />
                        ) : (
                          <RiHeartLine size={16} className="text-white hover:text-red-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`text-lg font-black truncate tracking-wide ${textHi}`}>
                        {video.title}
                      </h3>
                      <p className={`text-xs mt-1 line-clamp-2 ${textSb}`}>
                        {video.description}
                      </p>
                    </div>

                    {/* Car Info Badges (Price & Engine) */}
                    <div className={`p-3 rounded-xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-100/70 border-slate-200'} space-y-2`}>
                      {/* Price row */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <RiPriceTag3Line className="text-red-500" /> Price Starts:
                        </span>
                        <span className="text-xs font-black text-red-500">
                          {startingPrice}
                        </span>
                      </div>

                      {/* Engine row */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <RiGasStationLine className="text-amber-500" /> Engine & Fuel:
                        </span>
                        <span className={`text-[11px] font-bold truncate max-w-[150px] ${textHi}`}>
                          {engineType}
                        </span>
                      </div>

                      {/* Power / Transmission row */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                        <span className="text-slate-400">Power: <strong className={textHi}>{maxPower}</strong></span>
                        <span className="text-slate-400">Trans: <strong className={textHi}>{transmission.split('/')[0]}</strong></span>
                      </div>
                    </div>

                    {/* View Details / Play Button */}
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all border-none ${
                        dark
                          ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white hover:opacity-90 shadow-md shadow-red-950/40'
                          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white hover:opacity-90 shadow-md'
                      }`}
                    >
                      <RiPlayFill size={16} /> Watch Video & View Specs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* VIDEO & SPECS MODAL DIALOG */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border ${border} ${cardBg} p-6 shadow-2xl space-y-6 ${textHi}`}>

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white">
                  {selectedVideo.brand} {selectedVideo.bodyType && `· ${selectedVideo.bodyType}`}
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase mt-1">
                  {selectedVideo.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(selectedVideo)}
                  className={`px-3 py-1.5 rounded-xl border border-none text-xs font-extrabold cursor-pointer transition-transform hover:scale-105 flex items-center gap-1 ${
                    isWishlisted(selectedVideo)
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={isWishlisted(selectedVideo) ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  {isWishlisted(selectedVideo) ? (
                    <><RiHeartFill size={16} className="text-white" /> Saved</>
                  ) : (
                    <><RiHeartLine size={16} /> Wishlist</>
                  )}
                </button>
                <button
                  onClick={() => setEmiVideo(selectedVideo)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-extrabold cursor-pointer border-none shadow transition-transform hover:scale-105 flex items-center gap-1"
                >
                  <RiCalculatorLine size={16} /> EMI
                </button>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-600 hover:text-white transition-colors cursor-pointer border-none text-slate-300"
                >
                  <RiCloseLine size={22} />
                </button>
              </div>
            </div>

            {/* Modal Video / Image Player Box */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              {selectedVideo.embedId || selectedVideo.youtubeUrl ? (
                <iframe
                  src={
                    selectedVideo.embedId
                      ? `https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`
                      : selectedVideo.youtubeUrl.includes('embed')
                      ? selectedVideo.youtubeUrl
                      : `https://www.youtube.com/embed/${
                          selectedVideo.youtubeUrl.split('v=')[1]?.split('&')[0] ||
                          selectedVideo.youtubeUrl.split('youtu.be/')[1]?.split('?')[0] ||
                          selectedVideo.youtubeUrl
                        }?autoplay=1`
                  }
                  title={selectedVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={selectedVideo.thumbnail || selectedVideo.thumbnailUrl || selectedVideo.image}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-pulse">
                      <RiPlayFill size={34} className="ml-1" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Price & Variants Section */}
            {selectedVideo.variants && selectedVideo.variants.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
                  <RiPriceTag3Line /> Variants & Prices
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedVideo.variants.map((varItem, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                    >
                      <p className="text-xs font-semibold text-slate-400">{varItem.name}</p>
                      <p className="text-sm font-black text-red-500 mt-0.5">{varItem.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Engine Specifications Section */}
            {selectedVideo.engine && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                  <RiGasStationLine /> Engine & Performance Specifications
                </h4>
                <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} text-xs`}>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Fuel / Engine Type</span>
                    <strong className="font-bold">{selectedVideo.engine.fuelType || selectedVideo.engine.type || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Displacement</span>
                    <strong className="font-bold">{selectedVideo.engine.displacement || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Max Power</span>
                    <strong className="font-bold">{selectedVideo.engine.maxPower || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Max Torque</span>
                    <strong className="font-bold">{selectedVideo.engine.maxTorque || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Transmission</span>
                    <strong className="font-bold">{selectedVideo.engine.transmission || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Drivetrain</span>
                    <strong className="font-bold">{selectedVideo.engine.drivetrain || 'FWD'}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer border-none hover:bg-slate-600 transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EMI CALCULATOR MODAL DIALOG */}
      {emiVideo && (
        <EmiCalculatorModal
          car={emiVideo}
          onClose={() => setEmiVideo(null)}
          dark={dark}
        />
      )}

      {/* ADD VIDEO MODAL DIALOG */}
      {isAddModalOpen && (
        <AddVideoModal
          onClose={() => setIsAddModalOpen(false)}
          onVideoAdded={handleVideoAdded}
          dark={dark}
        />
      )}

    </div>
  );
}
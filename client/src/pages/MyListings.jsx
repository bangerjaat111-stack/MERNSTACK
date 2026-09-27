import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext.jsx';
import { showSuccessToast, showErrorToast } from '../components/Notification/Tost';
import axios from 'axios';
import { API_URL } from '../config/api.js';
import {
  RiCarLine, RiPriceTag3Line, RiDeleteBin6Line, RiAddLine,
  RiShieldCheckLine, RiMapPinLine, RiGasStationLine, RiCompass3Line,
  RiCheckDoubleLine, RiTimeLine
} from 'react-icons/ri';

export default function MyListings() {
  const { dark } = useTheme();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true);
      if (!userId) {
        setListings([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/used-cars/my/${userId}`);
        const dataList = res.data?.listings || res.data?.data;
        if (res.data?.status && Array.isArray(dataList)) {
          setListings(dataList);
        } else {
          // Fallback call
          const legacyRes = await axios.get(`${API_URL}/user/${userId}/listings`);
          if (legacyRes.data?.status && Array.isArray(legacyRes.data?.listings)) {
            setListings(legacyRes.data.listings);
          }
        }
      } catch (err) {
        console.error('Failed to fetch user listings:', err);
        try {
          const legacyRes = await axios.get(`${API_URL}/user/${userId}/listings`);
          if (legacyRes.data?.status && Array.isArray(legacyRes.data?.listings)) {
            setListings(legacyRes.data.listings);
          }
        } catch (e) {}
      } finally {
        setLoading(false);
      }
    };
    fetchUserListings();
  }, [userId]);

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this car listing?')) return;
    try {
      await axios.delete(`${API_URL}/used-cars/${listingId}`).catch(() => {});
      if (userId) {
        await axios.delete(`${API_URL}/user/${userId}/listings/${listingId}`).catch(() => {});
      }
      setListings((prev) => prev.filter((item) => String(item._id || item.id) !== String(listingId)));
      showSuccessToast('Car listing deleted successfully!');
    } catch (err) {
      showErrorToast('Failed to delete listing');
    }
  };

  const getStatusBadge = (status) => {
    const st = (status || 'Approved').toLowerCase();
    if (st === 'pending') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-extrabold uppercase flex items-center gap-1">
          <RiTimeLine size={12} /> Pending Review
        </span>
      );
    }
    if (st === 'sold') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 text-[10px] font-extrabold uppercase flex items-center gap-1">
          <RiCheckDoubleLine size={12} /> Sold
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-500 border border-green-500/30 text-[10px] font-extrabold uppercase flex items-center gap-1">
        <RiShieldCheckLine size={12} /> Approved
      </span>
    );
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
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 ${textHi}`}>
              <RiCarLine className="text-red-500" /> My Car Listings
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${textSb}`}>
              Manage your posted vehicles, check review status &amp; seller leads.
            </p>
          </div>

          <Link to="/sell" className="no-underline">
            <button className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg border-none cursor-pointer ${gradBtn}`}>
              <RiAddLine size={18} /> Sell Another Car
            </button>
          </Link>
        </div>

        {/* LISTINGS CONTENT */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`h-32 rounded-2xl animate-pulse ${dark ? 'bg-white/5' : 'bg-slate-200'}`} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${border} ${cardBg} space-y-4`}>
            <RiCarLine size={48} className="mx-auto text-slate-500" />
            <h3 className={`text-lg font-bold ${textHi}`}>You haven't posted any car listings yet</h3>
            <p className={`text-xs ${textSb} max-w-md mx-auto`}>
              Get free doorstep inspection, verified market valuation, and sell your car within 24 hours.
            </p>
            <Link to="/sell" className="inline-block no-underline">
              <button className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}>
                Post Car For Sale Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((item) => {
              const displayImg = item.img || item.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop';
              const title = item.title || `${item.brand} ${item.model}`;

              return (
                <div
                  key={item._id || item.id}
                  className={`p-4 sm:p-5 rounded-2xl border ${border} ${cardBg} shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-lg`}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <img
                      src={displayImg}
                      alt={title}
                      className="w-full sm:w-36 h-24 object-cover rounded-xl shrink-0 bg-black/40"
                    />

                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        {getStatusBadge(item.status)}
                        {item.year && (
                          <span className="text-[10px] font-bold text-slate-400">
                            Reg: {item.year}
                          </span>
                        )}
                      </div>

                      <h3 className={`font-extrabold text-base ${textHi}`}>{title}</h3>
                      <p className="text-sm font-extrabold text-red-500">{item.price}</p>
                      
                      <p className={`text-xs ${textSb} flex items-center justify-center sm:justify-start gap-3 pt-1`}>
                        {item.km && <span>{item.km}</span>}
                        {item.fuel && <span>· {item.fuel}</span>}
                        {item.city && <span>· {item.city}</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                    <Link to={`/used-cars/${item._id || item.id}`} className="no-underline">
                      <button className={`w-full px-4 py-2 rounded-xl text-xs font-bold border ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-100'} cursor-pointer`}>
                        View Detail
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteListing(item._id || item.id)}
                      className="flex-1 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors border-none cursor-pointer flex items-center justify-center gap-1.5"
                      title="Delete Listing"
                    >
                      <RiDeleteBin6Line size={16} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

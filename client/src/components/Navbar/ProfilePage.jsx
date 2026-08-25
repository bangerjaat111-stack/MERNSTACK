import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/DataContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../Notification/Tost';
import {
  RiUser3Line, RiMailLine, RiShieldCheckLine, RiEdit2Line,
  RiHeartLine, RiCarLine, RiSettings4Line, RiLogoutBoxRLine,
  RiCheckDoubleLine, RiKey2Line, RiCalendarEventLine
} from 'react-icons/ri';

export default function ProfilePage() {
  const { dark } = useTheme();
  const { signin, setsignin } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', gender: '' });

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userId}`);
        if (res.data?.status && res.data?.data) {
          setUser(res.data.data);
          setFormData({ name: res.data.data.name || '', gender: res.data.data.gender || '' });
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/user/${userId}`, formData);
      if (res.data?.status) {
        showSuccessToast('Profile updated successfully!');
        setUser(res.data.data);
        setEditMode(false);
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userid');
    setsignin(false);
    showSuccessToast('Signed out successfully');
    navigate('/signin');
  };

  // Theme styling tokens
  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';
  const gradText = dark
    ? 'bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent';

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* TOP PROFILE BANNER */}
        <div className={`relative overflow-hidden rounded-3xl border ${border} ${cardBg} p-6 sm:p-8 shadow-xl`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 ${dark ? 'border-red-600/40' : 'border-amber-500/40'} shadow-lg`}
              />
              <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 ${dark ? 'bg-green-500 border-[#0D0F16]' : 'bg-green-500 border-white'}`} />
            </div>

            <div className="text-center sm:text-left flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${textHi}`}>
                  {user?.name || 'Guest User'}
                </h1>
                {user?.verification?.user?.isVerify && (
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${dark ? 'bg-green-900/30 text-green-400 border border-green-700/40' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    <RiShieldCheckLine size={13} /> Verified Member
                  </span>
                )}
              </div>
              <p className={`text-sm flex items-center justify-center sm:justify-start gap-2 ${textSb}`}>
                <RiMailLine size={16} /> {user?.email || 'Not logged in'}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <span className={`px-3 py-1 rounded-full border ${dark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  Gender: <strong className="capitalize">{user?.gender || 'N/A'}</strong>
                </span>
                <span className={`px-3 py-1 rounded-full border ${dark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  Role: <strong>Premium Buyer</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${dark ? 'border-red-900/30 text-red-400 hover:bg-red-900/20' : 'border-amber-500/30 text-amber-700 hover:bg-amber-50'}`}
              >
                <RiEdit2Line size={16} /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 cursor-pointer transition-all border-none"
              >
                <RiLogoutBoxRLine size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* EDIT PROFILE FORM MODAL / SECTION */}
        {editMode && (
          <form onSubmit={handleUpdate} className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 animate-fadeIn`}>
            <h3 className={`text-lg font-bold ${textHi}`}>Update Profile Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-sm`}
                  required
                />
              </div>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-sm`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border ${dark ? 'border-white/10 text-white/60' : 'border-slate-200 text-slate-500'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-none ${gradBtn}`}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
          {[
            { id: 'profile', label: 'My Overview', icon: RiUser3Line },
            { id: 'saved', label: 'Saved Cars (3)', icon: RiHeartLine },
            { id: 'listings', label: 'My Listings (1)', icon: RiCarLine },
            { id: 'security', label: 'Account Security', icon: RiKey2Line },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border-none ${
                  active
                    ? gradBtn
                    : dark
                    ? 'bg-white/5 text-white/60 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 p-6 rounded-2xl border ${border} ${cardBg} space-y-6`}>
              <h3 className={`text-lg font-bold ${textHi}`}>Activity & Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Test Drives', val: '2 Booked' },
                  { title: 'Saved Searches', val: '5 Active' },
                  { title: 'Offers Made', val: '1 Pending' },
                ].map((s, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <p className={`text-xs font-semibold ${textSb}`}>{s.title}</p>
                    <p className={`text-base font-extrabold mt-1 ${gradText}`}>{s.val}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <h4 className={`text-sm font-bold ${textHi}`}>Recent Account Activity</h4>
                <div className={`p-3.5 rounded-xl border ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-100'} flex items-center justify-between text-xs`}>
                  <span className={textHi}>Logged in from Gurgaon, Haryana</span>
                  <span className={textSb}>Today, 12:30 PM</span>
                </div>
                <div className={`p-3.5 rounded-xl border ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-100'} flex items-center justify-between text-xs`}>
                  <span className={textHi}>Saved car "Tata Nexon EV Max" to wishlist</span>
                  <span className={textSb}>Yesterday</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4`}>
              <h3 className={`text-lg font-bold ${textHi}`}>Quick Links</h3>
              <div className="space-y-2">
                <Link to="/sell" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  + List a Car for Sale
                </Link>
                <Link to="/deals" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  🔥 View Hot Deals
                </Link>
                <Link to="/setting" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  ⚙️ Preferences & Settings
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Tata Nexon EV Max', price: '₹14.49 Lakh', fuel: 'Electric', img: 'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp' },
              { name: 'Mahindra XUV700 AX7', price: '₹21.50 Lakh', fuel: 'Diesel', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJf515PddNnEAY5MrtqKHlREy7yRKHCt_Zfw&s' },
              { name: 'Hyundai Creta SX(O)', price: '₹13.45 Lakh', fuel: 'Petrol', img: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg' },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-md`}>
                <img src={c.img} alt={c.name} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <h4 className={`font-bold text-base ${textHi}`}>{c.name}</h4>
                  <p className={`text-sm font-extrabold ${gradText}`}>{c.price}</p>
                  <p className={`text-xs ${textSb}`}>{c.fuel}</p>
                  <div className="flex gap-2 pt-2">
                    <Link to="/new-cars" className={`flex-1 text-center py-2 rounded-xl text-xs font-bold no-underline ${gradBtn}`}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'listings' && (
          <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4`}>
            <h3 className={`text-lg font-bold ${textHi}`}>Your Cars Posted for Sale</h3>
            <div className={`p-4 rounded-xl border ${dark ? 'border-white/10 bg-white/4' : 'border-slate-200 bg-slate-50'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div>
                <h4 className={`font-bold text-base ${textHi}`}>2021 Honda City ZX (CVT)</h4>
                <p className={`text-xs ${textSb}`}>Gurgaon · 45,000 km · Asking ₹8,50,000</p>
                <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300">
                  Active Listing
                </span>
              </div>
              <div className="flex gap-2">
                <Link to="/sell" className={`px-4 py-2 rounded-xl text-xs font-bold no-underline border ${dark ? 'border-white/20 text-white' : 'border-slate-300 text-slate-800'}`}>
                  Manage Listing
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-6 max-w-xl`}>
            <h3 className={`text-lg font-bold ${textHi}`}>Account Security & Password</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>Current Password</label>
                <input type="password" placeholder="••••••••" className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`} />
              </div>
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>New Password</label>
                <input type="password" placeholder="••••••••" className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`} />
              </div>
              <button onClick={() => showSuccessToast("Password update feature enabled.")} className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider border-none cursor-pointer ${gradBtn}`}>
                Update Password
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

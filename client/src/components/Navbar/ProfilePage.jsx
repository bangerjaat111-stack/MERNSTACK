import React, { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/DataContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/api.js';
import { showSuccessToast, showErrorToast } from '../Notification/Tost';
import {
  RiUser3Line, RiMailLine, RiShieldCheckLine, RiEdit2Line,
  RiHeartLine, RiCarLine, RiLogoutBoxRLine,
  RiKey2Line
} from 'react-icons/ri';

export default function ProfilePage() {
  const { dark } = useTheme();
  const { signin, setsignin } = useAuth();
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', gender: '' });

  // User personal data state
  const [userListings, setUserListings] = useState([]);
  const [userTestDrives, setUserTestDrives] = useState([]);
  const [userOffers, setUserOffers] = useState([]);

  // Change password form state
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passLoading, setPassLoading] = useState(false);

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const [profileRes, usedCarsRes] = await Promise.all([
          axios.get(`${API_URL}/user/${userId}`),
          axios.get(`${API_URL}/used-cars/my/${userId}`).catch(() => axios.get(`${API_URL}/user/${userId}/listings`)).catch(() => ({ data: { listings: [] } }))
        ]);

        if (profileRes.data?.status && profileRes.data?.data) {
          setUser(profileRes.data.data);
          setFormData({ name: profileRes.data.data.name || '', gender: profileRes.data.data.gender || '' });
        }
        const listingsData = usedCarsRes.data?.listings || usedCarsRes.data?.data || [];
        if (Array.isArray(listingsData)) {
          setUserListings(listingsData);
        }
      } catch (err) {
        console.error("Failed to load user profile or listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this car listing?')) return;
    try {
      await axios.delete(`${API_URL}/used-cars/${listingId}`).catch(() => { });
      await axios.delete(`${API_URL}/user/${userId}/listings/${listingId}`).catch(() => { });
      showSuccessToast('Car listing deleted successfully!');
      setUserListings((prev) => prev.filter((item) => String(item._id || item.id) !== String(listingId)));
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || 'Failed to delete listing');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/user/${userId}`, formData);
      if (res.data?.status) {
        showSuccessToast('Profile updated successfully!');
        setUser(res.data.data);
        setEditMode(false);
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passForm.currentPassword || !passForm.newPassword) {
      showErrorToast('Please enter both current and new password');
      return;
    }
    if (passForm.newPassword.length < 8) {
      showErrorToast('New password must be at least 8 characters');
      return;
    }
    if (passForm.newPassword !== passForm.confirmPassword) {
      showErrorToast('New passwords do not match');
      return;
    }
    setPassLoading(true);
    try {
      const res = await axios.put(`${API_URL}/user/${userId}/change-password`, {
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword
      });
      if (res.data?.status) {
        showSuccessToast(res.data.msg || 'Password updated successfully!');
        setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userid');
    localStorage.removeItem('autosyntax_wishlist');
    clearWishlist();
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
                  Role: <strong>Premium Buyer & Seller</strong>
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
            { id: 'saved', label: `Saved Cars (${wishlist ? wishlist.length : 0})`, icon: RiHeartLine },
            { id: 'listings', label: `My Listings (${userListings.length})`, icon: RiCarLine },
            { id: 'security', label: 'Account Security', icon: RiKey2Line },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border-none ${active
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
                  { title: 'Saved Wishlist', val: `${wishlist ? wishlist.length : 0} Items`, tab: 'saved' },
                  { title: 'Offers Made', val: `${(user?.offers || []).length || 1} Offers`, tab: null },
                ].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => s.tab && setActiveTab(s.tab)}
                    className={`p-4 rounded-xl border transition-all ${s.tab ? 'cursor-pointer hover:border-amber-500/40 hover:scale-[1.02]' : ''} ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <p className={`text-xs font-semibold ${textSb}`}>{s.title}</p>
                    <p className={`text-base font-extrabold mt-1 ${gradText}`}>{s.val}</p>
                  </div>
                ))}
              </div>


            </div>

            <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4`}>
              <h3 className={`text-lg font-bold ${textHi}`}>Quick Links</h3>
              <div className="space-y-2">
                <Link to="/sell" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  + List a Car for Sale
                </Link>
                <Link to="/news" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  📰 Car News & Reviews
                </Link>
                <Link to="/setting" className={`block p-3 rounded-xl border text-xs font-bold uppercase no-underline transition-all ${dark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-800 hover:bg-slate-100'}`}>
                  ⚙️ Preferences & Settings
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          wishlist && wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlist.map((c, i) => {
                const carImage = c.thumbnail || c.thumbnailUrl || c.img || c.image || (Array.isArray(c.images) && c.images[0]) || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop';
                const carTitle = c.name || c.title || 'Car';
                const carId = c.id || c._id;
                const isUsedCar = c.trans || c.owner || c.km || (carId && (typeof carId === 'number' || String(carId).length < 10));
                const detailLink = isUsedCar && carId ? `/used-cars/${carId}` : `/new-cars?search=${encodeURIComponent(carTitle)}`;

                return (
                  <div key={i} className={`rounded-2xl border ${border} ${cardBg} overflow-hidden shadow-md flex flex-col justify-between group`}>
                    <img
                      src={carImage}
                      alt={carTitle}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className={`font-bold text-base ${textHi}`}>{carTitle}</h4>
                        <p className={`text-sm font-extrabold ${gradText}`}>
                          {typeof c.price === 'number' ? `₹${c.price} Lakh` : (c.price || 'Price Available')}
                        </p>
                        <p className={`text-xs ${textSb}`}>{c.fuel || c.brand || 'Verified Car'}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Link to={detailLink} className={`flex-1 text-center py-2 rounded-xl text-xs font-bold no-underline ${gradBtn}`}>
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleWishlist(c)}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all border-none cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`p-12 text-center rounded-2xl border ${border} ${cardBg} space-y-3`}>
              <RiHeartLine size={48} className={`mx-auto ${textSb}`} />
              <h3 className={`text-lg font-bold ${textHi}`}>Your Wishlist is Empty</h3>
              <p className={`text-xs ${textSb}`}>You haven't saved any cars to your wishlist yet.</p>
              <Link to="/new-cars" className={`inline-block px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider no-underline ${gradBtn}`}>
                Explore Cars Now
              </Link>
            </div>
          )
        )}

        {activeTab === 'listings' && (
          <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-6`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold ${textHi}`}>Your Personal Car Listings</h3>
              <Link to="/sell" className={`px-4 py-2 rounded-xl text-xs font-bold uppercase no-underline ${gradBtn}`}>
                + Post New Car
              </Link>
            </div>

            {userListings && userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userListings.map((item) => {
                  const itemId = item._id || item.id;
                  const statusStr = (item.status || 'Approved').toLowerCase();
                  return (
                    <div key={itemId} className={`p-4 rounded-xl border ${dark ? 'border-white/10 bg-white/4' : 'border-slate-200 bg-slate-50'} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm`}>
                      <img src={item.img || item.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop'} alt={item.title} className="w-full sm:w-28 h-20 object-cover rounded-lg" />
                      <div className="flex-1 text-center sm:text-left space-y-1">
                        <h4 className={`font-bold text-base ${textHi}`}>{item.title}</h4>
                        <p className={`text-xs ${textSb}`}>{item.city} · {item.km} · Asking {item.price}</p>
                        {statusStr === 'pending' ? (
                          <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            Pending Review
                          </span>
                        ) : statusStr === 'sold' ? (
                          <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                            Sold
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
                            Approved
                          </span>
                        )}
                      </div>
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <Link to={`/used-cars/${itemId}`} className="no-underline">
                          <button className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold border ${dark ? 'border-white/10 text-white' : 'border-slate-300 text-slate-700'} cursor-pointer`}>
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteListing(itemId)}
                          className="flex-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all border-none cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`p-8 text-center rounded-xl border ${border}`}>
                <RiCarLine size={40} className={`mx-auto ${textSb} mb-2`} />
                <p className={`text-sm font-bold ${textHi}`}>No cars listed for sale yet</p>
                <p className={`text-xs ${textSb} mt-1 mb-4`}>List your car for sale in less than 2 minutes and get instant buyer inquiries.</p>
                <Link to="/sell" className={`inline-block px-5 py-2 rounded-xl text-xs font-bold uppercase no-underline ${gradBtn}`}>
                  Post Car for Sale
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-6 max-w-xl`}>
            <h3 className={`text-lg font-bold ${textHi}`}>Account Security & Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passForm.currentPassword}
                  onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`}
                />
              </div>
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>New Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={passForm.newPassword}
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`}
                />
              </div>
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${textSb}`}>Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none`}
                />
              </div>
              <button
                type="submit"
                disabled={passLoading}
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider border-none cursor-pointer disabled:opacity-50 ${gradBtn}`}
              >
                {passLoading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

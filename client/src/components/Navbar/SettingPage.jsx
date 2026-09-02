import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { showSuccessToast, showErrorToast } from '../Notification/Tost';
import axios from 'axios';
import { API_URL } from '../../config/api.js';
import { RiNotification3Line, RiShieldKeyholeLine, RiLockPasswordLine, RiCheckLine } from 'react-icons/ri';

export default function SettingPage() {
  const { dark } = useTheme();

  // Load persistent notification preferences from localStorage
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('autosyntax_notifications');
      return saved ? JSON.parse(saved) : {
        emailDeals: true,
        smsAlerts: true,
        priceDrop: true,
        newsletter: false,
      };
    } catch {
      return { emailDeals: true, smsAlerts: true, priceDrop: true, newsletter: false };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('autosyntax_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notification settings:', e);
    }
  }, [notifications]);

  const toggleNotif = (key, label) => {
    setNotifications((prev) => {
      const nextVal = !prev[key];
      const updated = { ...prev, [key]: nextVal };
      showSuccessToast(`${label}: ${nextVal ? 'Enabled' : 'Disabled'}`);
      return updated;
    });
  };

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${textHi}`}>
            Account Settings & Password
          </h1>
          <p className={`text-sm mt-1 ${textSb}`}>
            Update your login security password and configure real-time notification alerts.
          </p>
        </div>

        {/* CHANGE PASSWORD CARD */}
        <ChangePasswordSection dark={dark} border={border} cardBg={cardBg} textHi={textHi} textSb={textSb} gradBtn={gradBtn} />

        {/* NOTIFICATIONS & ALERTS CARD */}
        <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 shadow-md`}>
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
              <RiNotification3Line size={20} />
            </span>
            <div>
              <h3 className={`font-bold text-base ${textHi}`}>Notifications & Alerts</h3>
              <p className={`text-xs ${textSb}`}>Configure automatic email, price drop, and SMS alert preferences</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { key: 'emailDeals', label: 'Email Alerts on Hot Car Deals', desc: 'Receive instant notifications when hot car deals and discounts drop.' },
              { key: 'smsAlerts', label: 'SMS & WhatsApp Inquiry Alerts', desc: 'Get immediate SMS updates when sellers or buyers reach out.' },
              { key: 'priceDrop', label: 'Wishlist Price Drop Notifications', desc: 'Alert me instantly when a car saved in my wishlist drops in price.' },
              { key: 'newsletter', label: 'AutoSyntax Weekly Auto Digest', desc: 'Curated Indian automotive news, new launches, and expert reviews.' },
            ].map((item) => (
              <div key={item.key} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="pr-4">
                  <h4 className={`text-xs font-bold ${textHi}`}>{item.label}</h4>
                  <p className={`text-[11px] mt-0.5 ${textSb}`}>{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={() => toggleNotif(item.key, item.label)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ChangePasswordSection({ dark, border, cardBg, textHi, textSb, gradBtn }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userid');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!userId) {
      return showErrorToast('Please sign in to update your password.');
    }
    if (newPassword !== confirmPassword) {
      return showErrorToast('New password and confirm password do not match.');
    }
    if (newPassword.length < 8) {
      return showErrorToast('New password must be at least 8 characters long.');
    }

    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/user/${userId}/change-password`, {
        currentPassword,
        newPassword
      });
      if (res.data?.status) {
        showSuccessToast(res.data?.msg || 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showErrorToast(res.data?.msg || 'Failed to update password');
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || 'Failed to update password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 shadow-md`}>
      <div className="flex items-center gap-3">
        <span className={`p-2.5 rounded-xl ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
          <RiLockPasswordLine size={20} />
        </span>
        <div>
          <h3 className={`font-bold text-base ${textHi}`}>Change Account Password</h3>
          <p className={`text-xs ${textSb}`}>Enter your current password to set a new password</p>
        </div>
      </div>

      <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-2">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-xs font-medium focus:ring-2 focus:ring-red-500/40`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>New Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-xs font-medium focus:ring-2 focus:ring-red-500/40`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Confirm New Password</label>
            <input
              type="password"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-xs font-medium focus:ring-2 focus:ring-red-500/40`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer border-none transition-all shadow-md ${gradBtn} ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
        >
          {loading ? 'Updating Password...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

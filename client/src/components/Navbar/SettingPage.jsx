import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { showSuccessToast } from '../Notification/Tost';
import { RiSunLine, RiMoonLine, RiNotification3Line, RiShieldKeyholeLine, RiGlobalLine, RiCheckLine } from 'react-icons/ri';

export default function SettingPage() {
  const { dark, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    emailDeals: true,
    smsAlerts: false,
    priceDrop: true,
    newsletter: true,
  });

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  const toggleNotif = (key) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showSuccessToast('Preferences updated');
      return updated;
    });
  };

  return (
    <div className={`min-h-screen ${bg} py-10 px-4 transition-colors duration-300 font-sans`}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${textHi}`}>
            Account & Application Settings
          </h1>
          <p className={`text-sm mt-1 ${textSb}`}>
            Manage your interface appearance, notifications, and security preferences.
          </p>
        </div>

        {/* APPEARANCE / THEME */}
        <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 shadow-md`}>
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
              {dark ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
            </span>
            <div>
              <h3 className={`font-bold text-base ${textHi}`}>Appearance Theme</h3>
              <p className={`text-xs ${textSb}`}>Choose between Dark Red mode and Light Amber mode</p>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={dark ? undefined : toggleTheme}
              className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all cursor-pointer ${
                dark ? 'bg-red-900/20 border-red-600 text-white' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <RiMoonLine size={16} /> Dark Mode {dark && <RiCheckLine size={16} className="text-red-500" />}
            </button>
            <button
              onClick={!dark ? undefined : toggleTheme}
              className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all cursor-pointer ${
                !dark ? 'bg-amber-100 border-amber-500 text-amber-950' : 'bg-white/5 border-white/10 text-white/60'
              }`}
            >
              <RiSunLine size={16} /> Light Mode {!dark && <RiCheckLine size={16} className="text-amber-600" />}
            </button>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCES */}
        <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 shadow-md`}>
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
              <RiNotification3Line size={20} />
            </span>
            <div>
              <h3 className={`font-bold text-base ${textHi}`}>Notifications & Alerts</h3>
              <p className={`text-xs ${textSb}`}>Configure email and mobile alert notifications</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { key: 'emailDeals', label: 'Email Alerts on Hot Car Deals', desc: 'Receive weekly notifications on price drops and flash sales.' },
              { key: 'smsAlerts', label: 'SMS & WhatsApp Updates', desc: 'Get immediate seller responses directly on your mobile number.' },
              { key: 'priceDrop', label: 'Wishlist Price Drop Notifications', desc: 'Alert me instantly when a car in my saved list reduces price.' },
              { key: 'newsletter', label: 'AutoSyntax Weekly Auto Digest', desc: 'Curated automobile news, upcoming launches, and expert reviews.' },
            ].map((item) => (
              <div key={item.key} className={`flex items-center justify-between p-4 rounded-xl border ${dark ? 'bg-white/4 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <h4 className={`text-xs font-bold ${textHi}`}>{item.label}</h4>
                  <p className={`text-[11px] mt-0.5 ${textSb}`}>{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotif(item.key)}
                  className="h-5 w-5 rounded border-slate-300 accent-red-600 dark:accent-red-600 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* REGIONAL & PRIVACY */}
        <div className={`p-6 rounded-2xl border ${border} ${cardBg} space-y-4 shadow-md`}>
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
              <RiGlobalLine size={20} />
            </span>
            <div>
              <h3 className={`font-bold text-base ${textHi}`}>Region & Currency</h3>
              <p className={`text-xs ${textSb}`}>Default location and currency settings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Preferred Location</label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}>
                <option>Gurgaon / NCR</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bengaluru</option>
                <option>Pune</option>
                <option>Hyderabad</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${textSb}`}>Currency Display</label>
              <select className={`w-full px-4 py-2.5 rounded-xl border ${dark ? 'bg-[#10101c] border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'} outline-none text-xs font-semibold`}>
                <option>INR (₹ Lakh / Crore)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

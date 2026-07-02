import React, { useState } from 'react';
import { useFormik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { validationSchema } from './Validation.jsx';
import car from '../../assets/car.png';
import { useTheme } from '../../Context/ThemeContext.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../Notification/Tost.jsx';

import {
  FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaChevronDown,
  FaGoogle, FaApple, FaArrowRight, FaCheckCircle, FaBolt,
  FaShieldAlt, FaRocket, FaCar,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { MdVerified } from 'react-icons/md';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 160, damping: 20 },
  },
};

const floatAnim = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Signup() {
  const { dark } = useTheme();
  const Navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', gender: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        
        setIsLoading(true);
        const response = await axios.post('http://localhost:8080/register', values);
        const id = response?.data?.data?._id || response?.data?._id;
        const verify = response?.data?.data?.verification?.user?.isVerify;
        const message = response?.data?.msg || 'Account created successfully!';
        console.log(response?.data?.msg)
        if (response.status === 200 || response.status === 201) {
          
          showSuccessToast(message);
          setUserId(id);
          setSubmitted(true);
          setTimeout(() => {
            if (id) Navigate(`/verify_otp/${response.data.id}`);
            else if (!verify) Navigate(`/verify_otp/${response.data.id}`); 
            else {
              showErrorToast(error?.response?.data?.msg || 'server error')
            }
          }, 2000);
        
        }
      } 
      
      catch (error) {
        if( (error?.response?.data?.msg )=='Account Already verify pls log In'){
          showErrorToast(error?.response?.data?.msg  || 'internal server error')
          Navigate('/signin')
        }
        else{
        showErrorToast(error?.response?.data?.msg || error?.response?.data?.data?.msg || "internal server error")
      }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const errBorder = (f) =>
    formik.touched[f] && formik.errors[f]
      ? 'border-red-500 focus:ring-red-400/30'
      : dark
      ? 'border-white/10 focus:ring-[#E8001D]/30'
      : 'border-slate-200 focus:ring-[#E8001D]/25';

  const base =
    'w-full rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none border-2 transition-all duration-300 focus:ring-4 font-[Sora] font-medium tracking-wide caret-[#E8001D]';

  /* ── theme tokens (Tailwind only) ─────────────────────────── */
  const page = dark ? 'bg-[#06060c]' : 'bg-slate-50';
  const card = dark ? 'bg-[#0d0d18] border-white/[0.07]' : 'bg-white border-slate-200/80';
  const left = dark ? 'bg-[#08080f]' : 'bg-slate-100';
  const inp = dark ? 'bg-white/5 text-white placeholder-white/20' : 'bg-slate-50 text-slate-900 placeholder-slate-400';
  const heading = dark ? 'text-white' : 'text-slate-900';
  const sub = dark ? 'text-slate-400' : 'text-slate-500';
  const lbl = dark ? 'text-slate-400' : 'text-slate-500';
  const pill = dark ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-white border border-slate-200 text-slate-600';
  const divLine = dark ? 'bg-white/8' : 'bg-slate-200';
  const optBg = dark ? 'bg-[#10101c]' : 'bg-white';
  const iconC = 'text-[#E8001D]';

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${page} font-[Sora]`}
      style={{ fontFamily: "'Sora', 'Space Grotesk', sans-serif" }}
    >
      {/* Google Fonts import via link tag workaround — injected into head via effect */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Bebas+Neue&family=Oxanium:wght@400;600;700;800&display=swap');`}</style>

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] ${dark ? 'bg-red-700/20' : 'bg-red-400/10'}`}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] ${dark ? 'bg-orange-600/15' : 'bg-orange-300/10'}`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        className={`relative w-full max-w-[1060px] flex flex-col md:flex-row overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500 ${card}`}
      >
        {/* Top shimmer line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'circOut' }}
          className="absolute top-0 left-0 right-0 h-[3px] z-10 bg-gradient-to-r from-transparent via-[#E8001D] to-transparent origin-left"
        />

        {/* ══ LEFT PANEL ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className={`hidden md:flex md:w-[46%] relative flex-col overflow-hidden ${left}`}
        >
          {/* Car image — untouched */}
          <div className="absolute inset-0 overflow-hidden">
            <img src={car} alt="AutoSyntax" className="w-full h-full object-cover" />
          </div>

          {/* Overlay badge */}
        
        </motion.div>

        {/* ══ RIGHT PANEL — FORM ═══════════════════════════════════ */}
        <div className="w-full md:w-[54%] flex flex-col justify-center px-8 py-10 md:px-12 lg:px-14">
          <AnimatePresence mode="wait">

            {/* ── SUCCESS STATE ────────────────────────────────────── */}
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                className="flex flex-col items-center text-center py-14"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 240, delay: 0.1 }}
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#E8001D]/20 to-[#FF3020]/10 border-2 border-[#E8001D]/40 shadow-lg shadow-[#E8001D]/10"
                >
                  <FaRocket className="text-[38px] text-[#E8001D]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8001D]/10 border border-[#E8001D]/20 text-[#E8001D] text-[10px] font-bold tracking-[3px] font-[Oxanium] uppercase mb-4">
                    <HiSparkles /> Access Granted
                  </span>
                  <h3 className={`font-[Oxanium] text-2xl font-extrabold tracking-[3px] uppercase ${heading} mt-2`}>
                    Welcome to AutoSyntax
                  </h3>
                
                  <p className={`text-xs mt-1 ${sub} opacity-60`}>Redirecting to OTP verification…</p>
                </motion.div>

                <Link to="/signin">
                  <motion.button
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#E8001D]/40 text-[#E8001D] text-xs font-bold tracking-[2px] font-[Oxanium] uppercase hover:bg-[#E8001D]/10 transition-all duration-300"
                  >
                    Go to Sign In <FaArrowRight />
                  </motion.button>
                </Link>
              </motion.div>

            ) : (

              /* ── FORM STATE ──────────────────────────────────────── */
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                {/* Header */}
                <div className="mb-7">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-3"
                  >
                  
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className={`font-[Oxanium] text-[26px] font-extrabold tracking-[3px] uppercase leading-tight ${heading}`}
                  >
                    Join AutoSyntax
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.36 }}
                    className={`text-[11px] font-[Sora] tracking-[1px] mt-1.5 ${sub}`}
                  >
                    Create your account and experience next-level luxury
                  </motion.p>
                </div>
        
              
               

                <motion.form
                  variants={container}
                  initial="hidden"
                  animate="show"
                  onSubmit={formik.handleSubmit}
                >
                  {/* Social Buttons */}
                  <motion.div variants={item} className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <FaGoogle />, label: 'Google', color: 'text-[#4285F4]' },
                      { icon: <FaApple />, label: 'Apple', color: dark ? 'text-white' : 'text-slate-900' },
                    ].map((s) => (
                      <motion.button
                        key={s.label}
                        type="button"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border font-[Sora] ${pill}`}
                      >
                        <span className={`text-base ${s.color}`}>{s.icon}</span>
                        {s.label}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Divider */}
                  <motion.div variants={item} className="flex items-center gap-3 mb-5">
                    <div className={`flex-grow h-px ${divLine}`} />
                    <span className={`text-[10px] font-bold tracking-[3px] font-[Oxanium] uppercase ${sub}`}>
                      or register with email
                    </span>
                    <div className={`flex-grow h-px ${divLine}`} />
                  </motion.div>

                  {/* Full Name */}
                  <motion.div variants={item} className="mb-3">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 font-[Oxanium] ${lbl}`}>
                      Full Name
                    </label>
                    <div className="relative group">
                      <FaUser className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconC} transition-opacity duration-200`} />
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Arjun Sharma"
                        className={`${base} ${inp} ${errBorder('name')}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        disabled={isLoading}
                      />
                    </div>
                    <AnimatePresence>
                      {formik.touched.name && formik.errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1 text-[10px] font-semibold tracking-wide text-red-500 font-[Sora]"
                        >
                          {formik.errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={item} className="mb-3">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 font-[Oxanium] ${lbl}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconC}`} />
                      <input
                        type="email"
                        name="email"
                        placeholder="arjun@example.com"
                        className={`${base} ${inp} ${errBorder('email')}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        disabled={isLoading}
                      />
                    </div>
                    <AnimatePresence>
                      {formik.touched.email && formik.errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1 text-[10px] font-semibold tracking-wide text-red-500 font-[Sora]"
                        >
                          {formik.errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Password Row */}
                  <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { field: 'password', label: 'Password', show: showPw, toggle: () => setShowPw((v) => !v) },
                      { field: 'confirmPassword', label: 'Confirm', show: showCpw, toggle: () => setShowCpw((v) => !v) },
                    ].map(({ field, label: lbl2, show, toggle }) => (
                      <div key={field}>
                        <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 font-[Oxanium] ${lbl}`}>
                          {lbl2}
                        </label>
                        <div className="relative">
                          <FaLock className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconC}`} />
                          <input
                            type={show ? 'text' : 'password'}
                            name={field}
                            placeholder="••••••••"
                            className={`${base} pr-10 ${inp} ${errBorder(field)}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field]}
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={toggle}
                            disabled={isLoading}
                            className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs transition-colors duration-200 ${dark ? 'text-white/30 hover:text-white/60' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            {show ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {formik.touched[field] && formik.errors[field] && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1 text-[10px] font-semibold tracking-wide text-red-500 font-[Sora]"
                            >
                              {formik.errors[field]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>

                  {/* Gender */}
                  <motion.div variants={item} className="mb-6">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 font-[Oxanium] ${lbl}`}>
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        className={`${base} appearance-none pl-4 ${inp} ${errBorder('gender')} ${optBg}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                        disabled={isLoading}
                      >
                        <option value="" disabled className="text-slate-400">Select gender</option>
                        <option value="male" className="text-black">Male</option>
                        <option value="female" className="text-black">Female</option>
                        <option value="other" className="text-black">Other</option>
                      </select>
                      <FaChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs ${dark ? 'text-white/30' : 'text-slate-400'}`} />
                    </div>
                    <AnimatePresence>
                      {formik.touched.gender && formik.errors.gender && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-1 text-[10px] font-semibold tracking-wide text-red-500 font-[Sora]"
                        >
                          {formik.errors.gender}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={item}>
                    <motion.button
                      whileHover={!isLoading ? { y: -3, scale: 1.01, boxShadow: '0 20px 40px -10px rgba(232,0,29,0.5)' } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-2xl font-extrabold uppercase text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 tracking-[3px] font-[Oxanium] bg-gradient-to-r from-[#C8001A] via-[#E8001D] to-[#FF3020] shadow-lg shadow-[#E8001D]/25 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating Account…
                        </>
                      ) : (
                        <>
                          <FaCar className="text-sm" />
                          Create Account
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                          >
                            <FaArrowRight className="text-xs" />
                          </motion.span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>

                {/* Sign In Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className={`text-center mt-5 text-[11px] font-[Sora] tracking-wide ${sub}`}
                >
                  Already have an account?{' '}
                  <Link
                    to="/signin"
                    className="text-[#E8001D] font-bold hover:underline underline-offset-2 tracking-wide transition-all"
                  >
                    Sign In
                  </Link>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

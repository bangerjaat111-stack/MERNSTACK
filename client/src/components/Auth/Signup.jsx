import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { validationSchema } from './Validation.jsx';
import car from '../../assets/car.png';
import { useTheme } from '../../Context/ThemeContext.jsx';

import {
  FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaChevronDown,
  FaGoogle, FaApple, FaArrowRight, FaCheckCircle, FaFire,
} from 'react-icons/fa';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16 } },
};

export default function Signup() {
  const { dark } = useTheme();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', gender: '' },
    validationSchema,
    onSubmit: (values) => { console.log(values); setSubmitted(true); },
  });

  // Tailwind class helpers based on theme
  const pageBg      = dark ? 'bg-[#080810]'       : 'bg-[#F0F2F8]';
  const cardBg      = dark ? 'bg-[rgba(13,13,22,0.97)]'  : 'bg-[rgba(255,255,255,0.98)]';
  const leftBg      = dark ? 'bg-[rgba(8,8,14,0.85)]'    : 'bg-[rgba(235,237,245,0.9)]';
  const inputBg     = dark ? 'bg-white/[0.08]'    : 'bg-white';
  const inputText   = dark ? 'text-white'          : 'text-[#0A0A0C]';
  const inputPh     = dark ? 'placeholder-white/30' : 'placeholder-[rgba(60,60,80,0.38)]';
  const heading     = dark ? 'text-white'          : 'text-[#0A0A0C]';
  const subtext     = dark ? 'text-white/50'       : 'text-[rgba(30,30,55,0.55)]';
  const label       = dark ? 'text-white/50'       : 'text-[rgba(30,30,60,0.62)]';
  const cardBorder  = dark ? 'border-[rgba(232,0,29,0.22)]' : 'border-[rgba(232,0,29,0.28)]';
  const divider     = dark ? 'bg-white/[0.07]'    : 'bg-black/[0.09]';
  const socialBg    = dark ? 'bg-white/[0.05]'    : 'bg-black/[0.04]';
  const socialBorder = dark ? 'border-white/[0.11]' : 'border-black/[0.13]';
  const socialText  = dark ? 'text-[rgba(220,228,244,0.88)]' : 'text-[rgba(20,20,40,0.82)]';
  const iconColor   = dark ? 'text-[rgba(232,0,29,0.7)]' : 'text-[#C8001A]';
  const eyeColor    = dark ? 'text-white/40'       : 'text-[rgba(60,60,80,0.48)]';
  const glowL       = dark ? 'bg-[rgba(232,0,29,0.10)]' : 'bg-[rgba(232,0,29,0.06)]';
  const glowR       = dark ? 'bg-[rgba(255,60,20,0.08)]' : 'bg-[rgba(232,0,29,0.04)]';
  const cardShadow  = dark ? 'shadow-[0_32px_80px_-20px_rgba(0,0,0,0.72)]' : 'shadow-[0_24px_60px_-16px_rgba(0,0,0,0.13)]';
  const appleColor  = dark ? 'text-white'          : 'text-[#111111]';
  const optionBg    = dark ? 'bg-[#14141e]'        : 'bg-white';

  const inputBorderClass = (field) =>
    formik.touched[field] && formik.errors[field]
      ? 'border-red-500'
      : dark ? 'border-white/[0.14]' : 'border-black/[0.16]';

  const baseInput = `w-full border rounded-sm py-3 pl-10 pr-4 text-sm outline-none
    focus:ring-2 focus:ring-[#E8001D]/35 focus:shadow-[0_0_0_2px_rgba(232,0,29,0.32)]
    transition-all duration-300 font-[Rajdhani] font-semibold tracking-wide
    caret-[#E8001D]`;

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 ${pageBg} font-[Rajdhani]`}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 -left-40 w-96 h-96 rounded-full ${glowL} blur-[120px] transition-[background] duration-500`} />
        <div className={`absolute bottom-1/4 -right-40 w-96 h-96 rounded-full ${glowR} blur-[140px] transition-[background] duration-500`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className={`relative w-full max-w-[1040px] flex flex-col md:flex-row overflow-hidden transition-all duration-500
          ${cardBg} ${cardBorder} ${cardShadow} border
          [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%)]
          backdrop-blur-2xl`}
      >
        {/* Red top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-[#E8001D] to-transparent" />

        {/* ══ LEFT PANEL ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`hidden md:flex md:w-[46%] relative flex-col ${leftBg}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img src={car} alt="AutoSyntax" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* ══ RIGHT PANEL — FORM ════════════════════════════════════════════ */}
        <div className="w-full md:w-[54%] flex flex-col justify-center p-8 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-[rgba(232,0,29,0.1)] border-2 border-[rgba(232,0,29,0.4)]"
                >
                  <FaCheckCircle className="text-[36px] text-[#E8001D]" />
                </motion.div>
                <h3 className={`font-['Exo_2'] text-2xl font-extrabold tracking-[2px] uppercase ${heading}`}>
                  WELCOME TO THE AUTOSYNTAX
                </h3>
                <p className={`mt-2 text-m ${subtext}`}>Account created successfully.</p>
                <Link to="/signin">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="mt-8 flex items-center gap-2 text-sm font-bold tracking-widest text-[#E8001D]"
                  >
                    GO TO SIGN IN <FaArrowRight />
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <FaFire className="text-[#E8001D] text-[13px]" />
                    <span className="text-[10px] tracking-[4px] text-[#E8001D] uppercase font-bold">New Account</span>
                  </div>
                  <h2 className={`font-['Exo_2'] text-[26px] font-extrabold tracking-[2px] uppercase ${heading}`}>
                    Create Account
                  </h2>
                  <p className={`text-[11px] tracking-[1.5px] uppercase mt-1 ${subtext}`}>
                    Join AutoSyntax — it's free
                  </p>
                </div>

                <motion.form variants={stagger} initial="hidden" animate="show" onSubmit={formik.handleSubmit}>

                  {/* Social Buttons */}
                  <motion.div variants={rise} className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <FaGoogle />, label: 'Google', color: 'text-[#4285F4]' },
                      { icon: <FaApple />,  label: 'Apple',  color: appleColor },
                    ].map((s) => (
                      <motion.button
                        key={s.label}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold uppercase
                          tracking-[2px] transition-all duration-300 border
                          [clip-path:polygon(6px_0%,100%_0%,calc(100%_-_6px)_100%,0%_100%)]
                          ${socialBg} ${socialBorder} ${socialText}`}
                      >
                        <span className={`text-[15px] ${s.color}`}>{s.icon}</span>
                        {s.label}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Divider */}
                  <motion.div variants={rise} className="flex items-center mb-5">
                    <div className={`flex-grow h-px ${divider}`} />
                    <span className={`mx-4 text-[10px] font-bold tracking-[3px] uppercase ${subtext}`}>or with email</span>
                    <div className={`flex-grow h-px ${divider}`} />
                  </motion.div>

                  {/* Name */}
                  <motion.div variants={rise} className="mb-4">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 ${label}`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconColor}`} />
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Arjun Sharma"
                        className={`${baseInput} ${inputBg} ${inputText} ${inputPh} ${inputBorderClass('name')}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-[10px] font-semibold tracking-[1px] text-[#FF4060]">{formik.errors.name}</p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={rise} className="mb-4">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 ${label}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconColor}`} />
                      <input
                        type="email"
                        name="email"
                        placeholder="arjun@example.com"
                        className={`${baseInput} ${inputBg} ${inputText} ${inputPh} ${inputBorderClass('email')}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-[10px] font-semibold tracking-[1px] text-[#FF4060]">{formik.errors.email}</p>
                    )}
                  </motion.div>

                  {/* Password Row */}
                  <motion.div variants={rise} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { field: 'password',        label: 'Password', show: showPw,  toggle: () => setShowPw(v => !v)  },
                      { field: 'confirmPassword', label: 'Confirm',  show: showCpw, toggle: () => setShowCpw(v => !v) },
                    ].map(({ field, label: lbl, show, toggle }) => (
                      <div key={field}>
                        <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 ${label}`}>
                          {lbl}
                        </label>
                        <div className="relative">
                          <FaLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${iconColor}`} />
                          <input
                            type={show ? 'text' : 'password'}
                            name={field}
                            placeholder="••••••••"
                            className={`${baseInput} pr-10 ${inputBg} ${inputText} ${inputPh} ${inputBorderClass(field)}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values[field]}
                          />
                          <button
                            type="button"
                            onClick={toggle}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors ${eyeColor}`}
                          >
                            {show ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {formik.touched[field] && formik.errors[field] && (
                          <p className="mt-1 text-[10px] font-semibold tracking-[1px] text-[#FF4060]">{formik.errors[field]}</p>
                        )}
                      </div>
                    ))}
                  </motion.div>

                  {/* Gender */}
                  <motion.div variants={rise} className="mb-6">
                    <label className={`block text-[10px] font-bold tracking-[3px] uppercase mb-1.5 ${label}`}>
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        className={`${baseInput} appearance-none pl-4 ${inputBg} ${inputBorderClass('gender')}
                          ${formik.values.gender ? inputText : (dark ? 'text-white/45' : 'text-[rgba(121,30,44,0.38)]')}
                          ${optionBg}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                      >
                        <option className='text-black' value="" disabled>Select gender</option>
                        <option className='text-black' value="male">Male</option>
                        <option className='text-black' value="female">Female</option>
                        <option className='text-black' value="other">Other</option>
                      </select>
                      <FaChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs ${eyeColor}`} />
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                      <p className="mt-1 text-[10px] font-semibold tracking-[1px] text-[#FF4060]">{formik.errors.gender}</p>
                    )}
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={rise}>
                    <motion.button
                      whileHover={{ y: -2, boxShadow: '0 14px 32px -6px rgba(232,0,29,0.48)' }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full py-3.5 font-bold uppercase text-sm text-white flex items-center justify-center gap-3
                        transition-all duration-300 tracking-[3px] font-[Rajdhani]
                        bg-gradient-to-r from-[#C8001A] via-[#E8001D] to-[#FF3020]
                        [clip-path:polygon(10px_0%,100%_0%,calc(100%_-_10px)_100%,0%_100%)]"
                    >
                      Create Account
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
                        <FaArrowRight className="text-[13px]" />
                      </motion.span>
                    </motion.button>
                  </motion.div>

                </motion.form>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className={`text-center mt-5 text-[11px] tracking-[2px] uppercase ${subtext}`}
                >
                  Already have an account?{' '}
                  <Link to="/signin" className="text-[#E8001D] font-bold tracking-[2px]">Sign In</Link>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

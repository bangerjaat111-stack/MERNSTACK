import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import sign from '../../assets/sign.png';
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext.jsx';

// ================= ICONS =================
const EyeIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24">
    <path fill="#EA4335" d="M5.266 9.765C6.199 6.939 8.854 4.91 12 4.91c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" />
    <path fill="#34A853" d="M16.04 18.013C14.951 18.716 13.566 19.09 12 19.09c-3.133 0-5.78-2.013-6.723-4.822L1.237 17.335C3.193 21.297 7.265 24 12 24c2.933 0 5.735-1.043 7.834-3.001l-3.794-2.986z" />
    <path fill="#4A90E2" d="M19.834 21C22.029 18.952 23.455 15.904 23.455 12c0-.71-.091-1.473-.273-2.182H12v4.636h6.436c-.318 1.559-1.17 2.767-2.396 3.559L19.834 21z" />
    <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.91 12c0-.782.135-1.533.367-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z" />
  </svg>
);

const AppleIconDark = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const AppleIconLight = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="#1a1a1a">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// ================= VALIDATION =================
const signinSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

// ─── Dark theme (red accents) ─────────────────────────────────────────────────
const D = {
  // page
  pageBg:       'bg-black',
  // overlays
  ov1:          'bg-gradient-to-t from-black via-black/10 to-black/10',
  ov2:          'bg-gradient-to-r from-transparent to-black/55',
  // card — 50% transparent
  card:         'bg-black/50 border-red-900/40 shadow-[0_24px_64px_rgba(0,0,0,0.85)]',
  // header
  brandDot:     'bg-red-600',
  brandLine:    'bg-gradient-to-r from-transparent to-red-600/50',
  brandLineRev: 'bg-gradient-to-l from-transparent to-red-600/50',
  brandText:    'text-red-500',
  heading:      'text-white',
  sub:          'text-white/40',
  // label
  label:        'text-red-400',
  // input
  inputBg:      'bg-white/8',
  inputBorder:  'border-white/10',
  inputErrBorder:'border-red-500/60',
  inputText:    'text-white',
  inputPH:      'placeholder:text-white/25',
  inputFocus:   'focus:border-red-500/70 focus:ring-2 focus:ring-red-500/15',
  // eye
  eye:          'text-red-500/60 hover:text-red-400',
  // submit btn — red on dark
  btn:          'bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-600 hover:to-red-400 text-white shadow-[0_4px_18px_rgba(220,38,38,0.4)]',
  // divider
  divLine:      'bg-white/10',
  divText:      'text-red-500/55',
  // social
  social:       'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white',
  // footer
  footerTxt:    'text-white/32',
  footerLink:   'text-red-400 hover:text-red-300',
  // forgot
  forgot:       'text-red-400 hover:text-red-300',
};

// ─── Light theme (amber accents — same as navbar light) ───────────────────────
const L = {
  // page
  pageBg:       'bg-gray-100',
  // overlays
  ov1:          'bg-gradient-to-t from-black/55 via-black/12 to-transparent',
  ov2:          'bg-gradient-to-r from-transparent to-black/22',
  // card — 50% transparent
  card:         'bg-white/50 border-amber-500/35 shadow-[0_20px_60px_rgba(0,0,0,0.22)]',
  // header
  brandDot:     'bg-amber-500',
  brandLine:    'bg-gradient-to-r from-transparent to-amber-500/50',
  brandLineRev: 'bg-gradient-to-l from-transparent to-amber-500/50',
  brandText:    'text-amber-600',
  heading:      'text-white',
  sub:          'text-white/60',
  // label
  label:        'text-amber-300',
  // input
  inputBg:      'bg-black/25',
  inputBorder:  'border-white/20',
  inputErrBorder:'border-red-500/60',
  inputText:    'text-white',
  inputPH:      'placeholder:text-white/35',
  inputFocus:   'focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/15',
  // eye
  eye:          'text-amber-300/70 hover:text-amber-200',
  // submit btn — amber on light
  btn:          'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-black shadow-[0_4px_18px_rgba(245,165,32,0.4)]',
  // divider
  divLine:      'bg-white/20',
  divText:      'text-amber-300/60',
  // social
  social:       'bg-black/20 hover:bg-black/30 border-white/15 text-white/75 hover:text-white',
  // footer
  footerTxt:    'text-white/45',
  footerLink:   'text-amber-300 hover:text-amber-200',
  // forgot
  forgot:       'text-amber-300 hover:text-amber-200',
};

export default function Signin() {
  const { dark } = useTheme();
  const t = dark ? D : L;

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [submitError, setSubmitError]   = useState(null);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setSubmitError(null);
      try {
        await axios.post('http://localhost:8080/auth/signin', values);
      } catch (error) {
        console.error('Authentication Failure:', error);
        setSubmitError(error?.response?.data?.message || 'Invalid credentials. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={`relative overflow-hidden font-sans antialiased ${t.pageBg}`}
      style={{ height: 'calc(100dvh - 115px)', minHeight: '500px' }}>

      {/* BG IMAGE */}
      <img
        src={sign}
        alt="Luxury Car"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ objectPosition: 'center 65%' }}
      />

      {/* OVERLAYS */}
      <div className={`absolute inset-0 z-0 ${t.ov1}`} />
      <div className={`absolute inset-0 z-0 hidden md:block ${t.ov2}`} />

      {/* LAYOUT — card right-aligned on desktop, centered on mobile */}
      <div className="relative z-10 h-full flex items-center justify-center md:justify-end px-4 sm:px-10 lg:px-20">

        {/* CARD — backdrop blur + 50% transparent */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className={`
            w-full max-w-[410px]
            ${t.card}
            backdrop-blur-x border rounded-2xl
            p-5 sm:p-7
            flex flex-col gap-4
          `}
        >

          {/* HEADER */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-6 h-px ${t.brandLine}`} />
              <span className={`text-[8.5px] font-extrabold tracking-[0.28em] uppercase ${t.brandText}`}>
                ---AutoSyntax---
              </span>
              <div className={`w-6 h-px ${t.brandLineRev}`} />
            </div>
            <h1 className={`text-lg font-extrabold tracking-tight ${t.heading}`}>
              Welcome Back
            </h1>
          </div>

          {/* ERROR */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2"
              >
                <p className="text-red-400 text-[11px] text-center font-medium">{submitError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">

            {/* EMAIL */}
            <div>
              <label className={`block text-[8.5px] font-bold mb-1.5 uppercase tracking-[0.22em] ${t.label}`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@gmail.com"
                disabled={isLoading}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`
                  w-full ${t.inputBg} border
                  ${formik.touched.email && formik.errors.email ? t.inputErrBorder : t.inputBorder}
                  rounded-xl px-3.5 py-2.5
                  ${t.inputText} ${t.inputPH} text-[13px]
                  outline-none ${t.inputFocus}
                  transition-all duration-200 disabled:opacity-50
                `}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400/85 text-[10px] mt-1 ml-1">{formik.errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`block text-[8.5px] font-bold uppercase tracking-[0.22em] ${t.label}`}>
                  Password
                </label>
                <a href="#" className={`text-[9.5px] font-semibold transition-colors ${t.forgot}`}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`
                    w-full ${t.inputBg} border
                    ${formik.touched.password && formik.errors.password ? t.inputErrBorder : t.inputBorder}
                    rounded-xl px-3.5 py-2.5 pr-11
                    ${t.inputText} ${t.inputPH} text-[13px]
                    outline-none ${t.inputFocus}
                    transition-all duration-200 disabled:opacity-50
                  `}
                />
                <button
                  type="button"
                  tabIndex="-1"
                  disabled={isLoading}
                  onClick={() => setShowPassword(s => !s)}
                  className={`absolute top-1/2 right-3.5 -translate-y-1/2 transition-colors focus:outline-none ${t.eye}`}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400/85 text-[10px] mt-1 ml-1">{formik.errors.password}</p>
              )}
            </div>

            {/* SIGN IN BUTTON */}
            <motion.button
              whileHover={!isLoading ? { scale: 1.01 } : {}}
              whileTap={!isLoading ? { scale: 0.99 } : {}}
              type="submit"
              disabled={isLoading}
              className={`
                w-full mt-1
                ${t.btn}
                font-extrabold py-2.5 rounded-xl
                text-[11px] tracking-[0.22em]
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  VERIFYING...
                </>
              ) : 'SIGN IN'}
            </motion.button>

            {/* DIVIDER */}
            <div className="flex items-center gap-2.5">
              <div className={`flex-1 h-px ${t.divLine}`} />
              <span className={`text-[8.5px] font-bold tracking-[0.22em] whitespace-nowrap ${t.divText}`}>
                OR CONTINUE WITH
              </span>
              <div className={`flex-1 h-px ${t.divLine}`} />
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Google', icon: <GoogleIcon /> },
                { label: 'Apple',  icon: dark ? <AppleIconDark /> : <AppleIconLight /> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  disabled={isLoading}
                  className={`
                    ${t.social}
                    border font-semibold py-2.5 rounded-xl
                    flex items-center justify-center gap-2
                    text-[12px] transition-all duration-200 disabled:opacity-40
                  `}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

          </form>

          {/* FOOTER */}
          <p className={`text-center text-[11px] ${t.footerTxt}`}>
            Don't have an account?{' '}
            <Link to="/signup" className={`font-bold transition-colors ${t.footerLink}`}>
              Create one
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}

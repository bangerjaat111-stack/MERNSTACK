import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sign from '../../assets/sign.png';

// ================= ICONS =================
const EyeIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// ================= VALIDATION =================
const signinValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: signinValidationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* ================= BACKGROUND IMAGE ================= */}
      <img
        src={sign}
        alt="Luxury Car"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="relative z-10 min-h-screen flex items-center justify-end px-4 sm:px-8 lg:px-16 py-2">

        {/* ================= LOGIN PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="
            w-full
            max-w-[420px]
            bg-black/45
            backdrop-blur-md
            border
            border-[#c28b52]/40
            rounded-[30px]
            p-6
            sm:p-8
            shadow-2xl
          "
        >

          {/* ================= LOGO ================= */}
          <div className="text-center ">

            {/* Oval Logo */}
            <div className="relative inline-block px-8 py-3">
              <div className="absolute inset-0 border border-[#d8a066] rounded-full"></div>
              <div className="absolute inset-2 border border-[#d8a066]/60 rounded-full"></div>

              <h1 className="relative text-[20px] font-light tracking-wide text-[#d8a066]">
                AUTOSYNTAX
              </h1>
            </div>

            <h2 className="mt-2 text-[#d8a066] text-xl tracking-[2px] font-light">
              SIGN IN
            </h2>
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-[#d8a066] text-sm mb-1 uppercase tracking-wider">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="
                  w-full
                  bg-transparent
                  border
                  border-[#d8a066]/60
                  rounded-lg
                  px-4
                  py-2
                  text-white
                  placeholder:text-gray-400
                  outline-none
                  focus:border-[#f1b97a]
                  transition-all
                "
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[#d8a066] text-sm mb-1 uppercase tracking-wider">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="
                    w-full
                    bg-transparent
                    border
                    border-[#d8a066]/60
                    rounded-lg
                    px-4
                    py-2
                    pr-12
                    text-white
                    placeholder:text-gray-400
                    outline-none
                    focus:border-[#f1b97a]
                    transition-all
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    top-1/2
                    right-4
                    -translate-y-1/2
                    text-[#d8a066]
                  "
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* SIGN IN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="
                w-full
                mt-0
                bg-gradient-to-r
                from-[#c6844c]
                to-[#e1b07a]
                text-black
                font-semibold
                py-2
                rounded-lg
                text-x
                tracking-wide
                shadow-lg
              "
            >
              SIGN IN
            </motion.button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-[1px] bg-[#d8a066]/40"></div>

              <span className="text-[#d8a066] text-sm whitespace-nowrap">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-[1px] bg-[#d8a066]/40"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="
                w-full
                bg-gradient-to-r
                from-[#c6844c]
                to-[#e1b07a]
                text-black
                font-semibold
                py-1
                rounded-lg
                flex
                items-center
                justify-center
                gap-3
                text-x
                hover:scale-[1.01]
                transition-all
              "
            >
              <span className="text-2xl font-bold">G</span>
              GOOGLE
            </button>

            {/* APPLE BUTTON */}
            <button
              type="button"
              className="
                w-full
                bg-gradient-to-r
                from-[#c6844c]
                to-[#e1b07a]
                text-black
                font-semibold
                py-1
                rounded-lg
                flex
                items-center
                justify-center
                gap-3
                text-x
                hover:scale-[1.01]
                transition-all
              "
            >
              <span className="text-2xl"></span>
              APPLE (iOS)
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-300 text-sm mt-7">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-[#e1b07a] ml-2 hover:text-white"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 sm:hidden"></div>
    </div>
  );
}
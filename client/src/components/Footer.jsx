import React from "react";
import {
  
  FaCar,
} from "react-icons/fa";
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-600">
                <FaCar className="text-xl" />
              </div>

              <h2 className="text-2xl font-bold tracking-wider">
                AUTO<span className="text-red-600">SYNTAX</span>
              </h2>
            </div>

            <p className="text-gray-400 leading-7 max-w-sm">
              Discover the latest cars, explore powerful machines, and
              experience the world of automobiles with AutoSyntax.
            </p>

          
          </div>

        

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Car Categories
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="#" className="hover:text-red-500 transition">
                  SUVs
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Sedans
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Sports Cars
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Electric Cars
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-red-500 transition">
                  Luxury Cars
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>
                📍 India
              </p>

              <p>
                📧 support@autosyntax.com
              </p>

              <p>
                📞 +91 9992540404
              </p>
            </div>
            <Link to='/new-cars'>
            <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
              Explore Cars
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AutoSyntax. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
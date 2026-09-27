import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { useWishlist } from '../../Context/WishlistContext.jsx';
import { Link } from 'react-router-dom';
import {
  
  RiFireLine, RiShieldCheckLine,
  RiCustomerService2Line, RiExchangeLine,
  RiPlayCircleLine, 
  RiHeartLine, RiHeartFill,  RiShieldUserLine
} from 'react-icons/ri';

const BRANDS = [
  { name: 'Tata Motors', logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=300&auto=format&fit=crop', count: '1,420+ Cars' },
  { name: 'Mahindra', logo: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=300&auto=format&fit=crop', count: '980+ Cars' },
  { name: 'Hyundai', logo: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=300&auto=format&fit=crop', count: '1,250+ Cars' },
  { name: 'Maruti Suzuki', logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=300&auto=format&fit=crop', count: '2,100+ Cars' },
  { name: 'Kia', logo: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/192817/seltos-exterior-right-front-three-quarter-50.png?isig=0&q=80', count: '850+ Cars' },
  { name: 'BMW', logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=300&auto=format&fit=crop', count: '340+ Luxury' },
];

const POPULAR_CARS = [
  {
    id: 'h1',
    name: 'Mahindra Thar Roxx 5-Door',
    price: '₹12.99 – 20.49 Lakh',
    tag: 'Hot Launch',
    fuel: 'Diesel / Petrol',
    km: '15.2 kmpl · 4x4',
    image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop',
    link: '/new-cars'
  },
  {
    id: 'h2',
    name: 'Tata Nexon EV Max',
    price: '₹14.49 – 19.49 Lakh',
    tag: 'Electric',
    fuel: 'Electric',
    km: '465 km range',
    image: 'https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp',
    link: '/new-cars'
  },
  {
    id: 'h3',
    name: 'Hyundai Creta SX(O) 2025',
    price: '₹11.11 – 20.45 Lakh',
    tag: 'Best Seller',
    fuel: 'Petrol / Diesel',
    km: '18.4 kmpl · ADAS',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg',
    link: '/new-cars'
  },
  {
    id: 'h4',
    name: 'Toyota Fortuner Legender 4x4',
    price: '₹43.66 – 47.64 Lakh',
    tag: 'Luxury SUV',
    fuel: 'Diesel Automatic',
    km: '14.2 kmpl',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
    link: '/new-cars'
  },
  {
    id: 'h5',
    name: 'Maruti Suzuki Swift VXI',
    price: '₹6.49 – 9.64 Lakh',
    tag: 'Budget Pick',
    fuel: 'Petrol / CNG',
    km: '25.7 kmpl',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    link: '/new-cars'
  },
  {
    id: 'h6',
    name: 'BMW 3 Series Gran Limousine',
    price: '₹60.90 Lakh',
    tag: 'Luxury Sedan',
    fuel: 'Petrol Turbo',
    km: '16.5 kmpl',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    link: '/new-cars'
  },
];

const SERVICES = [
  { icon: RiShieldCheckLine, title: 'Verified History', desc: '100% genuine RC & service history records' },
  { icon: RiExchangeLine, title: 'Zero Brokerage Sale', desc: 'Direct buyers & sellers with instant payment' },
  { icon: RiCustomerService2Line, title: '24/7 Expert Advice', desc: 'Personal car consultants to guide your purchase' },
  { icon: RiShieldUserLine, title: 'Doorstep Delivery', desc: 'Fully sanitized vehicle delivered to your home' },
];

export default function Home() {
  const { dark } = useTheme();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const bg = dark ? 'bg-[#080A0D]' : 'bg-slate-50';
  const cardBg = dark ? 'bg-[#0D0F16]' : 'bg-white';
  const border = dark ? 'border-red-900/20' : 'border-amber-600/15';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';
  const gradText = dark
    ? 'bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent';
  const gradBtn = dark
    ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white'
    : 'bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400 text-white';

  return (
    <div className={`${bg} min-h-screen font-sans transition-colors duration-300`}>

      {/* ══════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 z-10">
            <div className={`inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${dark ? 'bg-red-900/20 text-red-400 border-red-900/30' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              <RiFireLine size={15} /> India's Premier Automotive Destination
            </div>
            
            <h1 className={`text-4xl sm:text-6xl font-black leading-none tracking-tight ${textHi}`}>
              DRIVE YOUR <span className={gradText}>DREAM CAR</span> HOME
            </h1>
            
            <p className={`text-base sm:text-lg leading-relaxed ${textSb} max-w-xl`}>
              Explore 10,000+ verified new & used cars, watch authentic video reviews by Arun Panwar, book test drives, and sell your car at best market price.
            </p>

            {/* QUICK ACTIONS ROW */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/new-cars" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline shadow-lg ${gradBtn}`}>
                Explore New Cars
              </Link>
              <Link to="/used-cars" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline border ${dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100'}`}>
                Browse Used Cars
              </Link>
              <Link to="/sell" className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider no-underline border ${dark ? 'border-red-600/50 text-red-400 hover:bg-red-900/20' : 'border-amber-500/50 text-amber-700 hover:bg-amber-50'}`}>
                Sell Your Car
              </Link>
            </div>

            {/* TRUST NUMBERS */}
            <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${border}`}>
              <div>
                <p className={`text-2xl font-black ${textHi}`}>10,000+</p>
                <p className={`text-xs ${textSb}`}>Verified Cars</p>
              </div>
              <div>
                <p className={`text-2xl font-black ${textHi}`}>500+</p>
                <p className={`text-xs ${textSb}`}>Certified Dealers</p>
              </div>
              <div>
                <p className={`text-2xl font-black ${gradText}`}>4.9 ★</p>
                <p className={`text-xs ${textSb}`}>User Rating</p>
              </div>
            </div>
          </div>

          {/* HERO CAR SHOWCASE */}
          <div className="relative">
            <div className={`relative rounded-3xl overflow-hidden border ${border} ${cardBg} shadow-2xl p-2`}>
              <img
                src="https://wallpapercave.com/wp/wp7132237.jpg"
                alt="Luxury SUV"
                className="w-full h-360px sm:h-420px object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  
                  <h3 className="text-xl font-extrabold">RANGE ROVER</h3>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. FEATURED BRAND BADGES
      ══════════════════════════════════════════════ */}
      <section className={`py-12 border-y ${border} ${dark ? 'bg-[#0A0C12]' : 'bg-slate-100/60'}`}>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${textHi}`}>Top Car Manufacturers</h2>
              <p className={`text-xs ${textSb}`}>Browse cars by leading Indian and global automakers</p>
            </div>
            <Link to="/new-cars" className={`text-xs font-bold uppercase no-underline ${gradText}`}>
              View All Brands →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((b, i) => (
              <Link
                key={i}
                to="/new-cars"
                className={`p-4 rounded-2xl border ${border} ${cardBg} hover:scale-105 transition-all text-center no-underline block group shadow-sm`}
              >
                <img src={b.logo} alt={b.name} className="w-full h-20 object-cover rounded-xl mb-2 group-hover:opacity-90" />
                <h4 className={`text-sm font-bold ${textHi}`}>{b.name}</h4>
                <p className={`text-[11px] ${textSb}`}>{b.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. TRENDING CARS GRID
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest ${gradText}`}>Trending Selection</span>
              <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 ${textHi}`}>
                Most Popular <span className={gradText}>Cars of 2026</span>
              </h2>
            </div>
            <Link to="/new-cars" className={`inline-block px-5 py-2.5 rounded-xl text-xs font-bold uppercase no-underline ${gradBtn}`}>
              Explore All 48+ Cars
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_CARS.map((car) => {
              const saved = isWishlisted(car.id || car.name);
              return (
                <div key={car.id} className={`rounded-3xl border ${border} ${cardBg} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}>
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {car.tag}
                    </span>
                    <button
                      onClick={() => toggleWishlist({ id: car.id, name: car.name, title: car.name, price: car.price, img: car.image })}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center border-none cursor-pointer hover:bg-red-600 transition-colors"
                    >
                      {saved ? <RiHeartFill size={18} className="text-red-500" /> : <RiHeartLine size={18} />}
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className={`font-extrabold text-lg ${textHi}`}>{car.name}</h3>
                      <p className={`text-base font-extrabold mt-1 ${gradText}`}>{car.price}</p>
                      <div className={`grid grid-cols-2 gap-2 mt-3 text-xs ${textSb}`}>
                        <span>Fuel: <strong>{car.fuel}</strong></span>
                        <span>Spec: <strong>{car.km}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <Link to="/new-cars" className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold no-underline ${gradBtn}`}>
                        View Prices & Specs
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ARUN PANWAR YOUTUBE VIDEO FEATURE
      ══════════════════════════════════════════════ */}
      <section className={`py-16 border-y ${border} ${dark ? 'bg-[#0D0F16]' : 'bg-slate-100/80'}`}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-red-600/30 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1568844293986-8d0400bd4745?q=80&w=800&auto=format&fit=crop"
              alt="Arun Panwar Video"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link to="/videos" className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform no-underline">
                <RiPlayCircleLine size={36} />
              </Link>
            </div>
            <span className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20">
              🔥 Arun Panwar Thar Roxx Delivery
            </span>
          </div>

          <div className="space-y-5">
            <span className={`text-xs font-extrabold uppercase tracking-widest ${gradText}`}>AutoSyntax TV Creator Spotlight</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
              Watch Car Reviews by <span className={gradText}>Arun Panwar</span>
            </h2>
            <p className={`text-sm ${textSb} leading-relaxed`}>
              Get honest, real-world Indian car delivery videos, extreme 4x4 offroad challenges, long-term ownership reviews, and mileage tests from top creator Arun Panwar.
            </p>
            <Link to="/videos" className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider no-underline ${gradBtn}`}>
              <RiPlayCircleLine size={18} /> Watch All Videos Now
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. WHY CHOOSE AUTOSYNTAX
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className={`text-xs font-extrabold uppercase tracking-widest ${gradText}`}>The AutoSyntax Guarantee</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textHi}`}>
              Why Millions Trust AutoSyntax
            </h2>
            <p className={`text-xs sm:text-sm ${textSb}`}>
              We ensure transparent pricing, verified vehicle documentation, and zero hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`p-6 rounded-3xl border ${border} ${cardBg} space-y-3 shadow-md hover:shadow-xl transition-all`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dark ? 'bg-red-900/30 text-red-400' : 'bg-amber-100 text-amber-700'}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`font-bold text-base ${textHi}`}>{s.title}</h3>
                  <p className={`text-xs ${textSb} leading-relaxed`}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. SELL YOUR CAR CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className={`max-w-7xl mx-auto rounded-3xl border ${border} ${cardBg} p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="space-y-3 z-10 max-w-xl">
            <span className={`text-xs font-bold uppercase tracking-widest ${gradText}`}>Instant Car Sale</span>
            <h2 className={`text-3xl sm:text-4xl font-black ${textHi}`}>
              Want to Sell Your Used Car for Top Rupee?
            </h2>
            <p className={`text-sm ${textSb}`}>
              Get free doorstep inspection, instant price estimate, zero commission fees, and payment credited directly to your bank account within 24 hours.
            </p>
          </div>
          <div className="z-10 w-full md:w-auto">
            <Link to="/sell" className={`block text-center px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest no-underline shadow-2xl ${gradBtn}`}>
              Get Free Instant Valuation →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
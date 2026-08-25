import React, { useState, useMemo } from "react";
import { useTheme } from "../../Context/ThemeContext.jsx";
import { Calendar, Tag, ArrowUpRight, Rocket, Filter } from "lucide-react";

/* ---------------------------------------------------------
   Mock "coming soon" data — 20 upcoming car launches.
   Sample/placeholder content for UI purposes — swap with a
   real news/launch-tracker API or CMS feed when ready.
--------------------------------------------------------- */
const UPCOMING_CARS = [
  { id: 1, name: "Maruti Suzuki eVX", brand: "Maruti Suzuki", type: "EV", segment: "SUV", expected: "Sep 2026", priceRange: "₹18 – 22 Lakh", blurb: "Maruti's first mass-market electric SUV, built on the Heartect-e platform with a claimed range of over 500 km." },
  { id: 2, name: "Mahindra XUV.e8", brand: "Mahindra", type: "EV", segment: "SUV", expected: "Oct 2026", priceRange: "₹28 – 35 Lakh", blurb: "Electric sibling of the XUV700, riding on Mahindra's INGLO skateboard platform with a coupe-SUV silhouette." },
  { id: 3, name: "Tata Sierra EV", brand: "Tata Motors", type: "EV", segment: "SUV", expected: "Nov 2026", priceRange: "₹20 – 27 Lakh", blurb: "Revival of the iconic Sierra nameplate as an electric SUV, previewed by Tata's concept shown at recent auto expos." },
  { id: 4, name: "Hyundai Creta Electric", brand: "Hyundai", type: "EV", segment: "SUV", expected: "Sep 2026", priceRange: "₹20 – 24 Lakh", blurb: "Battery-powered version of India's best-selling SUV, aimed squarely at the growing compact electric SUV segment." },
  { id: 5, name: "Kia Syros", brand: "Kia", type: "Petrol/Diesel", segment: "Compact SUV", expected: "Oct 2026", priceRange: "₹9 – 15 Lakh", blurb: "A new sub-4m-adjacent crossover slotting between the Sonet and Seltos in Kia's growing SUV lineup." },
  { id: 6, name: "Toyota Urban Cruiser EV", brand: "Toyota", type: "EV", segment: "SUV", expected: "Dec 2026", priceRange: "₹22 – 28 Lakh", blurb: "Toyota's electric SUV built on a shared platform with Suzuki, marking its first EV for the Indian mass market." },
  { id: 7, name: "Honda Elevate Hybrid", brand: "Honda", type: "Hybrid", segment: "SUV", expected: "Jan 2027", priceRange: "₹16 – 20 Lakh", blurb: "A strong-hybrid variant of the Elevate promising city-friendly fuel economy without a plug." },
  { id: 8, name: "MG M9 EV", brand: "MG Motor", type: "EV", segment: "MPV", expected: "Nov 2026", priceRange: "₹65 – 70 Lakh", blurb: "A premium all-electric luxury MPV aimed at chauffeur-driven buyers, positioned above the current MG lineup." },
  { id: 9, name: "Skoda Kylaq Facelift", brand: "Skoda", type: "Petrol", segment: "Compact SUV", expected: "Feb 2027", priceRange: "₹10 – 16 Lakh", blurb: "A mid-cycle refresh bringing updated styling and a revised feature list to Skoda's compact SUV." },
  { id: 10, name: "Renault Duster (2027)", brand: "Renault", type: "Petrol", segment: "SUV", expected: "Mar 2027", priceRange: "₹12 – 18 Lakh", blurb: "Renault's comeback SUV nameplate returns to India after years away, riding on a global mid-size platform." },
  { id: 11, name: "Volkswagen Tayron", brand: "Volkswagen", type: "Petrol", segment: "SUV", expected: "Dec 2026", priceRange: "₹32 – 38 Lakh", blurb: "A three-row flagship SUV joining VW's India lineup above the Tiguan, targeting premium family buyers." },
  { id: 12, name: "Tata Curvv EV Long Range", brand: "Tata Motors", type: "EV", segment: "Coupe SUV", expected: "Sep 2026", priceRange: "₹19 – 25 Lakh", blurb: "A larger-battery variant of the Curvv EV promising extended range for highway-heavy driving." },
  { id: 13, name: "Hyundai Venue N Line", brand: "Hyundai", type: "Petrol", segment: "Compact SUV", expected: "Oct 2026", priceRange: "₹13 – 16 Lakh", blurb: "A sportier, turbocharged N Line trim bringing tighter suspension tuning and cosmetic upgrades to the Venue." },
  { id: 14, name: "Mahindra Thar Roxx EV", brand: "Mahindra", type: "EV", segment: "SUV", expected: "Jan 2027", priceRange: "₹22 – 28 Lakh", blurb: "An electric take on the five-door Thar Roxx, aimed at buyers wanting off-road capability with zero tailpipe emissions." },
  { id: 15, name: "Maruti Suzuki Fronx Hybrid", brand: "Maruti Suzuki", type: "Hybrid", segment: "Compact SUV", expected: "Nov 2026", priceRange: "₹9 – 13 Lakh", blurb: "A strong-hybrid Fronx variant designed to boost mileage figures without moving to a full EV powertrain." },
  { id: 16, name: "Kia EV3", brand: "Kia", type: "EV", segment: "Compact SUV", expected: "Feb 2027", priceRange: "₹25 – 30 Lakh", blurb: "A compact electric SUV bringing Kia's global EV design language to a more accessible price point in India." },
  { id: 17, name: "Jeep Compass EV", brand: "Jeep", type: "EV", segment: "SUV", expected: "Mar 2027", priceRange: "₹35 – 42 Lakh", blurb: "Jeep's first electric SUV for India, sharing underpinnings with global Stellantis EV platforms." },
  { id: 18, name: "Nissan Magnite Facelift", brand: "Nissan", type: "Petrol", segment: "Compact SUV", expected: "Dec 2026", priceRange: "₹8 – 13 Lakh", blurb: "A styling and feature refresh for Nissan's budget SUV, aiming to stay competitive in a crowded segment." },
  { id: 19, name: "BYD Seal Facelift", brand: "BYD", type: "EV", segment: "Sedan", expected: "Jan 2027", priceRange: "₹42 – 48 Lakh", blurb: "An updated version of BYD's electric performance sedan with minor design tweaks and revised software." },
  { id: 20, name: "Tata Harrier EV Long Range", brand: "Tata Motors", type: "EV", segment: "SUV", expected: "Oct 2026", priceRange: "₹28 – 33 Lakh", blurb: "A bigger-battery version of the Harrier EV built for buyers who want a flagship electric SUV with extended range." },
];

const TYPES = ["All", "EV", "Hybrid", "Petrol", "Petrol/Diesel"];

export default function News() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeType, setActiveType] = useState("All");

  const filtered = useMemo(
    () =>
      activeType === "All"
        ? UPCOMING_CARS
        : UPCOMING_CARS.filter((c) => c.type === activeType),
    [activeType]
  );

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark ? "bg-[#0D1120] text-white" : "bg-[#FAF9F6] text-[#151515]"
      }`}
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Rajdhani', sans-serif; }
      `}</style>

      {/* Header */}
      <div
        className={`border-b ${
          isDark ? "border-white/10 bg-[#12172B]" : "border-black/10 bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-2 text-[#F2994A]">
            <Rocket size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
            Upcoming Car Launches
          </h1>
          <p className={`mt-1 text-sm ${isDark ? "text-white/50" : "text-black/50"}`}>
            {UPCOMING_CARS.length} new models expected to launch in India
          </p>
        </div>
      </div>

      {/* Type filter tabs */}
      <div
        className={`sticky top-0 z-10 border-b backdrop-blur ${
          isDark ? "border-white/10 bg-[#0D1120]/90" : "border-black/10 bg-[#FAF9F6]/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <Filter size={14} className={isDark ? "text-white/40" : "text-black/40"} />
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeType === t
                  ? "bg-[#F2994A] text-[#12172B]"
                  : isDark
                  ? "bg-white/5 text-white/60 hover:bg-white/10"
                  : "bg-black/5 text-black/60 hover:bg-black/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* News grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((car) => (
            <NewsCard key={car.id} car={car} isDark={isDark} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={`mt-16 text-center ${isDark ? "text-white/50" : "text-black/50"}`}>
            <p className="font-display text-lg font-semibold">No upcoming launches in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NewsCard({ car, isDark }) {
  return (
    <article
      className={`group flex flex-col rounded-lg border p-4 transition hover:shadow-lg ${
        isDark
          ? "border-white/10 bg-[#12172B] hover:border-[#F2994A]/40"
          : "border-black/10 bg-white hover:border-[#F2994A]/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-display text-sm font-bold ${
            isDark ? "bg-white/10 text-white" : "bg-[#12172B] text-white"
          }`}
        >
          {car.brand
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            isDark ? "bg-white/5 text-white/60" : "bg-black/5 text-black/60"
          }`}
        >
          {car.segment}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold leading-tight">{car.name}</h3>
      <p className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>{car.brand}</p>

      <p className={`mt-2 flex-1 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-black/70"}`}>
        {car.blurb}
      </p>

      <div className={`mt-4 flex items-center justify-between border-t pt-3 text-xs ${isDark ? "border-white/10" : "border-black/10"}`}>
        <span className={`flex items-center gap-1.5 ${isDark ? "text-white/60" : "text-black/60"}`}>
          <Calendar size={13} className="text-[#F2994A]" />
          Expected {car.expected}
        </span>
        <span className={`flex items-center gap-1.5 font-semibold ${isDark ? "text-white" : "text-[#12172B]"}`}>
          <Tag size={13} className="text-[#F2994A]" />
          {car.priceRange}
        </span>
      </div>

      <button
        className={`mt-3 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition ${
          isDark
            ? "bg-white/5 text-white group-hover:bg-[#F2994A] group-hover:text-[#12172B]"
            : "bg-black/5 text-[#12172B] group-hover:bg-[#F2994A] group-hover:text-[#12172B]"
        }`}
      >
        Notify Me at Launch
        <ArrowUpRight size={13} />
      </button>
    </article>
  );
}
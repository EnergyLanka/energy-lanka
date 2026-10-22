"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=2000", // Luxury Home
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000", // Commercial Solar
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000", // Solar Panels Closeup
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2000", // Battery Storage
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000", // Modern Villa
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2000", // Wind/Solar Farm
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=2000", // Engineering
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000", // Luxurious Night Home
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Changes image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    // Full width break out of parent container
    <div className="relative w-screen left-1/2 -translate-x-1/2 h-[85vh] overflow-hidden bg-brand">
      {/* Images with fade transition */}
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Luxury Solar ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-brand/60 mix-blend-multiply"></div>

      {/* Static Text Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <p className="text-gold tracking-[0.3em] uppercase text-sm font-bold mb-6 animate-pulse">
          The Pinnacle of Clean Energy
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 drop-shadow-lg">
          Power Your World <br /> With Elegance.
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
          Bespoke solar architecture and premium battery storage for Sri Lanka's most distinguished homes and businesses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-gold text-lg px-10 py-4">
            Explore Solutions
          </Link>
          <Link href="/calculator" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 text-lg px-10 py-4">
            Calculate Savings
          </Link>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-8 bg-gold" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

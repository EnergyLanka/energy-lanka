"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand text-white shadow-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-2xl font-serif text-gold tracking-widest flex items-center gap-2 uppercase">
          <span className="text-3xl">☀</span> Energy Lanka
        </Link>
        <div className="hidden lg:flex gap-8 text-sm font-medium tracking-wide text-slate-300">
          <Link href="/residential" className="hover:text-gold transition-colors">Residential</Link>
          <Link href="/commercial" className="hover:text-gold transition-colors">Commercial</Link>
          <Link href="/products" className="hover:text-gold transition-colors">All Products</Link>
          <Link href="/calculator" className="hover:text-gold transition-colors">ROI Calculator</Link>
          <Link href="/quote" className="hover:text-gold transition-colors">Get a Quote</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-xs text-slate-400 hover:text-white uppercase tracking-wider hidden sm:block transition-colors">Admin</Link>
          <Link href="/quote" className="btn-gold !px-5 !py-2.5 text-sm rounded-full">Request a Quote</Link>
        </div>
      </nav>
    </header>
  );
}

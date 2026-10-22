"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

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
          <Link href="/cart" className="btn-gold !px-5 !py-2.5 text-sm rounded-full flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Cart ({count})
          </Link>
        </div>
      </nav>
    </header>
  );
}

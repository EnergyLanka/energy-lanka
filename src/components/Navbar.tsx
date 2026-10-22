"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand">⚡ Energy Lanka</Link>
        <div className="hidden gap-6 text-sm font-medium sm:flex">
          <Link href="/products">Products</Link>
          <Link href="/calculator">ROI Calculator</Link>
          <Link href="/quote">Get a Quote</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <Link href="/cart" className="btn-primary !px-4 !py-2 text-sm">Cart ({count})</Link>
      </nav>
    </header>
  );
}

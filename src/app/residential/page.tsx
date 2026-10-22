import Link from "next/link";

export default function ResidentialPage() {
  return (
    <div className="bg-slate-50">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl mx-4 mt-4">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" alt="Residential Solar" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand/70 mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Luxury Residential</h1>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">Protect your home from rising energy costs with sleek, silent, and architecturally stunning solar and battery systems.</p>
          <Link href="/products" className="btn-gold px-10 py-4 text-lg">Shop Premium Products</Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const featured = await prisma.product.findMany({ take: 4 });
  
  return (
    <div className="space-y-24 pb-20">
      
      {/* Luxury Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Solar Home" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brand/70 mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-bold mb-6">The Pinnacle of Clean Energy</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Power Your World <br/> With Elegance.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
            Bespoke solar architecture and premium battery storage for Sri Lanka's most distinguished homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-gold text-lg px-10 py-4">Explore Solutions</Link>
            <Link href="/calculator" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 text-lg px-10 py-4">Calculate Savings</Link>
          </div>
        </div>
      </section>

      {/* Trust / Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="bg-white shadow-2xl rounded-xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {[
            ["25.0%", "World-Leading Panel Efficiency"],
            ["LKR 45.53/kWh", "Premium Battery Export Bonus"],
            ["10 Years", "Comprehensive Battery Warranty"],
          ].map(([v, l]) => (
            <div key={l} className="p-10 text-center">
              <div className="text-4xl font-serif font-bold text-brand mb-2">{v}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Residential vs Commercial Split Section */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand">Tailored For Your Scale</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Whether you are powering a private villa or a national factory, we deliver uncompromising quality.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Residential Card */}
          <div className="relative h-[450px] rounded-xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" alt="Residential" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="text-3xl font-serif text-white mb-3">Residential</h3>
              <p className="text-slate-200 mb-6 max-w-xs">Silent, sleek, and powerful energy systems designed to blend into your luxury home.</p>
              <Link href="/products?category=panel" className="text-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">Shop Residential →</Link>
            </div>
          </div>
          {/* Commercial Card */}
          <div className="relative h-[450px] rounded-xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000" alt="Commercial" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className="text-3xl font-serif text-white mb-3">Commercial</h3>
              <p className="text-slate-200 mb-6 max-w-xs">Industrial-grade solar arrays that drastically reduce operational costs and carbon footprint.</p>
              <Link href="/quote" className="text-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">Request Consultation →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-end mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-4xl font-serif text-brand">The Collection</h2>
            <p className="mt-2 text-slate-500">The world's most efficient hardware, curated for you.</p>
          </div>
          <Link href="/products" className="hidden sm:block text-brand font-semibold hover:text-gold transition-colors uppercase tracking-wider text-sm">View All Products</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.length > 0 ? (
            featured.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-slate-500">Products will appear here once the database is seeded.</p>
          )}
        </div>
      </section>

    </div>
  );
}

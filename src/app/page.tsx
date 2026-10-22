import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const featured = await prisma.product.findMany({ take: 4 });
  
  return (
    <div>
      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-16 text-white sm:px-12">
        <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">
          Power your home with the world's most efficient solar.
        </h1>
        <p className="mt-4 max-w-xl text-white/90">
          AIKO & LONGi panels at 25.0% efficiency. Tesla, BYD & Sigenergy batteries.
          Earn up to <strong>LKR 45.53/kWh</strong> under Sri Lanka's Net Plus battery bonus.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/products" className="btn bg-white text-brand hover:bg-slate-100">Shop now</Link>
          <Link href="/calculator" className="btn border border-white/50 text-white hover:bg-white/10">Calculate savings</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          ["25.0%", "Peak panel efficiency"],
          ["LKR 45.53/kWh", "Battery export bonus"],
          ["10 yr", "Battery warranties"],
        ].map(([v, l]) => (
          <div key={l} className="card p-6 text-center">
            <div className="text-3xl font-bold text-brand">{v}</div>
            <div className="mt-1 text-sm text-slate-600">{l}</div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Featured products</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

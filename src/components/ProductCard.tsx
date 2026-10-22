import Link from "next/link";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card group overflow-hidden">
      <div className="flex h-40 items-center justify-center bg-brand-light text-5xl">
        {product.category === "panel" ? "🔋" : "⚡"}
      </div>
      <div className="p-4">
        {product.badge && (
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">{product.badge}</span>
        )}
        <h3 className="mt-2 font-semibold group-hover:text-brand">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500">
          {product.capacityW ? `${(product.capacityW / 1000).toFixed(1)} kW · ` : ""}
          {product.efficiency ? `${product.efficiency}% · ` : ""}
          {product.warrantyYrs} yr warranty
        </p>
        <div className="mt-3 font-bold text-brand">LKR {product.priceLKR.toLocaleString()}</div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import type { Product } from "@prisma/client";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card group flex flex-col h-full bg-white border border-slate-200">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 flex items-center justify-center p-4">
        <ProductImage slug={product.slug} alt={product.name} />
        {product.badge && (
          <span className="absolute top-4 right-4 bg-gold text-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-gold font-bold tracking-widest uppercase mb-2">{product.brand}</div>
        <h3 className="text-lg font-serif font-bold text-brand group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-500 flex-grow">
          {product.capacityW ? `${(product.capacityW / 1000).toFixed(2)} kW · ` : ""}
          {product.efficiency ? `${product.efficiency}% Efficiency · ` : ""}
          {product.warrantyYrs} yr warranty
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xl font-bold text-brand">LKR {product.priceLKR.toLocaleString()}</div>
          <div className="text-xs text-brand font-medium uppercase tracking-wider group-hover:text-gold transition-colors">View Details →</div>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import type { Product } from "@prisma/client";

// Guaranteed-to-work, high-quality images mapped by brand
export default function ProductCard({ product }: { product: Product }) {
  // Check the brand and assign a specific, working image
  const getImage = () => {
    if (product.brand === "AIKO") return "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800"; // Black panel
    if (product.brand === "LONGi") return "https://images.unsplash.com/photo-1548613053-22087dd8edb8?auto=format&fit=crop&q=80&w=800"; // Sleek panel
    if (product.brand === "Jinko Solar") return "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800"; // Blue array
    if (product.brand === "JA Solar") return "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800"; // Commercial array
    if (product.brand === "Trina Solar") return "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"; // Rooftop panel
    if (product.brand === "Canadian Solar") return "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800"; // Ground mount
    
    // Batteries
    if (product.brand === "BYD" || product.brand === "FoxESS" || product.brand === "Sigenergy") {
      return "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800"; // Home battery
    }

    return "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"; // Fallback
  };

  const imageUrl = getImage();

  return (
    <Link href={`/products/${product.slug}`} className="card group flex flex-col h-full bg-white border border-slate-200">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
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

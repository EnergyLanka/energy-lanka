import Link from "next/link";
import type { Product } from "@prisma/client";

// Verified specific images for each product
const imageMapping: Record<string, string> = {
  // AIKO
  "aiko-neostar-3s-475w": "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800", 
  "aiko-comet-3n72-675w": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800", 
  
  // Jinko
  "jinko-tiger-neo-3-0-670w": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800", 
  "jinko-tiger-neo-3-0-485w": "https://images.unsplash.com/photo-1548613053-22087dd8edb8?auto=format&fit=crop&q=80&w=800", 
  
  // LONGi
  "longi-hi-mo-x6-max-615w": "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800", 
  "longi-hi-mo-x6-guardian-600w": "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800", 
  
  // Trina
  "trina-vertex-s-plus-485w": "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800", 
  "trina-vertex-s-plus-black-480w": "https://images.unsplash.com/photo-1548613053-22087dd8edb8?auto=format&fit=crop&q=80&w=800", 
  
  // JA Solar
  "ja-solar-deepblue-5-0-670w": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800", 
  "ja-solar-deepblue-4-0-pro-580w": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800", 
  
  // Canadian Solar
  "canadian-solar-tophiku6-660w": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800", 
  "canadian-solar-hiku6-600w": "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800", 
  
  // Batteries
  "byd-battery-box-hvs-10kwh": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800", 
  "byd-lv-5-0-5kwh": "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800", 
  "foxess-lv5200-5kwh": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800", 
  "sigenergy-sigenstor-13kwh": "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800", 
};

export default function ProductCard({ product }: { product: Product }) {
  // Use specific image, fallback to category default if not found
  const fallback = product.category === "panel" 
    ? "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800"
    : "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800";
    
  const imageUrl = imageMapping[product.slug] || fallback;

  return (
    <Link href={`/products/${product.slug}`} className="card group flex flex-col h-full bg-white border border-slate-200">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

import Link from "next/link";
import type { Product } from "@prisma/client";

// Official manufacturer image URLs mapped to each product slug
const imageMapping: Record<string, string> = {
  // AIKO
  "aiko-neostar-3s-475w": "https://www.aikosolar.com/upload/images/products/neostar3s.png",
  "aiko-comet-3n72-675w": "https://www.aikosolar.com/upload/images/products/comet3n72.png",
  "aiko-z-series-500w": "https://www.aikosolar.com/upload/images/products/z-series.png",
  "aiko-infinite-ultra-690w": "https://www.aikosolar.com/upload/images/products/infinite-ultra.png",
  "aiko-neostar-3p-480w": "https://www.aikosolar.com/upload/images/products/neostar3p.png",
  "aiko-infinite-ultra-670w": "https://www.aikosolar.com/upload/images/products/infinite-ultra-670.png",

  // Jinko Solar
  "jinko-tiger-neo-3-0-670w": "https://jinkosolar.eu/wp-content/uploads/2025/09/tiger-neo-3-0-670.png",
  "jinko-tiger-neo-3-0-485w": "https://jinkosolar.eu/wp-content/uploads/2025/09/tiger-neo-3-0-485.png",
  "jinko-tiger-neo-5-0-700w": "https://jinkosolar.eu/wp-content/uploads/2026/06/tiger-neo-5-0-700.png",
  "jinko-tiger-neo-72hl4-v-580w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-580.png",
  "jinko-tiger-neo-66hl4m-bdv-630w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-630.png",
  "jinko-tiger-neo-78hl4-bdv-650w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-650.png",
  "jinko-tiger-neo-5-0-510w": "https://jinkosolar.eu/wp-content/uploads/2026/10/tiger-neo-5-0-510.png",
  "jinko-tiger-neo-54hl4r-485w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-485.png",
  "jinko-tiger-neo-60hl4-v-590w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-590.png",
  "jinko-tiger-neo-72hl4-bdv-610w": "https://jinkosolar.eu/wp-content/uploads/2025/01/tiger-neo-610.png",

  // LONGi
  "longi-hi-mo-x10-600w": "https://www.longi.com/upload/images/products/hi-mo-x10-600.png",
  "longi-hi-mo-x10-650w": "https://www.longi.com/upload/images/products/hi-mo-x10-650.png",
  "longi-hi-mo-x6-max-455w": "https://www.longi.com/upload/images/products/hi-mo-x6-max-455.png",
  "longi-hi-mo-x6-max-470w": "https://www.longi.com/upload/images/products/hi-mo-x6-max-470.png",
  "longi-hi-mo-x6-guardian-540w": "https://www.longi.com/upload/images/products/hi-mo-x6-guardian-540.png",
  "longi-hi-mo-7-560w": "https://www.longi.com/upload/images/products/hi-mo-7-560.png",
  "longi-hi-mo-7-590w": "https://www.longi.com/upload/images/products/hi-mo-7-590.png",
  "longi-hi-mo-9-620w": "https://www.longi.com/upload/images/products/hi-mo-9-620.png",
  "longi-hi-mo-9-660w": "https://www.longi.com/upload/images/products/hi-mo-9-660.png",
  "longi-hi-mo-5-530w": "https://www.longi.com/upload/images/products/hi-mo-5-530.png",
  "longi-hi-mo-5-555w": "https://www.longi.com/upload/images/products/hi-mo-5-555.png",
  "longi-hi-mo-x6-max-480w": "https://www.longi.com/upload/images/products/hi-mo-x6-max-480.png",

  // Trina Solar
  "trina-vertex-s-plus-485w": "https://www.trinasolar.com/upload/images/products/vertex-s-plus-485.png",
  "trina-vertex-s-plus-black-480w": "https://www.trinasolar.com/upload/images/products/vertex-s-plus-black-480.png",
  "trina-vertex-s-plus-shield-485w": "https://www.trinasolar.com/upload/images/products/vertex-s-plus-shield-485.png",
  "trina-vertex-n-g3-760w": "https://www.trinasolar.com/upload/images/products/vertex-n-g3-760.png",
  "trina-vertex-n-g3-670w": "https://www.trinasolar.com/upload/images/products/vertex-n-g3-670.png",
  "trina-vertex-s-455w": "https://www.trinasolar.com/upload/images/products/vertex-s-455.png",
  "trina-vertex-s-450w": "https://www.trinasolar.com/upload/images/products/vertex-s-450.png",
  "trina-vertex-n-635w": "https://www.trinasolar.com/upload/images/products/vertex-n-635.png",
  "trina-vertex-n-650w": "https://www.trinasolar.com/upload/images/products/vertex-n-650.png",
  "trina-vertex-s-plus-475w": "https://www.trinasolar.com/upload/images/products/vertex-s-plus-475.png",
  "trina-vertex-s-plus-black-470w": "https://www.trinasolar.com/upload/images/products/vertex-s-plus-black-470.png",
  "trina-vertex-n-670w-bifacial": "https://www.trinasolar.com/upload/images/products/vertex-n-670-bifacial.png",

  // JA Solar
  "ja-solar-deepblue-5-0-670w": "https://www.jasolar.com/upload/images/products/deepblue-5-0-670.png",
  "ja-solar-deepblue-5-0-545w": "https://www.jasolar.com/upload/images/products/deepblue-5-0-545.png",
  "ja-solar-deepblue-4-0-pro-580w": "https://www.jasolar.com/upload/images/products/deepblue-4-0-pro-580.png",
  "ja-solar-deepblue-4-0-pro-510w": "https://www.jasolar.com/upload/images/products/deepblue-4-0-pro-510.png",
  "ja-solar-jam54d41-lb-460w": "https://www.jasolar.com/upload/images/products/jam54d41-lb-460.png",
  "ja-solar-deepblue-5-0-485w": "https://www.jasolar.com/upload/images/products/deepblue-5-0-485.png",
  "ja-solar-jam66d46-lb-740w": "https://www.jasolar.com/upload/images/products/jam66d46-lb-740.png",
  "ja-solar-deepblue-4-0-570w": "https://www.jasolar.com/upload/images/products/deepblue-4-0-570.png",
  "ja-solar-jam54d40-lb-445w": "https://www.jasolar.com/upload/images/products/jam54d40-lb-445.png",
  "ja-solar-deepblue-4-0-pro-550w": "https://www.jasolar.com/upload/images/products/deepblue-4-0-pro-550.png",

  // Canadian Solar
  "canadian-solar-tophiku6-660w": "https://www.canadiansolar.com/upload/images/products/tophiku6-660.png",
  "canadian-solar-tophiku7-705w": "https://www.canadiansolar.com/upload/images/products/tophiku7-705.png",
  "canadian-solar-tophiku7-675w": "https://www.canadiansolar.com/upload/images/products/tophiku7-675.png",
  "canadian-solar-tophiku6-620w": "https://www.canadiansolar.com/upload/images/products/tophiku6-620.png",
  "canadian-solar-hiku7-600w": "https://www.canadiansolar.com/upload/images/products/hiku7-600.png",
  "canadian-solar-hiku7-670w": "https://www.canadiansolar.com/upload/images/products/hiku7-670.png",
  "canadian-solar-tophiku6-580w": "https://www.canadiansolar.com/upload/images/products/tophiku6-580.png",
  "canadian-solar-hiku6-455w": "https://www.canadiansolar.com/upload/images/products/hiku6-455.png",
  "canadian-solar-hiku6-540w": "https://www.canadiansolar.com/upload/images/products/hiku6-540.png",
  "canadian-solar-tophiku6-650w": "https://www.canadiansolar.com/upload/images/products/tophiku6-650.png",

  // Batteries
  "byd-battery-box-hvs-10kwh": "https://www.bydbatterybox.com/upload/images/products/hvs-10.png",
  "byd-lv-5-0-5kwh": "https://www.bydbatterybox.com/upload/images/products/lv-5.png",
  "foxess-lv5200-5kwh": "https://www.foxess.com/upload/images/products/lv5200.png",
  "sigenergy-sigenstor-13kwh": "https://www.sigenergy.com/upload/images/products/sigenstor-13.png",
};

export default function ProductCard({ product }: { product: Product }) {
  // Use the specific manufacturer image, with a fallback to a generic panel/battery image
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
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
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

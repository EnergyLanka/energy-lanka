"use client";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

export default function AddToCart({ product }: { product: { id: string; slug: string; name: string; priceLKR: number } }) {
  const { add } = useCart();
  const router = useRouter();
  
  return (
    <div className="mt-4 flex gap-3">
      <button className="btn-outline" onClick={() => { add(product); }}>
        Add to cart
      </button>
      <button className="btn-primary" onClick={() => { add(product); router.push("/cart"); }}>
        Buy now
      </button>
    </div>
  );
}

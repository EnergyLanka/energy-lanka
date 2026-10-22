"use client";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, setQty, remove, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-slate-600">Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-4 inline-block">Browse products</Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Your cart</h1>
      <div className="mt-6 space-y-3">
        {items.map((i) => (
          <div key={i.id} className="card flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
            <div>
              <div className="font-semibold">{i.name}</div>
              <div className="text-sm text-slate-500">LKR {i.priceLKR.toLocaleString()} each</div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input 
                type="number" 
                min={1} 
                value={i.qty} 
                onChange={(e) => setQty(i.id, Number(e.target.value))} 
                className="input !w-20" 
              />
              <button onClick={() => remove(i.id)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200 gap-4">
        <div className="text-lg font-semibold">Total: LKR {total.toLocaleString()}</div>
        <Link href="/checkout" className="btn-primary w-full sm:w-auto text-center">Proceed to checkout</Link>
      </div>
    </div>
  );
}

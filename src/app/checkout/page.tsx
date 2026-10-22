"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customer: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payhere/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate payment");

      // Build + submit PayHere form
      const f = document.createElement("form");
      f.method = "POST";
      f.action = data.checkoutUrl;
      Object.entries(data.payload).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v);
        f.appendChild(input);
      });
      document.body.appendChild(f);
      f.submit();
      clear();
    } catch (e: any) {
      alert(e.message);
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="mt-4 space-y-3">
          <input className="input" placeholder="Full name" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" placeholder="Phone (07XXXXXXXX)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea className="input" placeholder="Delivery address" rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <button onClick={submit} disabled={loading || !form.customer || !form.email || !form.phone} className="btn-primary mt-6 w-full">
          {loading ? "Redirecting to PayHere..." : `Pay LKR ${total.toLocaleString()} with PayHere`}
        </button>
        <p className="mt-2 text-xs text-slate-500">
          You will be redirected to PayHere (Card / Genie / FriMi / eZ Cash).
        </p>
      </div>
      <div className="card p-6 bg-slate-50">
        <h2 className="font-semibold">Order summary</h2>
        <div className="mt-3 space-y-2 text-sm">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>LKR {(i.priceLKR * i.qty).toLocaleString()}</span></div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t pt-3 font-bold"><span>Total</span><span>LKR {total.toLocaleString()}</span></div>
      </div>
    </div>
  );
}

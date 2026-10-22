"use client";
import { useState } from "react";

export default function AdminPage() {
  const [pwd, setPwd] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch(`/api/admin?pwd=${encodeURIComponent(pwd)}`);
    if (!res.ok) { alert("Invalid password"); return; }
    const data = await res.json();
    setOrders(data.orders); 
    setQuotes(data.quotes); 
    setAuthed(true);
  };

  const markPaid = async (orderId: string) => {
    const res = await fetch("/api/admin/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, pwd }),
    });
    if (res.ok) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: "paid" } : o));
    } else {
      alert("Failed to update status");
    }
  };

  if (!authed) {
    return (
      <div className="card mx-auto max-w-sm p-6 mt-10">
        <h1 className="text-xl font-bold">Admin login</h1>
        <p className="text-sm text-slate-500 mt-1">Enter the ADMIN_PASSWORD you set in Vercel.</p>
        <input type="password" className="input mt-3" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
        <button className="btn-primary mt-3 w-full" onClick={load}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <h2 className="mt-8 text-xl font-semibold">Paid Orders ({orders.length})</h2>
      <div className="mt-2 space-y-2">
        {orders.length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
        {orders.map((o) => (
          <div key={o.id} className="card flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 text-sm gap-2">
            <span className="font-semibold">{o.orderRef} — {o.customer} — {o.phone}</span>
            <div className="flex items-center gap-4">
              <span>LKR {o.totalLKR.toLocaleString()} · <b className={o.status === "paid" ? "text-green-600" : "text-amber-600"}>{o.status.toUpperCase()}</b></span>
              {o.status === "pending" && (
                <button onClick={() => markPaid(o.id)} className="bg-brand text-white px-3 py-1 rounded text-xs hover:bg-brand-dark transition">
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold">Quote Requests ({quotes.length})</h2>
      <div className="mt-2 space-y-2">
        {quotes.length === 0 && <p className="text-sm text-slate-500">No quote requests yet.</p>}
        {quotes.map((q) => (
          <div key={q.id} className="card p-4 text-sm">
            <div className="font-semibold">{q.name} — {q.phone} — {q.district}</div>
            <div className="text-slate-600 mt-1">{q.message}</div>
            <div className="text-xs text-slate-400 mt-2">Bill: LKR {q.monthlyBill || "N/A"} • {q.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

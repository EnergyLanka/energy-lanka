"use client";
import { useState } from "react";

export default function QuotePage() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", district: "", monthlyBill: "", message: "" });
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/quote", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(form) 
    });
    if (res.ok) setDone(true);
    else alert("Something went wrong. Please try again.");
  };
  
  if (done) return (
    <div className="card p-10 text-center">
      <h1 className="text-2xl font-bold">Thank you!</h1>
      <p className="mt-2 text-slate-600">Our team will contact you within 24 hours.</p>
    </div>
  );
  
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Request an installation quote</h1>
      <p className="mt-2 text-slate-600">Tell us about your home and we'll design a system with a full bill of materials and payback.</p>
      
      <form onSubmit={submit} className="card mt-6 space-y-3 p-6">
        <input required className="input" placeholder="Your name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required className="input" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required className="input" placeholder="District (e.g. Colombo)" onChange={(e) => setForm({ ...form, district: e.target.value })} />
        <input className="input" type="number" placeholder="Average monthly electricity bill (LKR)" onChange={(e) => setForm({ ...form, monthlyBill: e.target.value })} />
        <textarea className="input" rows={3} placeholder="Tell us about your roof, goals, etc." onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button className="btn-primary w-full">Submit request</button>
      </form>
    </div>
  );
}

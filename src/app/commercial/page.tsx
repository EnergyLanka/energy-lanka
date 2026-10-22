import Link from "next/link";

export default function CommercialPage() {
  return (
    <div className="bg-white">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl mx-4 mt-4">
        <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000" alt="Commercial Solar" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand/80 mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Commercial & Industrial</h1>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">Reduce operational costs, achieve ESG goals, and secure your energy independence with industrial-grade solar arrays.</p>
          <Link href="/quote" className="btn-gold px-10 py-4 text-lg">Request a Consultation</Link>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto py-24 px-4 text-center">
        <h2 className="text-3xl font-serif text-brand mb-6">Why Choose Energy Lanka for Business?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 border border-slate-100 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl text-brand mb-3">Tax Incentives</h3>
            <p className="text-slate-500 text-sm">Leverage accelerated depreciation and tax benefits for renewable energy investments in Sri Lanka.</p>
          </div>
          <div className="p-6 border border-slate-100 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl text-brand mb-3">Scalable Architecture</h3>
            <p className="text-slate-500 text-sm">From 50kW factory rooftops to multi-megawatt ground mounts, we engineer systems that grow with your business.</p>
          </div>
          <div className="p-6 border border-slate-100 rounded-xl shadow-sm">
            <h3 className="font-bold text-xl text-brand mb-3">Zero Downtime</h3>
            <p className="text-slate-500 text-sm">Our commercial batteries ensure your critical operations continue running during grid outages.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

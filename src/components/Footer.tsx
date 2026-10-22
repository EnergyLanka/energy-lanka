export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="text-lg font-bold text-brand">⚡ Energy Lanka</div>
          <p className="mt-2 text-sm text-slate-600">Tier-1 solar panels and batteries delivered and installed across Sri Lanka.</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Policies</div>
          <p className="mt-2 text-slate-600">Net Plus feed-in: LKR 23.11–45.53/kWh<br/>Battery bonus for solar+storage systems.</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Contact</div>
          <p className="mt-2 text-slate-600">info@energylanka.com<br/>+94 11 XXX XXXX<br/>Colombo, Sri Lanka</p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Energy Lanka. Prices in LKR and may exclude import duty/VAT.
      </div>
    </footer>
  );
}

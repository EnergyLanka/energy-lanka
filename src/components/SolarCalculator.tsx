"use client";
import { useMemo, useState } from "react";
import { TARIFFS } from "@/lib/tariffs";

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(25000);
  const [hasBattery, setHasBattery] = useState(true);

  const result = useMemo(() => {
    const safeBill = isNaN(monthlyBill) || monthlyBill <= 0 ? 1 : monthlyBill;
    const monthlyKWh = safeBill / TARIFFS.avgImportTariff;
    const systemKW = monthlyKWh / (30 * TARIFFS.peakSunHours * TARIFFS.systemEfficiency);
    const cappedKW = Math.min(Math.max(systemKW, 1), 40);

    const panelCost = cappedKW * TARIFFS.installedCostPerKW;
    const batteryKWh = hasBattery ? Math.min(Math.max(monthlyKWh * 0.4, 5), 20) : 0;
    const batteryCost = batteryKWh * TARIFFS.batteryCostPerKWh;
    const totalCost = panelCost + batteryCost;

    const monthlySavings = safeBill * 0.9;
    const monthlyGen = cappedKW * 30 * TARIFFS.peakSunHours * TARIFFS.systemEfficiency;
    const exportKWh = monthlyGen * 0.3;
    const exportRate = hasBattery
      ? TARIFFS.batteryBonus
      : cappedKW <= 10
      ? TARIFFS.netPlusUpTo10kW
      : TARIFFS.netPlus10to40kW;
    const monthlyExport = exportKWh * exportRate;
    const monthlyBenefit = monthlySavings + monthlyExport;
    const paybackYears = monthlyBenefit > 0 ? totalCost / (monthlyBenefit * 12) : 0;

    return {
      systemKW: cappedKW.toFixed(1),
      batteryKWh: batteryKWh.toFixed(1),
      totalCost: Math.round(totalCost),
      monthlySavings: Math.round(monthlySavings),
      monthlyExport: Math.round(monthlyExport),
      monthlyBenefit: Math.round(monthlyBenefit),
      paybackYears: paybackYears.toFixed(1),
      exportRate,
    };
  }, [monthlyBill, hasBattery]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6 bg-white">
        <h2 className="text-xl font-bold text-brand">Your details</h2>
        <label className="mt-4 block text-sm font-medium text-slate-700">Monthly electricity bill (LKR)</label>
        <input 
          type="number" 
          value={monthlyBill || ""} 
          onChange={(e) => setMonthlyBill(Number(e.target.value))} 
          className="input mt-1" 
        />
        <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={hasBattery} onChange={(e) => setHasBattery(e.target.checked)} className="accent-gold w-4 h-4" />
          I want battery storage (unlocks LKR {TARIFFS.batteryBonus}/kWh export bonus)
        </label>
        <p className="mt-4 text-xs text-slate-500">
          Estimates assume {TARIFFS.peakSunHours} peak sun hrs/day, 80% system efficiency, and a{" "}
          {TARIFFS.avgImportTariff} LKR/kWh average import tariff. Actual quotes may vary.
        </p>
      </div>

      {/* FORCED DARK BACKGROUND USING INLINE STYLE */}
      <div 
        className="rounded-xl p-6 text-white shadow-xl ring-1 ring-brand-dark" 
        style={{ backgroundColor: "#0A192F" }}
      >
        <h2 className="text-xl font-bold font-serif" style={{ color: "#D4AF37" }}>Your estimated system</h2>
        <div className="mt-4 space-y-3 text-sm">
          <Row label="Recommended system size" value={`${result.systemKW} kW`} />
          {hasBattery && <Row label="Suggested battery" value={`${result.batteryKWh} kWh`} />}
          <Row label="Estimated installed cost" value={`LKR ${result.totalCost.toLocaleString()}`} />
          <Row label="Monthly savings on bill" value={`LKR ${result.monthlySavings.toLocaleString()}`} />
          <Row label={`Export earnings @ LKR ${result.exportRate}/kWh`} value={`LKR ${result.monthlyExport.toLocaleString()}/mo`} />
          <Row label="Total monthly benefit" value={`LKR ${result.monthlyBenefit.toLocaleString()}`} />
          <div className="mt-6 rounded-xl p-4 border border-white/20" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            <div className="text-4xl font-serif font-bold" style={{ color: "#D4AF37" }}>{result.paybackYears} <span className="text-2xl">years</span></div>
            <div className="text-white/80 text-xs uppercase tracking-widest mt-1">Estimated payback period</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span className="text-slate-300">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

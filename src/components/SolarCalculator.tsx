"use client";
import { useMemo, useState } from "react";
import { TARIFFS } from "@/lib/tariffs";

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(15000);
  const [hasBattery, setHasBattery] = useState(true);

  const result = useMemo(() => {
    // Estimate monthly kWh from bill
    const monthlyKWh = monthlyBill / TARIFFS.avgImportTariff;
    // Size system
    const systemKW = monthlyKWh / (30 * TARIFFS.peakSunHours * TARIFFS.systemEfficiency);
    const cappedKW = Math.min(Math.max(systemKW, 1), 40);

    // Cost estimate
    const panelCost = cappedKW * TARIFFS.installedCostPerKW;
    const batteryKWh = hasBattery ? Math.min(Math.max(monthlyKWh * 0.4, 5), 20) : 0;
    const batteryCost = batteryKWh * TARIFFS.batteryCostPerKWh;
    const totalCost = panelCost + batteryCost;

    // Savings (self-consumption assumed 90%)
    const monthlySavings = monthlyBill * 0.9;

    // Export earnings: 30% of generation exported
    const monthlyGen = cappedKW * 30 * TARIFFS.peakSunHours * TARIFFS.systemEfficiency;
    const exportKWh = monthlyGen * 0.3;
    const exportRate = hasBattery
      ? TARIFFS.batteryBonus
      : cappedKW <= 10
      ? TARIFFS.netPlusUpTo10kW
      : TARIFFS.netPlus10to40kW;
    const monthlyExport = exportKWh * exportRate;

    const monthlyBenefit = monthlySavings + monthlyExport;
    const paybackYears = totalCost / (monthlyBenefit * 12);

    return {
      systemKW: cappedKW.toFixed(1),
      batteryKWh: batteryKWh.toFixed(1),
      totalCost,
      monthlySavings: Math.round(monthlySavings),
      monthlyExport: Math.round(monthlyExport),
      monthlyBenefit: Math.round(monthlyBenefit),
      paybackYears: paybackYears.toFixed(1),
      exportRate,
    };
  }, [monthlyBill, hasBattery]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h2 className="text-xl font-bold">Your details</h2>
        <label className="mt-4 block text-sm font-medium">Monthly electricity bill (LKR)</label>
        <input type="number" value={monthlyBill} onChange={(e) => setMonthlyBill(Number(e.target.value))} className="input mt-1" />
        <label className="mt-4 flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={hasBattery} onChange={(e) => setHasBattery(e.target.checked)} />
          I want battery storage (unlocks LKR {TARIFFS.batteryBonus}/kWh export bonus)
        </label>
        <p className="mt-4 text-xs text-slate-500">
          Estimates assume {TARIFFS.peakSunHours} peak sun hrs/day, 80% system efficiency, and a{" "}
          {TARIFFS.avgImportTariff} LKR/kWh average import tariff. Actual quotes may vary.
        </p>
      </div>

      <div className="card bg-brand p-6 text-white">
        <h2 className="text-xl font-bold">Your estimated system</h2>
        <div className="mt-4 space-y-3 text-sm">
          <Row label="Recommended system size" value={`${result.systemKW} kW`} />
          {hasBattery && <Row label="Suggested battery" value={`${result.batteryKWh} kWh`} />}
          <Row label="Estimated installed cost" value={`LKR ${result.totalCost.toLocaleString()}`} />
          <Row label="Monthly savings on bill" value={`LKR ${result.monthlySavings.toLocaleString()}`} />
          <Row label={`Export earnings @ LKR ${result.exportRate}/kWh`} value={`LKR ${result.monthlyExport.toLocaleString()}/mo`} />
          <Row label="Total monthly benefit" value={`LKR ${result.monthlyBenefit.toLocaleString()}`} />
          <div className="mt-4 rounded-xl bg-white/10 p-4">
            <div className="text-3xl font-bold">{result.paybackYears} years</div>
            <div className="text-white/80">Estimated payback period</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span className="text-white/80">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

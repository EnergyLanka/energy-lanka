import SolarCalculator from "@/components/SolarCalculator";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ROI Calculator</h1>
      <p className="mt-2 text-slate-600">See your estimated payback under Sri Lanka's 2026 Net Plus scheme.</p>
      <div className="mt-8"><SolarCalculator /></div>
    </div>
  );
}

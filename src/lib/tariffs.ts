export const TARIFFS = {
  // Net Plus feed-in tariffs (2026)
  netPlusUpTo10kW: 23.11,       // LKR/kWh
  netPlus10to40kW: 19.15,       // LKR/kWh
  batteryBonus: 45.53,          // LKR/kWh — for solar+storage systems
  
  // Assumptions for the calculator
  avgImportTariff: 45.0,        // LKR/kWh average domestic rate
  peakSunHours: 4.5,            // Sri Lanka average
  systemEfficiency: 0.80,       // losses
  installedCostPerKW: 150000,   // LKR per kW fully installed (approx)
  batteryCostPerKWh: 150000,    // LKR per kWh storage (approx)
};

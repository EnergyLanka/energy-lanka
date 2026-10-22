import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = [
    { slug: "aiko-comet-3n72-675w", name: "AIKO Comet 3N72 675W", brand: "AIKO", category: "panel", priceLKR: 32500, capacityW: 675, efficiency: 25.0, warrantyYrs: 25, badge: "World's Most Efficient", description: "Back-contact (BC) module with 25.0% mass-production efficiency.", specs: JSON.stringify({ technology: "Back Contact (BC)", power: "675 W", efficiency: "25.0%", warranty: "25 yr" }) },
    { slug: "longi-ecolife-510w", name: "LONGi EcoLife 510W", brand: "LONGi", category: "panel", priceLKR: 27000, capacityW: 510, efficiency: 25.0, warrantyYrs: 25, badge: "Top Tier", description: "HIBC technology with 25.0% efficiency. Excellent low-light performance.", specs: JSON.stringify({ technology: "HIBC", power: "510 W", efficiency: "25.0%" }) },
    { slug: "ja-solar-deepblue-580w", name: "JA Solar DeepBlue 5.0 580W", brand: "JA Solar", category: "panel", priceLKR: 23000, capacityW: 580, efficiency: 24.1, warrantyYrs: 25, badge: "Best Value", description: "TOPCon technology with strong value per watt for residential installations.", specs: JSON.stringify({ technology: "TOPCon", power: "580 W", efficiency: "24.1%" }) },
    { slug: "tesla-powerwall-3", name: "Tesla Powerwall 3", brand: "Tesla", category: "battery", priceLKR: 2700000, capacityW: 13500, warrantyYrs: 10, badge: "Best All-Round", description: "All-in-one battery + inverter. 13.5 kWh usable.", specs: JSON.stringify({ capacity: "13.5 kWh", power: "11.5 kW", chemistry: "LFP" }) },
    { slug: "byd-battery-box-hvs", name: "BYD Battery-Box Premium HVS 10.2 kWh", brand: "BYD", category: "battery", priceLKR: 1850000, capacityW: 10200, warrantyYrs: 10, badge: "Best Compatibility", description: "Modular LFP battery compatible with SMA, Fronius, Victron.", specs: JSON.stringify({ capacity: "10.2 kWh", chemistry: "LFP" }) },
    { slug: "sigenergy-sigenstor-13kwh", name: "Sigenergy SigenStor 13 kWh", brand: "Sigenergy", category: "battery", priceLKR: 2650000, capacityW: 13000, warrantyYrs: 10, badge: "Most Flexible", description: "Fully modular architecture.", specs: JSON.stringify({ capacity: "13 kWh", chemistry: "LFP" }) },
    { slug: "pylontech-force-h2-14kwh", name: "Pylontech FORCE H2 14.2 kWh", brand: "Pylontech", category: "battery", priceLKR: 1600000, capacityW: 14200, warrantyYrs: 10, badge: "Best Value / kWh", description: "Lowest cost per kWh among tier-1 home batteries.", specs: JSON.stringify({ capacity: "14.21 kWh", chemistry: "LFP" }) },
    { slug: "huawei-luna2000-15kwh", name: "Huawei LUNA2000 15 kWh", brand: "Huawei", category: "battery", priceLKR: 2400000, capacityW: 15000, warrantyYrs: 10, description: "Seamless integration with Huawei SUN2000 inverters.", specs: JSON.stringify({ capacity: "15 kWh", chemistry: "LFP" }) }
  ];

  try {
    // Clear any existing products to avoid duplicates
    await prisma.product.deleteMany({});
    // Insert all the new products
    await prisma.product.createMany({ data: products });
    return NextResponse.json({ message: "Database seeded successfully! You can now go back to your website." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

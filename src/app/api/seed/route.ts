import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = [
    // ==========================================
    // --- SOLAR PANELS: AIKO ---
    // ==========================================
    {
      slug: "aiko-neostar-3s-475w",
      name: "AIKO Neostar 3S 475W",
      brand: "AIKO",
      category: "panel",
      priceLKR: 36500,
      capacityW: 475,
      efficiency: 23.8,
      warrantyYrs: 25,
      badge: "Most Efficient Residential",
      description: "3rd-generation N-Type ABC (All Back Contact) technology. Full-black design with no visible busbars, offering premium aesthetics for high-end residential rooftops.",
      specs: JSON.stringify({ technology: "N-Type ABC", power: "475 W", efficiency: "23.8%", dimensions: "1762×1134×30 mm", weight: "20.6 kg", tempCoeff: "-0.26%/°C" }),
    },
    {
      slug: "aiko-comet-3n72-675w",
      name: "AIKO Comet 3N72 675W",
      brand: "AIKO",
      category: "panel",
      priceLKR: 45000,
      capacityW: 675,
      efficiency: 25.0,
      warrantyYrs: 25,
      badge: "World's Most Efficient",
      description: "Back-contact (BC) module with world-leading 25.0% mass-production efficiency. Premium choice for maximum power density on commercial and industrial rooftops.",
      specs: JSON.stringify({ technology: "Back Contact (BC)", power: "675 W", efficiency: "25.0%", dimensions: "2382×1134×30 mm", warranty: "25 yr product / 30 yr performance" }),
    },

    // ==========================================
    // --- SOLAR PANELS: JINKO SOLAR ---
    // ==========================================
    {
      slug: "jinko-tiger-neo-3-0-670w",
      name: "Jinko Tiger Neo 3.0 670W",
      brand: "Jinko Solar",
      category: "panel",
      priceLKR: 42500,
      capacityW: 670,
      efficiency: 24.8,
      warrantyYrs: 12,
      badge: "Best Seller",
      description: "Industry-leading TOPCon module with a massive 85% bifaciality and low temperature coefficient. Designed for utility-scale and large commercial projects.",
      specs: JSON.stringify({ technology: "N-Type TOPCon", power: "650-670 W", efficiency: "24.8%", dimensions: "2382×1134×30 mm", weight: "32.5 kg", tempCoeff: "-0.26%/°C" }),
    },
    {
      slug: "jinko-tiger-neo-3-0-485w",
      name: "Jinko Tiger Neo 3.0 485W",
      brand: "Jinko Solar",
      category: "panel",
      priceLKR: 36000,
      capacityW: 485,
      efficiency: 24.27,
      warrantyYrs: 12,
      badge: "Premium Black",
      description: "All-black dual-glass residential module. Combines high power output with a sleek, modern aesthetic that blends perfectly into dark rooftops.",
      specs: JSON.stringify({ technology: "TOPCon", power: "485 W", efficiency: "24.27%", dimensions: "1762×1134×30 mm", weight: "21.5 kg" }),
    },

    // ==========================================
    // --- SOLAR PANELS: LONGi ---
    // ==========================================
    {
      slug: "longi-hi-mo-x6-max-615w",
      name: "LONGi Hi-MO X6 Max 615W",
      brand: "LONGi",
      category: "panel",
      priceLKR: 39000,
      capacityW: 615,
      efficiency: 22.8,
      warrantyYrs: 15,
      badge: "Top Tier Commercial",
      description: "Featuring HPBC cell technology and a unique anti-dust frame design. Excellent reliability and stable operation under harsh conditions.",
      specs: JSON.stringify({ technology: "HPBC", power: "615 W", efficiency: "22.8%", dimensions: "2382×1134×30 mm", weight: "28.5 kg", warranty: "15 yr product / 25 yr performance" }),
    },
    {
      slug: "longi-hi-mo-x6-guardian-600w",
      name: "LONGi Hi-MO X6 Guardian 600W",
      brand: "LONGi",
      category: "panel",
      priceLKR: 37500,
      capacityW: 600,
      efficiency: 23.2,
      warrantyYrs: 25,
      badge: "Anti-Dust",
      description: "Engineered for commercial color-steel tile roofs and small-angle installations. The unique frame design effectively reduces dust accumulation.",
      specs: JSON.stringify({ technology: "HPBC", power: "600 W", efficiency: "23.2%", dimensions: "2281×1134×30 mm", weight: "27.2 kg" }),
    },

    // ==========================================
    // --- SOLAR PANELS: TRINA SOLAR ---
    // ==========================================
    {
      slug: "trina-vertex-s-plus-485w",
      name: "Trina Vertex S+ 485W",
      brand: "Trina Solar",
      category: "panel",
      priceLKR: 34500,
      capacityW: 485,
      efficiency: 24.3,
      warrantyYrs: 25,
      badge: "Best Residential",
      description: "Third-generation i-TOPCon Ultra technology. Lightweight, high-power residential module with a low-voltage, high-current design for longer strings.",
      specs: JSON.stringify({ technology: "N-Type i-TOPCon Ultra", power: "485 W", efficiency: "24.3%", dimensions: "1762×1134×30 mm", weight: "21.1 kg", degradation: "0.35%/year" }),
    },
    {
      slug: "trina-vertex-s-plus-black-480w",
      name: "Trina Vertex S+ G3 Full Black 480W",
      brand: "Trina Solar",
      category: "panel",
      priceLKR: 35000,
      capacityW: 480,
      efficiency: 24.0,
      warrantyYrs: 25,
      badge: "All Black",
      description: "Fully black residential module designed for premium rooftops. Delivers 24% efficiency with an elegant, uniform appearance.",
      specs: JSON.stringify({ technology: "N-Type i-TOPCon Ultra", power: "480 W", efficiency: "24.0%", dimensions: "1762×1134×30 mm" }),
    },

    // ==========================================
    // --- SOLAR PANELS: JA SOLAR ---
    // ==========================================
    {
      slug: "ja-solar-deepblue-5-0-670w",
      name: "JA Solar DeepBlue 5.0 670W",
      brand: "JA Solar",
      category: "panel",
      priceLKR: 41000,
      capacityW: 670,
      efficiency: 24.8,
      warrantyYrs: 12,
      badge: "Highest Power",
      description: "Fifth-generation TOPCon platform with a bezel-free full-screen design. Delivers up to 20W more power and enhanced durability under wind and snow loads.",
      specs: JSON.stringify({ technology: "N-Type TOPCon", power: "670 W", efficiency: "24.8%", dimensions: "2382×1134×30 mm", weight: "33.1 kg", bifaciality: "85%" }),
    },
    {
      slug: "ja-solar-deepblue-4-0-pro-580w",
      name: "JA Solar DeepBlue 4.0 Pro 580W",
      brand: "JA Solar",
      category: "panel",
      priceLKR: 31000,
      capacityW: 580,
      efficiency: 22.5,
      warrantyYrs: 12,
      badge: "Best Value",
      description: "Proven half-cut cell architecture suitable for large-scale installations. Excellent cost-efficiency and long-term reliability for C&I rooftops.",
      specs: JSON.stringify({ technology: "N-Type TOPCon", power: "580 W", efficiency: "22.5%", dimensions: "2278×1134×30 mm", degradation: "0.4%/year" }),
    },

    // ==========================================
    // --- SOLAR PANELS: CANADIAN SOLAR ---
    // ==========================================
    {
      slug: "canadian-solar-tophiku6-660w",
      name: "Canadian Solar TOPBiHiKu6 660W",
      brand: "Canadian Solar",
      category: "panel",
      priceLKR: 40000,
      capacityW: 660,
      efficiency: 24.4,
      warrantyYrs: 12,
      badge: "Commercial Grade",
      description: "Latest TOPCon 2.0 cell technology with dual-glass construction. Excellent bifaciality for utility and commercial systems.",
      specs: JSON.stringify({ technology: "TOPCon 2.0", power: "630-660 W", efficiency: "24.4%", dimensions: "2384×1134×30 mm", weight: "32.3 kg" }),
    },
    {
      slug: "canadian-solar-hiku6-600w",
      name: "Canadian Solar HiKu6 600W",
      brand: "Canadian Solar",
      category: "panel",
      priceLKR: 31500,
      capacityW: 600,
      efficiency: 22.5,
      warrantyYrs: 25,
      description: "Reliable TOPCon panel from a globally trusted brand. A solid, cost-effective choice for commercial and industrial systems.",
      specs: JSON.stringify({ technology: "TOPCon", power: "600 W", efficiency: "22.5%" }),
    },

    // ==========================================
    // --- BATTERIES ---
    // ==========================================
    {
      slug: "byd-battery-box-hvs-10kwh",
      name: "BYD Battery-Box Premium HVS 10.2 kWh",
      brand: "BYD",
      category: "battery",
      priceLKR: 1950000,
      capacityW: 10200,
      warrantyYrs: 10,
      badge: "Best All-Round",
      description: "High-voltage, scalable LFP battery. Modular design (5.1–22.1 kWh) and compatible with most major inverters.",
      specs: JSON.stringify({ capacity: "10.2 kWh (modular)", chemistry: "LFP", type: "High Voltage" }),
    },
    {
      slug: "byd-lv-5-0-5kwh",
      name: "BYD LV 5.0 5.1 kWh",
      brand: "BYD",
      category: "battery",
      priceLKR: 980000,
      capacityW: 5100,
      warrantyYrs: 10,
      badge: "Residential Compact",
      description: "Compact and modular low-voltage battery. Perfect for residential energy storage and backup.",
      specs: JSON.stringify({ capacity: "5.1 kWh", chemistry: "LFP", type: "Low Voltage" }),
    },
    {
      slug: "foxess-lv5200-5kwh",
      name: "FoxESS LV5200 5.1 kWh",
      brand: "FoxESS",
      category: "battery",
      priceLKR: 330000,
      capacityW: 5100,
      warrantyYrs: 10,
      badge: "Best Value / kWh",
      description: "A reliable and affordable low-voltage battery option. A popular choice for entry-level storage systems.",
      specs: JSON.stringify({ capacity: "5.1 kWh", chemistry: "LFP", type: "Low Voltage" }),
    },
    {
      slug: "sigenergy-sigenstor-13kwh",
      name: "Sigenergy SigenStor 13 kWh",
      brand: "Sigenergy",
      category: "battery",
      priceLKR: 2750000,
      capacityW: 13000,
      warrantyYrs: 10,
      badge: "Most Flexible",
      description: "Fully modular architecture. Expand battery, inverter, or gateway independently for ultimate system design flexibility.",
      specs: JSON.stringify({ capacity: "13 kWh (expandable)", chemistry: "LFP" }),
    },
  ];

  try {
    // Delete dependent records first to prevent foreign key errors
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    // Delete old products
    await prisma.product.deleteMany({});
    // Insert the new real products
    await prisma.product.createMany({ data: products });
    
    return NextResponse.json({ message: "Database seeded with 18 panels and 4 batteries successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

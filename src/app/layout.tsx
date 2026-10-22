import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

export const metadata = {
  title: "Energy Lanka — Tier-1 Solar Panels & Batteries",
  description: "Buy AIKO, LONGi, JA Solar panels and Tesla, BYD, Sigenergy batteries with islandwide installation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

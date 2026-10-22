import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage({
  searchParams,
}: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  const products = await prisma.product.findMany({
    where: category ? { category } : {},
    orderBy: [{ category: "asc" }, { priceLKR: "asc" }],
  });

  const tabs = [
    { label: "All", value: "" },
    { label: "Solar Panels", value: "panel" },
    { label: "Batteries", value: "battery" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <a
            key={t.value}
            href={t.value ? `/products?category=${t.value}` : "/products"}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              (category ?? "") === t.value ? "bg-brand text-white" : "bg-white ring-1 ring-slate-200"
            }`}
          >{t.label}</a>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

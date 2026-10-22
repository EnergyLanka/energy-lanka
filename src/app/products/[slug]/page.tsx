import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCart from "./AddToCart";
import ProductImage from "@/components/ProductImage";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();
  const specs = JSON.parse(product.specs) as Record<string, string>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="group flex h-80 items-center justify-center rounded-3xl bg-slate-100 p-6">
        <ProductImage slug={product.slug} alt={product.name} />
      </div>
      <div>
        {product.badge && <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{product.badge}</span>}
        <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
        <p className="mt-1 text-slate-500">{product.brand}</p>
        <p className="mt-4 text-slate-700">{product.description}</p>

        <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <div className="text-2xl font-bold text-brand">LKR {product.priceLKR.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Incl. equipment. Installation quoted separately.</div>
        </div>

        <AddToCart product={{ id: product.id, slug: product.slug, name: product.name, priceLKR: product.priceLKR }} />

        <div className="mt-6">
          <h2 className="font-semibold">Specifications</h2>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {Object.entries(specs).map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                <dt className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

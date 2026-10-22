import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { payHereCheckoutHash, PAYHERE_CHECKOUT_URL } from "@/lib/payhere";

const schema = z.object({
  customer: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  address: z.string().optional().default(""),
  items: z.array(z.object({ productId: z.string(), qty: z.number().min(1) })).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

    const { customer, email, phone, address, items } = parsed.data;
    const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });

    let total = 0;
    const orderItems = items.map((i) => {
      const p = products.find((x) => x.id === i.productId);
      if (!p) throw new Error("Unknown product");
      total += p.priceLKR * i.qty;
      return { productId: p.id, qty: i.qty, priceLKR: p.priceLKR };
    });

    const orderRef = `SLK-${Date.now()}`;
    const order = await prisma.order.create({
      data: {
        orderRef,
        customer,
        email,
        phone,
        address: address || "—",
        totalLKR: total,
        items: { create: orderItems },
      },
    });

    const [first, ...rest] = customer.split(" ");
    const payload = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID || "1210000",
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/quote?paid=1&ref=${order.orderRef}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?cancelled=1`,
      notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payhere/notify`,
      order_id: order.orderRef,
      items: orderItems.map((i) => products.find((p) => p.id === i.productId)!.name).join(", "),
      currency: "LKR",
      amount: total.toFixed(2),
      first_name: first || "Customer",
      last_name: rest.join(" ") || "",
      email,
      phone,
      address: address || "Colombo",
      city: "Colombo",
      country: "Sri Lanka",
      hash: payHereCheckoutHash(order.orderRef, total),
    };

    return NextResponse.json({
      checkoutUrl: PAYHERE_CHECKOUT_URL(process.env.PAYHERE_MODE !== "live"),
      payload,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

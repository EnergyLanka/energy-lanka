import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayHereNotify } from "@/lib/payhere";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body: Record<string, string> = {};
    formData.forEach((v, k) => (body[k] = String(v)));

    if (!verifyPayHereNotify(body)) {
      console.warn("PayHere signature mismatch", body.order_id);
      return NextResponse.json({ error: "invalid signature" }, { status: 400 });
    }

    let status = "pending";
    if (body.status_code === "2") status = "paid";
    else if (body.status_code === "-1" || body.status_code === "-2" || body.status_code === "-3") status = "failed";

    await prisma.order.updateMany({
      where: { orderRef: body.order_id },
      data: { status, paymentId: body.payment_id },
    });
    
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

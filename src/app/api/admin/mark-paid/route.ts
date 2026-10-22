import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { orderId, pwd } = await req.json();
  if (pwd !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "auth" }, { status: 401 });
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid" },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

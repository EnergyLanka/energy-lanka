import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.quoteRequest.create({
      data: {
        name: body.name, 
        email: body.email, 
        phone: body.phone, 
        district: body.district,
        monthlyBill: body.monthlyBill ? Number(body.monthlyBill) : null,
        message: body.message || "",
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

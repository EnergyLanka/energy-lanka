import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get("pwd");
  if (pwd !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "auth" }, { status: 401 });
  
  const [orders, quotes] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  return NextResponse.json({ orders, quotes });
}

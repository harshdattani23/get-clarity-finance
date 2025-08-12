import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        virtualCash: true,
      },
    });

    const holdings = await db.portfolioHolding.findMany({
      where: {
        userClerkId: userId,
      },
    });

    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      virtualCash: user.virtualCash,
      holdings,
    });
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

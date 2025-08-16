import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let watchlist = await db.watchlist.findFirst({
      where: { userClerkId: userId },
      include: { items: true },
    });

    if (!watchlist) {
      await db.watchlist.create({
        data: {
          userClerkId: userId,
          name: "My Watchlist",
        },
      });
      watchlist = await db.watchlist.findFirst({
        where: { userClerkId: userId },
        include: { items: true },
      });
    }

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("[WATCHLIST_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

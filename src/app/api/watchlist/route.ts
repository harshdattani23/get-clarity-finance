import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const watchlist = await db.watchlist.findMany({
      where: {
        userClerkId: userId,
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("[WATCHLIST_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { ticker } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!ticker) {
      return new NextResponse("Ticker is required", { status: 400 });
    }

    const watchlistItem = await db.watchlist.create({
      data: {
        userClerkId: userId,
        ticker,
      },
    });

    return NextResponse.json(watchlistItem);
  } catch (error) {
    console.error("[WATCHLIST_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { ticker } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!ticker) {
      return new NextResponse("Ticker is required", { status: 400 });
    }

    await db.watchlist.delete({
      where: {
        userClerkId_ticker: {
          userClerkId: userId,
          ticker,
        },
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("[WATCHLIST_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

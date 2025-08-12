import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let watchlists = await db.watchlist.findMany({
      where: {
        userClerkId: userId,
      },
      include: {
        items: true,
      },
    });

    if (watchlists.length === 0) {
      await db.watchlist.createMany({
        data: [
          { name: "Watchlist 1", userClerkId: userId },
          { name: "Watchlist 2", userClerkId: userId },
          { name: "Watchlist 3", userClerkId: userId },
        ],
      });
      watchlists = await db.watchlist.findMany({
        where: {
          userClerkId: userId,
        },
        include: {
          items: true,
        },
      });
    }

    return NextResponse.json(watchlists);
  } catch (error) {
    console.error("[WATCHLISTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userWatchlistCount = await db.watchlist.count({
      where: { userClerkId: userId },
    });

    if (userWatchlistCount >= 3) {
      return new NextResponse("You can only have a maximum of 3 watchlists.", {
        status: 403,
      });
    }

    const { name } = await req.json();

    const watchlist = await db.watchlist.create({
      data: {
        userClerkId: userId,
        name: name || "My Watchlist",
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("[WATCHLIST_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, newName } = await req.json();

    const watchlist = await db.watchlist.update({
      where: {
        id: id,
        userClerkId: userId,
      },
      data: {
        name: newName,
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("[WATCHLIST_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    await db.watchlist.delete({
      where: {
        id: id,
        userClerkId: userId,
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("[WATCHLIST_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

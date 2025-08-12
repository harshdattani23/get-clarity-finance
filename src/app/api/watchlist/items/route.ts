import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const watchlistItemSchema = z.object({
  watchlistId: z.number(),
  ticker: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validation = watchlistItemSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { watchlistId, ticker } = validation.data;

    const watchlistItem = await db.watchlistItem.create({
      data: {
        watchlistId,
        ticker,
      },
    });

    return NextResponse.json(watchlistItem);
  } catch (error) {
    console.error("[WATCHLIST_ITEM_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const { userId } = await auth();
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const { watchlistId, ticker } = await req.json();
  
      await db.watchlistItem.delete({
        where: {
          watchlistId_ticker: {
            watchlistId,
            ticker,
          },
        },
      });
  
      return new NextResponse("OK", { status: 200 });
    } catch (error) {
      console.error("[WATCHLIST_ITEM_DELETE]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

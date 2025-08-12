import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tradeSchema = z.object({
  ticker: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  tradeType: z.enum(["BUY", "SELL"]),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = tradeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const { ticker, quantity, price, tradeType } = validation.data;

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (tradeType === "BUY") {
      const cost = quantity * price;
      if (user.virtualCash.toNumber() < cost) {
        return NextResponse.json({ message: "Insufficient funds" }, { status: 400 });
      }

      await db.$transaction(async (tx) => {
        await tx.user.update({
          where: { clerkId: userId },
          data: { virtualCash: { decrement: cost } },
        });

        const holding = await tx.portfolioHolding.findUnique({
          where: { userClerkId_ticker: { userClerkId: userId, ticker } },
        });

        if (holding) {
          const newQuantity = holding.quantity + quantity;
          const newAveragePrice =
            (holding.averagePrice.toNumber() * holding.quantity + cost) / newQuantity;
          await tx.portfolioHolding.update({
            where: { id: holding.id },
            data: {
              quantity: newQuantity,
              averagePrice: newAveragePrice,
            },
          });
        } else {
          await tx.portfolioHolding.create({
            data: {
              userClerkId: userId,
              ticker,
              quantity,
              averagePrice: price,
            },
          });
        }

        await tx.virtualTrade.create({
          data: {
            userClerkId: userId,
            ticker,
            quantity,
            price,
            tradeType: "BUY",
          },
        });
      });
    } else if (tradeType === "SELL") {
      const holding = await db.portfolioHolding.findUnique({
        where: { userClerkId_ticker: { userClerkId: userId, ticker } },
      });

      if (!holding || holding.quantity < quantity) {
        return NextResponse.json({ message: "Insufficient holdings" }, { status: 400 });
      }

      const revenue = quantity * price;

      await db.$transaction(async (tx) => {
        await tx.user.update({
          where: { clerkId: userId },
          data: { virtualCash: { increment: revenue } },
        });

        const newQuantity = holding.quantity - quantity;
        if (newQuantity === 0) {
          await tx.portfolioHolding.delete({ where: { id: holding.id } });
        } else {
          await tx.portfolioHolding.update({
            where: { id: holding.id },
            data: { quantity: newQuantity },
          });
        }

        await tx.virtualTrade.create({
          data: {
            userClerkId: userId,
            ticker,
            quantity,
            price,
            tradeType: "SELL",
          },
        });
      });
    }

    return NextResponse.json({ message: "Trade executed successfully" }, { status: 200 });
  } catch (error) {
    console.error("[TRADE_POST]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

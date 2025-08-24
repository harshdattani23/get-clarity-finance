import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

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

    // Block trading of indices
    const indexTickers = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'];
    if (indexTickers.includes(ticker.toUpperCase())) {
      return NextResponse.json({ 
        message: "Index trading is not available. Indices are for reference only." 
      }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(`Trade request: ${tradeType} ${quantity} shares of ${ticker} at ₹${price}`);
    console.log(`User ${userId} current virtualCash: ₹${user.virtualCash.toNumber()}`);

    if (tradeType === "BUY") {
      const cost = quantity * price;
      console.log(`Buy cost: ₹${cost}`);
      
      if (user.virtualCash.toNumber() < cost) {
        console.log(`Insufficient funds: need ₹${cost}, have ₹${user.virtualCash.toNumber()}`);
        return NextResponse.json({ message: "Insufficient funds" }, { status: 400 });
      }

      await db.$transaction(async (tx: TransactionClient) => {
        const updatedUser = await tx.user.update({
          where: { clerkId: userId },
          data: { virtualCash: { decrement: cost } },
        });
        console.log(`Updated user virtualCash to: ₹${updatedUser.virtualCash.toNumber()}`);

        const holding = await tx.portfolioHolding.findUnique({
          where: { userClerkId_ticker: { userClerkId: userId, ticker } },
        });

        if (holding) {
          const newQuantity = holding.quantity + quantity;
          // Use proper decimal arithmetic to avoid precision issues
          const existingCost = holding.averagePrice.toNumber() * holding.quantity;
          const newCost = price * quantity;
          const totalCost = existingCost + newCost;
          const newAveragePrice = totalCost / newQuantity;
          
          await tx.portfolioHolding.update({
            where: { id: holding.id },
            data: {
              quantity: newQuantity,
              averagePrice: newAveragePrice,
            },
          });
          console.log(`Updated existing holding: ${newQuantity} shares at ₹${newAveragePrice.toFixed(2)} average`);
          console.log(`  Previous: ${holding.quantity} shares at ₹${holding.averagePrice.toNumber().toFixed(2)}`);
          console.log(`  Added: ${quantity} shares at ₹${price.toFixed(2)}`);
          console.log(`  Total cost: ₹${totalCost.toFixed(2)} for ${newQuantity} shares`);
        } else {
          await tx.portfolioHolding.create({
            data: {
              userClerkId: userId,
              ticker,
              quantity,
              averagePrice: price,
            },
          });
          console.log(`Created new holding: ${quantity} shares at ₹${price}`);
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
        console.log(`Trade record created`);
      });
    } else if (tradeType === "SELL") {
      const holding = await db.portfolioHolding.findUnique({
        where: { userClerkId_ticker: { userClerkId: userId, ticker } },
      });

      if (!holding || holding.quantity < quantity) {
        console.log(`Insufficient holdings: need ${quantity}, have ${holding?.quantity || 0}`);
        return NextResponse.json({ message: "Insufficient holdings" }, { status: 400 });
      }

      const revenue = quantity * price;
      console.log(`Sell revenue: ₹${revenue}`);

      await db.$transaction(async (tx: TransactionClient) => {
        const updatedUser = await tx.user.update({
          where: { clerkId: userId },
          data: { virtualCash: { increment: revenue } },
        });
        console.log(`Updated user virtualCash to: ₹${updatedUser.virtualCash.toNumber()}`);

        const newQuantity = holding.quantity - quantity;
        if (newQuantity === 0) {
          await tx.portfolioHolding.delete({ where: { id: holding.id } });
          console.log(`Deleted holding (quantity became 0)`);
        } else {
          await tx.portfolioHolding.update({
            where: { id: holding.id },
            data: { quantity: newQuantity },
          });
          console.log(`Updated holding quantity to: ${newQuantity}`);
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
        console.log(`Trade record created`);
      });
    }

    console.log(`Trade completed successfully`);
    return NextResponse.json({ message: "Trade executed successfully" }, { status: 200 });
  } catch (error) {
    console.error("[TRADE_POST]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

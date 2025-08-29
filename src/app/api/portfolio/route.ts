import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.userId;

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

    // Calculate current value of all holdings (stocks at current prices)
    const holdingsValue = holdings.reduce((total, holding) => {
      // Using average price as current price (in production, fetch real-time prices)
      const currentValue = Number(holding.averagePrice) * holding.quantity;
      return total + currentValue;
    }, 0);

    // Calculate Net Worth = Holdings Value + Available Cash
    const availableCash = Number(user.virtualCash);
    const netWorth = holdingsValue + availableCash;

    console.log(`Portfolio API: User ${userId}`);
    console.log(`  Available Cash: ₹${availableCash.toLocaleString('en-IN')}`); 
    console.log(`  Holdings Value: ₹${holdingsValue.toLocaleString('en-IN')} (${holdings.length} stocks)`);
    console.log(`  Net Worth: ₹${netWorth.toLocaleString('en-IN')}`);

    return NextResponse.json({
      virtualCash: user.virtualCash,
      holdings,
      holdingsValue, // Current value of all stock holdings
      availableCash, // Cash available for trading
      netWorth, // Total portfolio value (holdings + cash)
    });
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

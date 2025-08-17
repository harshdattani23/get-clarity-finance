import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { allStocks } from "@/lib/trading-data";

type GrowwCandle = [
  number, // epoch seconds
  number, // open
  number, // high
  number, // low
  number, // close
  number // volume
];

type PriceServiceResponse = {
  data?: Array<{ ticker: string; close?: number; prevClose?: number; error?: string }>;
};

type UpsertMeta = { name?: string; industry?: string; marketCap?: string; indices?: string[] } | undefined;

type ResultRow = { ticker: string; close?: number; prevClose?: number; error?: string };

function formatDateTimeIST(date: Date, timeHHMMSS: string): string {
  // Format as YYYY-MM-DD HH:mm:ss in IST
  const istFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = istFormatter.formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d} ${timeHHMMSS}`;
}

async function fetchDailyCandlesViaPriceService(
  priceServiceUrl: string,
  apiKey: string | undefined,
  tradingSymbol: string
): Promise<GrowwCandle[]> {
  // The Python service returns a simplified structure; we adapt to expected type here.
  const lookbackDays = 15;
  const body = JSON.stringify({ tickers: [tradingSymbol], lookback_days: lookbackDays, exchange: "NSE", segment: "CASH" });
  const res = await fetch(`${priceServiceUrl.replace(/\/$/, "")}/closing-prices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(apiKey ? { "x-api-key": apiKey } : {}),
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Price service failed (${res.status}) for ${tradingSymbol}`);
  const data = (await res.json()) as PriceServiceResponse;
  const item = (data?.data || []).find((x) => x?.ticker === tradingSymbol);
  if (!item || item.error) return [];
  // We only need close and prevClose; fabricate two "candles"
  const candles: GrowwCandle[] = [];
  if (item.prevClose) candles.push([0, 0, 0, 0, item.prevClose, 0]);
  if (item.close) candles.push([0, 0, 0, 0, item.close, 0]);
  return candles;
}

export async function POST(request: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    // Optional: restrict calls with header; allow if no secret set
    const providedSecret = request.headers.get("x-cron-secret");
    if (cronSecret && providedSecret !== cronSecret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Prefer calling Python price service; fallback to direct Groww if not configured
    const authHeader = request.headers.get("authorization");
    const bearerMatch = authHeader?.match(/^Bearer\s+(.+)$/i);
    const headerToken = bearerMatch?.[1];
    const growwToken = headerToken || process.env.GROWW_ACCESS_TOKEN; // if using pre-generated token
    const apiKey = process.env.GROWW_API_KEY;
    const apiSecret = process.env.GROWW_API_SECRET;
    const priceServiceUrl = process.env.PRICE_SERVICE_URL; // e.g., http://python-service:8000 or Cloud Run URL
    const priceServiceKey = process.env.PRICE_SERVICE_KEY;

    if (!priceServiceUrl && !growwToken && (!apiKey || !apiSecret)) {
      return NextResponse.json(
        { error: "Missing PRICE_SERVICE_URL or Groww credentials/token" },
        { status: 500 }
      );
    }

    // Time window: last 15 days to ensure availability across weekends/holidays
    const now = new Date();
    const start = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
    const startTime = formatDateTimeIST(start, "09:15:00");
    const endTime = formatDateTimeIST(now, "15:30:00");

    // Determine tickers to update: prefer DB stocks; fallback to static list
    const existingStocks = await db.stock.findMany({ select: { ticker: true, name: true, industry: true, marketCap: true, indices: true } });
    const tickers = (existingStocks.length ? existingStocks.map((s) => s.ticker) : allStocks.map((s) => s.ticker)).filter(Boolean);

    // Simple concurrency control
    const concurrency = 8;
    let index = 0;
    const results: ResultRow[] = [];

    async function worker() {
      while (index < tickers.length) {
        const i = index++;
        const ticker = tickers[i];
        try {
          const candles = priceServiceUrl
            ? await fetchDailyCandlesViaPriceService(priceServiceUrl, priceServiceKey, ticker)
            : await (async () => {
                // Direct Groww fallback
                if (!growwToken) throw new Error("no_token");
                const url = new URL("https://api.groww.in/v1/historical/candle/range");
                url.searchParams.set("exchange", "NSE");
                url.searchParams.set("segment", "CASH");
                url.searchParams.set("trading_symbol", ticker);
                url.searchParams.set("start_time", startTime);
                url.searchParams.set("end_time", endTime);
                url.searchParams.set("interval_in_minutes", "1440");
                const res = await fetch(url.toString(), {
                  headers: { Accept: "application/json", Authorization: `Bearer ${growwToken}`, "X-API-VERSION": "1.0" },
                  cache: "no-store",
                });
                if (!res.ok) throw new Error(`Groww fetch failed (${res.status}) for ${ticker}`);
                const data = (await res.json()) as { payload?: { candles?: GrowwCandle[] }; candles?: GrowwCandle[] };
                return (data?.payload?.candles ?? data?.candles) || [];
              })();
          if (candles.length === 0) {
            results.push({ ticker, error: "no_candles" });
            continue;
          }
          const last = candles[candles.length - 1];
          const prev = candles.length > 1 ? candles[candles.length - 2] : undefined;
          const close = last[4];
          const prevClose = prev ? prev[4] : undefined;

          // Upsert DB
          const meta: UpsertMeta = existingStocks.find((s) => s.ticker === ticker) || allStocks.find((s) => s.ticker === ticker);
          const change = prevClose !== undefined ? close - prevClose : null;
          const percentChange = prevClose && prevClose !== 0 ? ((change as number) / prevClose) * 100 : null;

          await db.stock.upsert({
            where: { ticker },
            update: {
              price: close,
              change: change ?? undefined,
              percentChange: percentChange ?? undefined,
              lastUpdatedAt: new Date(),
            },
            create: {
              ticker,
              name: meta?.name || ticker,
              industry: meta?.industry || "",
              marketCap: meta?.marketCap || "",
              indices: meta?.indices || [],
              price: close,
              change: change ?? undefined,
              percentChange: percentChange ?? undefined,
              lastUpdatedAt: new Date(),
            },
          });

          results.push({ ticker, close, prevClose });
        } catch (e) {
          const message = e instanceof Error ? e.message : "fetch_failed";
          results.push({ ticker, error: message });
        }
      }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, tickers.length) }, () => worker()));

    return NextResponse.json({ updated: results.filter((r) => r.close !== undefined).length, total: tickers.length, errors: results.filter((r) => r.error) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "internal_error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}



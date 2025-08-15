import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseMarketCap(marketCap: string): number {
  const value = parseFloat(marketCap.slice(0, -1));
  const unit = marketCap.slice(-1).toUpperCase();
  switch (unit) {
    case 'T':
      return value * 1e12;
    case 'B':
      return value * 1e9;
    case 'M':
      return value * 1e6;
    default:
      return parseFloat(marketCap);
  }
}


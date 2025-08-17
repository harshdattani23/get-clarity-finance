// src/components/virtual-trading/IndexTicker.tsx
'use client';

import { useEffect, useState } from 'react';

type IndexRow = {
	name: string;
	price: number;
	percentChange: number;
};

const INDEX_TICKER_MAP: { label: string; ticker: string }[] = [
	{ label: 'NIFTY 50', ticker: 'NIFTY' },
	{ label: 'SENSEX 30', ticker: 'SENSEX' },
	{ label: 'BANK NIFTY', ticker: 'BANKNIFTY' },
	{ label: 'FINNIFTY', ticker: 'FINNIFTY' },
];

export default function IndexTicker() {
	const [rows, setRows] = useState<IndexRow[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				const tickers = INDEX_TICKER_MAP.map(i => i.ticker);
				const res = await fetch('/api/stock-data', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ tickers }),
				});
				if (!res.ok) throw new Error('Failed to load indices');
				const data: { ticker: string; price: number; percentChange: number }[] = await res.json();
				const byTicker = new Map(data.map(d => [d.ticker, d] as const));
				const nextRows: IndexRow[] = INDEX_TICKER_MAP.map(({ label, ticker }) => {
					const row = byTicker.get(ticker);
					return {
						name: label,
						price: row?.price ?? 0,
						percentChange: row?.percentChange ?? 0,
					};
				});
				setRows(nextRows);
			} catch {
				setRows(INDEX_TICKER_MAP.map(({ label }) => ({ name: label, price: 0, percentChange: 0 })));
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	const displayRows = loading
		? INDEX_TICKER_MAP.map(({ label }) => ({ name: label, price: 0, percentChange: 0 }))
		: rows;

	return (
		<div>
			<div className="bg-gray-900 text-yellow-300 text-center text-xs py-1 animate-pulse">
				Prices reflect the previous trading day’s close and are for illustration only.
			</div>
			<div className="bg-gray-800 text-white p-3 mb-4">
				<div className="container mx-auto">
					<div className="flex flex-wrap justify-center gap-6">
						{displayRows.map((index) => (
							<div key={index.name} className="text-center min-w-[120px]">
								<p className="font-semibold text-sm text-gray-300 mb-1">{index.name}</p>
								<p className="font-bold text-lg">{index.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
								<p className={`text-sm font-medium ${index.percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
									{index.percentChange >= 0 ? '+' : ''}{index.percentChange.toFixed(2)}%
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

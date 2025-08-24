'use client';

import React from 'react';
import { Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import { Check, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useMemo } from 'react';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';

interface StockTableProps {
	stocks: Stock[];
	title: string;
	showQuantity?: boolean;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, title, showQuantity = false }) => {
	const { watchlist, addStockToWatchlist, removeStockFromWatchlist } = useWatchlist();
	const router = useRouter();
	const { portfolio } = usePortfolio(); // Get portfolio to find quantity

	const tickers = useMemo(() => stocks.map(s => s.ticker), [stocks]);
	const { getStockData } = useStockDataFromDB(tickers);

	const handleWatchlistToggle = (stockTicker: string, e: React.MouseEvent) => {
		e.stopPropagation();
		const isInWatchlist = watchlist?.items?.some(item => item.ticker === stockTicker);
		if (isInWatchlist) {
			removeStockFromWatchlist(stockTicker);
		} else {
			addStockToWatchlist(stockTicker);
		}
	};
	
	return (
		<div className="bg-slate-800 p-4 rounded-lg text-white">
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-slate-700 text-xs text-gray-400">
							<th className="p-2">Symbol</th>
							{showQuantity && <th className="p-2 text-right">Quantity</th>}
							<th className="p-2 text-right">Price</th>
							<th className="p-2 text-right">Change</th>
							<th className="p-2 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{stocks.length > 0 ? (
							stocks
								.filter((stock) => {
									// Filter out indices from the stock table
									const indexTickers = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'];
									return !indexTickers.includes(stock.ticker.toUpperCase());
								})
								.map((stock) => {
								const isInWatchlist = watchlist?.items?.some(item => item.ticker === stock.ticker) ?? false;
								const holding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
								const db = getStockData(stock.ticker);
								// Ensure values are numbers with proper fallbacks
								const currentPrice = Number(db?.price ?? stock.price) || 0;
								const currentChange = Number(db?.change ?? stock.change) || 0;
								console.log(`Stock: ${stock.ticker}, db:`, db, `stock.price: ${stock.price}, db.price: ${db?.price}, currentPrice: ${currentPrice}`);
								const derivedStock: Stock = { ...stock, price: currentPrice, change: currentChange };
								return(
									<tr 
										key={stock.ticker} 
										className="border-b border-slate-800 hover:bg-slate-700 cursor-pointer"
										onClick={() => router.push(`/virtual-trading/stock/${stock.ticker}`)}
									>
										<td className="p-2">
											<div className="flex items-center space-x-2">
												<div>
													<div className="font-bold">{stock.ticker}</div>
													<div className="text-xs text-gray-400">{stock.name}</div>
												</div>
											</div>
										</td>
										{showQuantity && (
											<td className="p-2 text-right font-mono">
												{holding ? holding.quantity : 'N/A'}
											</td>
										)}
										<td className="p-2 text-right font-mono">₹{currentPrice.toFixed(2)}</td>
										<td className={`p-2 text-right font-mono ${currentChange > 0 ? 'text-green-500' : currentChange < 0 ? 'text-red-500' : 'text-gray-400'}`}>
											{currentChange >= 0 ? '+' : ''}{currentChange.toFixed(2)}%
										</td>
										<td className="p-2">
											<div className="flex items-center justify-center space-x-2">
												<TradeModal stock={derivedStock} />
												<button 
													onClick={(e) => handleWatchlistToggle(stock.ticker, e)}
													className={`text-xs text-white p-1 rounded transition-colors ${isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-600'}`}
													title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
												>
													{isInWatchlist ? <Check size={14} /> : <Plus size={14} />}
												</button>
											</div>
										</td>
									</tr>
								)
							})
						) : (
							<tr>
								<td colSpan={showQuantity ? 5 : 4} className="text-center p-8 text-gray-500">
									No stocks to display.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StockTable;

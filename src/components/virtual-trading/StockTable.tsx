'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import { Check, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';

interface StockTableProps {
	stocks?: Stock[];
	title: string;
	showQuantity?: boolean;
	enableRealTimeData?: boolean;
}

const StockTable: React.FC<StockTableProps> = memo(({ 
	stocks = [], 
	title, 
	showQuantity = false,
	enableRealTimeData = false // Changed to false by default to reduce API calls
}) => {
	const { watchlist, addStockToWatchlist, removeStockFromWatchlist } = useWatchlist();
	const router = useRouter();
	const { portfolio } = usePortfolio();

	// Memoize stocks to prevent unnecessary re-calculations
	const safeStocks = useMemo(() => {
		return Array.isArray(stocks) ? stocks : [];
	}, [stocks]);

	// Memoize filtered stocks to prevent unnecessary re-calculations
	const filteredStocks = useMemo(() => {
		if (!safeStocks.length) return [];
		const indexTickers = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'];
		return safeStocks.filter((stock) => 
			stock && stock.ticker && !indexTickers.includes(stock.ticker.toUpperCase())
		);
	}, [safeStocks]);

	// Only extract tickers if real-time data is enabled and we have filtered stocks
	const tickers = useMemo(() => {
		if (!enableRealTimeData || !filteredStocks.length) return [];
		return filteredStocks.map(s => s.ticker).filter(Boolean);
	}, [enableRealTimeData, filteredStocks]);
	
	// Only fetch real-time data when explicitly enabled
	const { getStockData } = useStockDataFromDB(tickers, enableRealTimeData);

	const handleWatchlistToggle = useCallback((stockTicker: string, e: React.MouseEvent) => {
		e.stopPropagation();
		const isInWatchlist = watchlist?.items?.some(item => item.ticker === stockTicker);
		if (isInWatchlist) {
			removeStockFromWatchlist(stockTicker);
		} else {
			addStockToWatchlist(stockTicker);
		}
	}, [watchlist?.items, addStockToWatchlist, removeStockFromWatchlist]);

	const handleStockClick = useCallback((ticker: string) => {
		router.push(`/virtual-trading/stock/${ticker}`);
	}, [router]);

	// Memoize the stock rows to prevent unnecessary re-renders
	const stockRows = useMemo(() => {
		return filteredStocks.map((stock) => {
			const isInWatchlist = watchlist?.items?.some(item => item.ticker === stock.ticker) ?? false;
			const holding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
			
			// Only get real-time data if enabled
			const realtimeData = enableRealTimeData ? getStockData(stock.ticker) : null;
			
			// Use real-time data if available, otherwise use stock data
			const currentPrice = Number(realtimeData?.price ?? stock.price) || 0;
			const currentChange = Number(realtimeData?.change ?? stock.change) || 0;
			
			const derivedStock: Stock = { ...stock, price: currentPrice, change: currentChange };
			
			return (
				<StockTableRow
					key={stock.ticker}
					stock={derivedStock}
					isInWatchlist={isInWatchlist}
					holding={holding}
					showQuantity={showQuantity}
					onStockClick={handleStockClick}
					onWatchlistToggle={handleWatchlistToggle}
				/>
			);
		});
	}, [filteredStocks, watchlist?.items, portfolio?.holdings, enableRealTimeData, getStockData, showQuantity, handleStockClick, handleWatchlistToggle]);

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
						{stockRows.length > 0 ? (
							stockRows
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
});

StockTable.displayName = 'StockTable';

// Separate memoized component for individual stock rows
interface StockTableRowProps {
	stock: Stock;
	isInWatchlist: boolean;
	holding?: any;
	showQuantity: boolean;
	onStockClick: (ticker: string) => void;
	onWatchlistToggle: (ticker: string, e: React.MouseEvent) => void;
}

const StockTableRow: React.FC<StockTableRowProps> = memo(({
	stock,
	isInWatchlist,
	holding,
	showQuantity,
	onStockClick,
	onWatchlistToggle
}) => {
	const handleClick = useCallback(() => {
		onStockClick(stock.ticker);
	}, [onStockClick, stock.ticker]);

	const handleWatchlistClick = useCallback((e: React.MouseEvent) => {
		onWatchlistToggle(stock.ticker, e);
	}, [onWatchlistToggle, stock.ticker]);

	return (
		<tr 
			className="border-b border-slate-800 hover:bg-slate-700 cursor-pointer"
			onClick={handleClick}
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
			<td className="p-2 text-right font-mono">₹{stock.price.toFixed(2)}</td>
			<td className={`p-2 text-right font-mono ${
				stock.change > 0 ? 'text-green-500' : 
				stock.change < 0 ? 'text-red-500' : 'text-gray-400'
			}`}>
				{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
			</td>
			<td className="p-2">
				<div className="flex items-center justify-center space-x-2">
					<TradeModal stock={stock} />
					<button 
						onClick={handleWatchlistClick}
						className={`text-xs text-white p-1 rounded transition-colors ${
							isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-600'
						}`}
						title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
					>
						{isInWatchlist ? <Check size={14} /> : <Plus size={14} />}
					</button>
				</div>
			</td>
		</tr>
	);
});

StockTableRow.displayName = 'StockTableRow';

export default StockTable;

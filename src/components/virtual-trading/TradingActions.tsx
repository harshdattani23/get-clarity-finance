// src/components/virtual-trading/TradingActions.tsx
import { ArrowUpRight, BarChart, Briefcase, FileText, Folder, PieChart } from 'lucide-react';

const TradingActions = () => {
    const actions = [
        { name: 'Equities', description: 'Trade in company shares', icon: <BarChart /> },
        { name: 'Mutual Funds', description: 'Higher returns with Direct MF', icon: <PieChart /> },
        { name: 'ETFs', description: 'Exchange Traded Funds', icon: <Briefcase /> },
        { name: 'Options', description: 'Find options to trade in', icon: <FileText /> },
        { name: 'Futures', description: 'Discover futures to trade', icon: <ArrowUpRight /> },
        { name: 'Commodities', description: 'Trade in goods & metals', icon: <Folder /> },
    ];

    return (
        <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Invest / Trade on Stock Exchanges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <div key={action.name} className="bg-slate-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-slate-700 cursor-pointer transition">
                        <div className="text-blue-400">
                            {action.icon}
                        </div>
                        <div>
                            <p className="font-semibold">{action.name}</p>
                            <p className="text-sm text-gray-400">{action.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradingActions;

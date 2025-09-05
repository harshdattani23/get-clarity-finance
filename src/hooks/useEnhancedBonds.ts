import { useState, useEffect } from 'react';
import { yahooFinanceService, type StockInfo } from '@/services/yahooFinanceApi';

interface EnhancedBondInstrument {
  name: string;
  symbol: string;
  isin: string;
  type: string;
  category: string;
  issuer: string;
  rating?: string;
  currency: string;
  coupon?: number;
  maturity?: string;
  lastTradedPrice?: number;
  tax_benefit?: boolean;
  tax_exempt?: boolean;
  couponFrequency?: string;
  issueDate?: string;
  maturityDate?: string;
  status?: string;
  securityType?: string;
  // Live data fields
  currentPrice?: number;
  previousClose?: number;
  dayHigh?: number;
  dayLow?: number;
  volume?: number;
  lastUpdated?: string;
}

interface EnhancedBondCategory {
  category: string;
  description: string;
  instruments: EnhancedBondInstrument[];
}

interface UseBondsResult {
  bonds: StockInfo[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date;
  refreshBonds: () => Promise<void>;
  searchBonds: (query: string) => EnhancedBondInstrument[];
  getBondsByCategory: (category: string) => EnhancedBondInstrument[];
  getBondByISIN: (isin: string) => EnhancedBondInstrument | undefined;
  categories: string[];
  totalBonds: number;
}

export function useEnhancedBonds(): UseBondsResult {
  const [bonds, setBonds] = useState<StockInfo[]>([]);
  const [enhancedBondData, setEnhancedBondData] = useState<EnhancedBondCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load enhanced bond data on component mount
  useEffect(() => {
    loadEnhancedBondData();
  }, []);

  const loadEnhancedBondData = async () => {
    try {
      // Try to load enhanced bond data first
      const response = await fetch('/data/bonds/enhanced-bond-data.json');
      if (response.ok) {
        const data = await response.json();
        setEnhancedBondData(data);
        
        // Extract symbols for live price fetching
        const symbols = data.flatMap((category: EnhancedBondCategory) =>
          category.instruments.map(bond => bond.symbol).filter(Boolean)
        );
        
        // Fetch live data for a subset of bonds (to avoid API limits)
        await fetchLivePricesForSymbols(symbols.slice(0, 50));
        
      } else {
        // Fallback to original bond instruments if enhanced data not available
        const fallbackResponse = await fetch('/data/bonds/bond-instruments.json');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setEnhancedBondData(fallbackData);
          
          const symbols = fallbackData.flatMap((category: any) =>
            category.instruments.map((bond: any) => bond.symbol)
          );
          
          await fetchLivePricesForSymbols(symbols);
        }
      }
    } catch (err) {
      setError('Failed to load bond data');
      console.error('Error loading bond data:', err);
    }
  };

  const fetchLivePricesForSymbols = async (symbols: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const promises = symbols.map(symbol =>
        yahooFinanceService.getStockInfo(symbol).catch(err => {
          console.warn(`Failed to fetch ${symbol}:`, err);
          return null;
        })
      );

      const results = await Promise.all(promises);
      const validResults = results.filter((result): result is StockInfo => result !== null);
      
      setBonds(validResults);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch live bond prices');
      console.error('Error fetching bond prices:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshBonds = async () => {
    if (enhancedBondData.length > 0) {
      const symbols = enhancedBondData.flatMap(category =>
        category.instruments.map(bond => bond.symbol).filter(Boolean)
      );
      await fetchLivePricesForSymbols(symbols.slice(0, 50));
    }
  };

  const searchBonds = (query: string): EnhancedBondInstrument[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    const results: EnhancedBondInstrument[] = [];
    
    enhancedBondData.forEach(category => {
      category.instruments.forEach(bond => {
        const matchesName = bond.name.toLowerCase().includes(searchTerm);
        const matchesIsin = bond.isin?.toLowerCase().includes(searchTerm);
        const matchesIssuer = bond.issuer?.toLowerCase().includes(searchTerm);
        const matchesType = bond.type?.toLowerCase().includes(searchTerm);
        
        if (matchesName || matchesIsin || matchesIssuer || matchesType) {
          results.push(bond);
        }
      });
    });
    
    return results.slice(0, 20); // Limit results
  };

  const getBondsByCategory = (category: string): EnhancedBondInstrument[] => {
    const categoryData = enhancedBondData.find(cat => cat.category === category);
    return categoryData ? categoryData.instruments : [];
  };

  const getBondByISIN = (isin: string): EnhancedBondInstrument | undefined => {
    for (const category of enhancedBondData) {
      const bond = category.instruments.find(bond => bond.isin === isin);
      if (bond) return bond;
    }
    return undefined;
  };

  const categories = enhancedBondData.map(cat => cat.category);
  const totalBonds = enhancedBondData.reduce((total, cat) => total + cat.instruments.length, 0);

  return {
    bonds,
    loading,
    error,
    lastUpdated,
    refreshBonds,
    searchBonds,
    getBondsByCategory,
    getBondByISIN,
    categories,
    totalBonds
  };
}

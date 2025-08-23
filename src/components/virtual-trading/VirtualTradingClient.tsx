const VirtualTradingClient = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leftColumnView, setLeftColumnView] = useState<'markets' | 'watchlists' | 'leaderboard'>('markets');
  const [rightColumnView, setRightColumnView] = useState<'summary' | 'portfolio' | 'achievements'>('summary');
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Get pathname
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      setLeftColumnView('markets');
      setRightColumnView('summary');
    }
  }, [isSignedIn]);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      const params = new URLSearchParams(searchParams?.toString());
      const response = await fetch('/api/stock-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(params.entries())),
      });
      const data = await response.json();
      setStocks(data.stocks);
      setTotalCount(data.totalCount);
      setLoading(false);
    };
    fetchStocks();
  }, [searchParams]);

  useEffect(() => {
    const fetchAllStocks = async () => {
      const response = await fetch('/api/stock-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setAllStocks(data.stocks);
    };
    fetchAllStocks();
  }, []);

  const currentPage = Number(searchParams?.get('page')) || 1;
  const itemsPerPage = 15;

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="bg-slate-900 text-white min-h-screen">
          <WarningBanner />
          <AcknowledgementModal />
          <ClientOnly>
            <IndexTicker />
            <ScrollingTicker />
          </ClientOnly>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 bg-slate-900 p-4 rounded-lg">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setLeftColumnView('markets')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'markets' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Markets
                  </button>
                  {isSignedIn && (
                    <button
                      onClick={() => setLeftColumnView('watchlists')}
                      className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'watchlists' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                    >
                      Watchlists
                    </button>
                  )}
                  <button
                    onClick={() => setLeftColumnView('leaderboard')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'leaderboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Leaderboard
                  </button>
                </div>

                {leftColumnView === 'markets' && (
                  <>
                    <MarketFilters />
                    <ScreenerView
                      stocks={stocks}
                      loading={loading}
                    />
                    <Pagination
                      totalCount={totalCount}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      pathname={pathname || ''}
                      searchParams={searchParams || new URLSearchParams()}
                    />
                  </>
                )}

                {leftColumnView === 'watchlists' && <WatchlistManager />}
                {leftColumnView === 'leaderboard' && <Leaderboard />}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setRightColumnView('summary')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'summary' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Summary
                  </button>
                  {isSignedIn && (
                    <>
                      <button
                        onClick={() => setRightColumnView('portfolio')}
                        className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'portfolio' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                      >
                        Portfolio
                      </button>
                      <button
                        onClick={() => setRightColumnView('achievements')}
                        className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'achievements' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                      >
                        Achievements
                      </button>
                    </>
                  )}
                </div>
                {isSignedIn ? (
                  <>
                    {rightColumnView === 'summary' && (
                      <>
                        <PortfolioSummary />
                        <TradingActions />
                      </>
                    )}
                    {rightColumnView === 'portfolio' && <PortfolioView allStocks={allStocks} />}
                    {rightColumnView === 'achievements' && <Achievements />}
                  </>
                ) : (
                  <LoginPrompt />
                )}
              </div>
            </div>
          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
};

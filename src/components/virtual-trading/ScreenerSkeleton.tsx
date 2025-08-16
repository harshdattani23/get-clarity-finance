const ScreenerSkeleton = () => {
  return (
    <div className="bg-[#0D1117] p-4 rounded-lg animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-32 bg-gray-700 rounded-md"></div>
          <div className="h-10 w-64 bg-gray-700 rounded-md"></div>
        </div>
        <div className="h-6 w-6 bg-gray-700 rounded"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#161B22] text-white">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-2 px-4 font-normal">Symbol</th>
              <th className="py-2 px-4 font-normal text-right">Price</th>
              <th className="py-2 px-4 font-normal text-right hidden md:table-cell">Change</th>
              <th className="py-2 px-4 font-normal text-right">% Change</th>
              <th className="py-2 px-4 font-normal text-right hidden md:table-cell">Volume</th>
              <th className="py-2 px-4 font-normal text-right hidden md:table-cell">Market Cap</th>
              <th className="py-2 px-4 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15)].map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-2 px-4">
                  <div className="flex flex-col">
                    <div className="h-4 w-16 bg-gray-700 rounded mb-1"></div>
                    <div className="h-3 w-24 bg-gray-700 rounded"></div>
                  </div>
                </td>
                <td className="py-2 px-4 text-right"><div className="h-4 w-12 bg-gray-700 rounded float-right"></div></td>
                <td className="py-2 px-4 text-right hidden md:table-cell"><div className="h-4 w-10 bg-gray-700 rounded float-right"></div></td>
                <td className="py-2 px-4 text-right"><div className="h-4 w-12 bg-gray-700 rounded float-right"></div></td>
                <td className="py-2 px-4 text-right hidden md:table-cell"><div className="h-4 w-16 bg-gray-700 rounded float-right"></div></td>
                <td className="py-2 px-4 text-right hidden md:table-cell"><div className="h-4 w-16 bg-gray-700 rounded float-right"></div></td>
                <td className="py-2 px-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-8 w-12 bg-gray-700 rounded"></div>
                    <div className="h-8 w-12 bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-700 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScreenerSkeleton;

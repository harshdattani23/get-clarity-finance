// src/components/virtual-trading/WarningBanner.tsx
'use client';

const WarningBanner = () => {
  return (
    <div className="bg-red-600 text-white text-center p-2">
      <p className="font-bold">
        This is a simulated trading environment. All market data is illustrative, and trades are not real. This is not investment advice; do not take real trades based on this data.
      </p>
    </div>
  );
};

export default WarningBanner;

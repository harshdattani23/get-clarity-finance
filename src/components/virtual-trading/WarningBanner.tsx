// src/components/virtual-trading/WarningBanner.tsx
'use client';

const WarningBanner = () => {
  return (
    <div className="bg-red-600 text-white text-center p-2">
      <p className="font-bold">
        Simulated trading environment: prices reflect the previous trading day’s close and are for illustration only. Orders and P&L are simulated. Nothing here is investment advice.
      </p>
    </div>
  );
};

export default WarningBanner;

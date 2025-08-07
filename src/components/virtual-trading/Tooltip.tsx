// src/components/virtual-trading/Tooltip.tsx
import { ReactNode } from 'react';

export default function Tooltip({ children, text, position = 'top' }: { children: ReactNode; text: string; position?: 'top' | 'bottom' | 'left' | 'right' }) {
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default: // top
        return 'bottom-full mb-2';
    }
  };

  return (
    <div className="relative flex items-center group">
      {children}
      <div className={`absolute ${getPositionClasses()} w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
        {text}
      </div>
    </div>
  );
}

// src/components/virtual-trading/Tooltip.tsx
import { ReactNode } from 'react';

export default function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <div className="relative flex items-center">
      {children}
      <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
        <svg className="absolute text-gray-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
    </div>
  );
}

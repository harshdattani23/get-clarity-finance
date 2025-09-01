import React from 'react';

interface GetClarityLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const GetClarityLogo: React.FC<GetClarityLogoProps> = ({ 
  size = 32, 
  className = '',
  showText = true 
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div 
        className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield shape with eye icon representing clarity and protection */}
          <path
            d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z"
            fill="white"
            fillOpacity="0.9"
          />
          <path
            d="M12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z"
            fill="currentColor"
            className="text-emerald-600"
          />
          <path
            d="M12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"
            fill="white"
          />
        </svg>
      </div>
      
      {/* Company Name */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-lg">Get Clarity</span>
          <span className="text-sm text-gray-600 -mt-1">Finance</span>
        </div>
      )}
    </div>
  );
};

export default GetClarityLogo;

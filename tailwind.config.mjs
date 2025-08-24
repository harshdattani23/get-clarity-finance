/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'grid',
    'grid-cols-1',
    'grid-cols-2', 
    'grid-cols-5',
    'sm:grid-cols-2',
    'lg:grid-cols-5',
    'gap-4',
    'p-4',
    'rounded-lg',
    'bg-slate-800',
    'bg-slate-900',
    'text-green-500',
    'text-red-500',
    'text-xl',
    'text-lg',
  ],
  theme: {
    extend: {
      animation: {
        'scrolling-ticker': 'scrolling-ticker 600s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

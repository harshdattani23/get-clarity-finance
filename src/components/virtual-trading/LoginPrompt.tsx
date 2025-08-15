// src/components/virtual-trading/LoginPrompt.tsx
'use client';

import { SignInButton } from '@clerk/nextjs';

const LoginPrompt = () => {
  return (
    <div className="text-center p-8">
      <p className="mb-4">Please log in to access your portfolio and watchlist.</p>
      <SignInButton mode="modal">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log In
        </button>
      </SignInButton>
    </div>
  );
};

export default LoginPrompt;

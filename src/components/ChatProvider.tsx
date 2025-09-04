'use client';

import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import { MessageCircle, X } from 'lucide-react';

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkChatServiceStatus();
  }, []);

  const checkChatServiceStatus = async () => {
    try {
      const response = await fetch('/api/chat');
      const data = await response.json();
      setIsServiceAvailable(data.status === 'available');
    } catch (error) {
      console.error('Failed to check chat service status:', error);
      setIsServiceAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {children}
      
      {/* Chat Toggle Button */}
      {isServiceAvailable && !isLoading && (
        <>
          {!isChatOpen && (
            <button
              onClick={toggleChat}
              className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group"
              aria-label="Open Market Assistant Chat"
            >
              <MessageCircle size={24} />
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Ask about SEBI, BSE, NSE, CDSL, NSDL
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900"></div>
              </div>

              {/* Notification Pulse */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </button>
          )}

          {/* Chat Box */}
          {isChatOpen && (
            <ChatBox 
              onClose={closeChat}
              className="animate-in slide-in-from-bottom-4 duration-300"
            />
          )}
        </>
      )}

      {/* Service Unavailable Indicator (only when loading is complete) */}
      {!isServiceAvailable && !isLoading && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-gray-600 text-white p-3 rounded-lg shadow-lg text-sm max-w-xs">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-gray-400" />
              <span>Chat Assistant Offline</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              Market assistant is currently unavailable
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatProvider;

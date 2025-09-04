'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ExternalLink, AlertCircle, Minimize2, Maximize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
}

interface AgentContext {
  name: string;
  code: string;
  description: string;
  functionalities: string[];
  website: string;
}

interface ChatBoxProps {
  className?: string;
  initialMessage?: string;
  onClose?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ className = '', initialMessage, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [agentContexts, setAgentContexts] = useState<AgentContext[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestion buttons data
  const suggestions = [
    {
      id: 1,
      text: "📈 Learn about stock markets",
      message: "Can you explain how the Indian stock market works?"
    },
    {
      id: 2,
      text: "💰 Investment guidance",
      message: "What are the different types of investments available in India?"
    },
    {
      id: 3,
      text: "🏛️ Know about SEBI",
      message: "What is SEBI and what are its main functions?"
    },
    {
      id: 4,
      text: "📊 Understand market indices",
      message: "What is the difference between Sensex and Nifty?"
    }
  ];

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load agent contexts on component mount
  useEffect(() => {
    fetchAgentContexts();
    
    // Add welcome message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🏛️ Welcome to your Indian Finance Market Assistant! 👋

I'm powered by Gemini 2.5 Flash and I'm here to help you navigate the exciting world of Indian financial markets! Think of me as your expert companion for all things related to investments, regulations, and market insights. 📈

💰 What can I help you with today?
• Understand stock markets (BSE, NSE) and trading 📊
• Learn about regulatory bodies (SEBI, RBI, IRDAI) 🏛️
• Explore investment options (Mutual Funds, SIPs, ETFs) 💹
• Know about market indices (Sensex, Nifty) 📈
• Understand demat accounts and depositories (NSDL, CDSL) 🏦
• Learn about IPOs, bonds, and derivatives 💼
• Get insights on market analysis and trends 🔍
• Understand compliance and taxation aspects ⚖️

🎯 I'm here to make Indian finance simple and accessible! Ready to start your financial journey? ✨`,
        timestamp: new Date(),
        confidence: 1.0
      };
      setMessages([welcomeMessage]);
    }

    if (initialMessage) {
      setInputMessage(initialMessage);
    }
  }, []);

  const fetchAgentContexts = async () => {
    try {
      const response = await fetch('/api/chat/contexts');
      if (response.ok) {
        const data = await response.json();
        setAgentContexts(data.contexts || []);
      }
    } catch (error) {
      console.error('Failed to fetch agent contexts:', error);
    }
  };

  const handleSuggestionClick = async (suggestionMessage: string) => {
    setInputMessage(suggestionMessage);
    setShowSuggestions(false);
    
    // Create and send the message directly
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: suggestionMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.slice(-10)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'I apologize, but I couldn\'t process your request.',
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      setError('Failed to send message. Please try again.');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m sorry, but I encountered an error processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        confidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Hide suggestions after first user message
    setShowSuggestions(false);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'I apologize, but I couldn\'t process your request.',
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      setError('Failed to send message. Please try again.');
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m sorry, but I encountered an error processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        confidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.id}
        className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Content */}
        <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-3 rounded-2xl ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <div className="text-sm leading-relaxed">
              {isUser ? (
                <div className="whitespace-pre-wrap">{message.content}</div>
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-base font-bold text-gray-900 mt-2 mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-sm font-bold text-gray-900 mt-2 mb-1">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-semibold text-gray-900 mt-2 mb-1">{children}</h3>,
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-2 ml-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-2 ml-2">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          {/* Message metadata */}
          <div className={`mt-1 text-xs text-gray-500 flex items-center gap-2 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTimestamp(message.timestamp)}</span>
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {message.sources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  <ExternalLink size={10} />
                  Source
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Bot size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <div>
            <h3 className="font-semibold text-sm">Finance Market Assistant</h3>
            <p className="text-xs text-blue-100">Indian Markets Expert 🇮🇳</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <Minimize2 size={16} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-700 rounded transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-0">
        {messages.map(renderMessage)}
        
        {isLoading && (
          <div className="flex gap-3 p-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 text-gray-900 inline-block p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Buttons */}
      {showSuggestions && messages.length === 1 && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="mb-2 text-xs text-gray-600 font-medium text-center">
            Try asking about:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.message)}
                className="p-2 text-xs text-left bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors duration-200 hover:border-blue-300"
                disabled={isLoading}
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200">
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Indian markets, investments, SEBI, trading..."
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Your expert guide to Indian financial markets! 🇮🇳💰
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

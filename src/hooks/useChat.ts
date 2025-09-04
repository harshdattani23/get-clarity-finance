import { useState, useCallback } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
}

interface UseChatOptions {
  maxHistoryLength?: number;
}

export const useChat = ({ maxHistoryLength = 20 }: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string): Promise<boolean> => {
    if (!content.trim() || isLoading) return false;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Keep only recent messages for context
      const recentMessages = messages.slice(-maxHistoryLength);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          chatHistory: recentMessages
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
      return true;

    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to send message: ${errorMsg}`);
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m sorry, but I encountered an error processing your request. Please try again or rephrase your question about SEBI, BSE, NSE, CDSL, or NSDL.',
        timestamp: new Date(),
        confidence: 0
      };
      
      setMessages(prev => [...prev, errorMessage]);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, maxHistoryLength]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const addWelcomeMessage = useCallback((content: string) => {
    const welcomeMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content,
      timestamp: new Date(),
      confidence: 1.0
    };
    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    removeMessage,
    addWelcomeMessage,
    hasMessages: messages.length > 0
  };
};

export default useChat;

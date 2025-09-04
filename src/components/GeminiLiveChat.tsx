'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, AlertTriangle, Shield, Zap, Phone } from 'lucide-react';

interface StreamingMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  urgencyAction?: string;
}

interface UrgencyAlert {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  action: string;
}

export default function GeminiLiveChat() {
  const [messages, setMessages] = useState<StreamingMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  const [urgencyAlert, setUrgencyAlert] = useState<UrgencyAlert | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if live chat service is available
    checkServiceStatus();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const checkServiceStatus = async () => {
    try {
      const response = await fetch('/api/chat/live');
      const data = await response.json();
      setIsConnected(data.status === 'available');
    } catch (error) {
      console.error('Service status check failed:', error);
      setIsConnected(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  const getRiskLevelIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMessage: StreamingMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsStreaming(true);
    setUrgencyAlert(null);

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: StreamingMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat/live', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          chatHistory: messages.slice(-8), // Send last 8 messages for context
          options: {
            temperature: 0.7,
            enableVoice: isVoiceEnabled
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'urgency_alert') {
                setUrgencyAlert({
                  riskLevel: data.riskLevel,
                  action: data.action
                });
              } else if (data.type === 'text_chunk') {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: data.fullContent, isStreaming: true }
                      : msg
                  )
                );
              } else if (data.type === 'completion') {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { 
                          ...msg, 
                          content: data.fullContent, 
                          isStreaming: false,
                          riskLevel: data.urgencyInfo?.riskLevel,
                          urgencyAction: data.urgencyInfo?.suggestedAction
                        }
                      : msg
                  )
                );
                
                // If speaking is enabled, speak the response
                if (isSpeakingEnabled && 'speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(data.fullContent);
                  utterance.rate = 1.0;
                  utterance.pitch = 1.0;
                  utterance.volume = 0.8;
                  speechSynthesis.speak(utterance);
                }
              } else if (data.type === 'error') {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: data.message, isStreaming: false }
                      : msg
                  )
                );
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { 
                ...msg, 
                content: 'I encountered an error processing your request. Please try again or contact SEBI at 1800-266-7575 if urgent.',
                isStreaming: false 
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    // Voice input functionality would be implemented here
  };

  const toggleSpeaking = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
    if (!isSpeakingEnabled) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap className="w-6 h-6 text-blue-600" />
            {isConnected && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Gemini Live</h3>
            <p className="text-xs text-gray-600">
              {isConnected ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Real-time fraud detection
                </span>
              ) : (
                'Connecting...'
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpeaking}
            className={`p-2 rounded-lg transition-colors ${
              isSpeakingEnabled ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Toggle text-to-speech"
          >
            {isSpeakingEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-lg transition-colors ${
              isVoiceEnabled ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Toggle voice input"
          >
            {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
            Live
          </div>
        </div>
      </div>

      {/* Urgency Alert */}
      {urgencyAlert && (
        <div className={`mx-4 mt-3 p-3 rounded-lg border-l-4 ${getRiskLevelColor(urgencyAlert.riskLevel)}`}>
          <div className="flex items-start gap-2">
            {getRiskLevelIcon(urgencyAlert.riskLevel)}
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {urgencyAlert.riskLevel === 'critical' ? '🚨 URGENT ACTION REQUIRED' :
                 urgencyAlert.riskLevel === 'high' ? '⚠️ HIGH RISK DETECTED' :
                 '⚠️ Risk Assessment'}
              </p>
              <p className="text-sm mt-1">{urgencyAlert.action}</p>
              {urgencyAlert.riskLevel === 'critical' && (
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href="tel:1800-266-7575"
                    className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    Call SEBI: 1800-266-7575
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Zap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">Gemini Live is ready</p>
            <p className="text-sm">Ask me about investment fraud, SEBI regulations, or market verification</p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <button
                onClick={() => setInputMessage("Is this investment platform legitimate?")}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors"
              >
                Check platform legitimacy
              </button>
              <button
                onClick={() => setInputMessage("I received a suspicious investment call")}
                className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs hover:bg-orange-100 transition-colors"
              >
                Report suspicious call
              </button>
              <button
                onClick={() => setInputMessage("How to verify SEBI registration?")}
                className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs hover:bg-green-100 transition-colors"
              >
                Verify SEBI registration
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              {message.isStreaming && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-xs text-gray-500 ml-2">Streaming...</span>
                </div>
              )}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about fraud detection, investment verification, or SEBI regulations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={!isConnected || isStreaming}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !isConnected || isStreaming}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {!isConnected && (
          <p className="text-xs text-red-500 mt-2">
            Live chat service is temporarily unavailable. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}

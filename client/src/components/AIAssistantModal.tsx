'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я ваш AI-помощник по подбору одежды. Расскажите, какой образ вы ищете, и я помогу вам найти идеальные вещи! 👗✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const responses = [
        'Отличный выбор! Я могу порекомендовать вам несколько стильных вариантов. Какой стиль вы предпочитаете: классический, casual или что-то более яркое?',
        'Для этого случая я бы посоветовал обратить внимание на нашу новую коллекцию. У нас есть несколько великолепных вариантов!',
        'Понимаю вас! Давайте подберем что-то особенное. Какие цвета вам нравятся больше всего?',
        'Замечательно! У нас есть идеальные варианты для вас. Хотите увидеть подборку?',
      ];
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    '🎉 Подбор для вечеринки',
    '💼 Деловой стиль',
    '🏖️ Летний образ',
    '❄️ Зимний гардероб',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal - Desktop: центрировано, Mobile: почти полный экран */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col overflow-hidden bg-white shadow-2xl
              w-[calc(100%-0.5rem)] h-[calc(100vh-0.5rem)] max-h-[calc(100vh-0.5rem)] rounded-xl
              md:w-full md:h-auto md:max-w-2xl md:max-h-[85vh] md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 p-4 md:p-6 text-white flex-shrink-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">AI-Стилист</h2>
                    <p className="text-xs md:text-sm opacity-90 hidden md:block">Ваш персональный помощник</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition flex-shrink-0"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-0">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-primary-500 to-purple-500'
                      : 'bg-gradient-to-br from-gray-700 to-gray-900'
                  }`}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                    <div className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'assistant'
                        ? 'bg-white shadow-md'
                        : 'bg-gradient-to-r from-primary-600 to-pink-600 text-white'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white shadow-md p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick actions */}
            {messages.length === 1 && (
              <div className="px-4 md:px-6 pb-4 flex-shrink-0">
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Быстрые вопросы:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(action);
                        setTimeout(handleSend, 100);
                      }}
                      className="p-2 md:p-3 text-xs md:text-sm bg-white border-2 border-gray-200 rounded-lg md:rounded-xl hover:border-primary-500 hover:bg-primary-50 transition text-left"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 md:p-6 border-t bg-white flex-shrink-0">
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Опишите образ..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-primary-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg md:rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export default function GuestChatbot() {
  const t = useTranslations('guest.chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('welcome'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  // FAQs con información real de Pueblo Bonito y Quivira
  const faqs: FAQ[] = [
    {
      id: 'resorts',
      question: t('faqs.resorts.question'),
      answer: t('faqs.resorts.answer'),
      category: 'general',
    },
    {
      id: 'included',
      question: t('faqs.included.question'),
      answer: t('faqs.included.answer'),
      category: 'allinclusive',
    },
    {
      id: 'quivira',
      question: t('faqs.quivira.question'),
      answer: t('faqs.quivira.answer'),
      category: 'golf',
    },
    {
      id: 'booking',
      question: t('faqs.booking.question'),
      answer: t('faqs.booking.answer'),
      category: 'reservations',
    },
    {
      id: 'family',
      question: t('faqs.family.question'),
      answer: t('faqs.family.answer'),
      category: 'general',
    },
    {
      id: 'spa',
      question: t('faqs.spa.question'),
      answer: t('faqs.spa.answer'),
      category: 'amenities',
    },
    {
      id: 'ownership',
      question: t('faqs.ownership.question'),
      answer: t('faqs.ownership.answer'),
      category: 'investment',
    },
    {
      id: 'location',
      question: t('faqs.location.question'),
      answer: t('faqs.location.answer'),
      category: 'general',
    },
  ];

  const handleQuestionClick = (faq: FAQ) => {
    // Add user question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: faq.question,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add bot answer
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: faq.answer,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    // Simple keyword matching for common questions
    const lowerInput = inputValue.toLowerCase();
    let botResponse = t('defaultResponse');

    if (lowerInput.includes('golf') || lowerInput.includes('quivira')) {
      botResponse = faqs.find((f) => f.id === 'quivira')?.answer || botResponse;
    } else if (lowerInput.includes('incluido') || lowerInput.includes('included') || lowerInput.includes('all-inclusive')) {
      botResponse = faqs.find((f) => f.id === 'included')?.answer || botResponse;
    } else if (lowerInput.includes('reserv') || lowerInput.includes('book')) {
      botResponse = faqs.find((f) => f.id === 'booking')?.answer || botResponse;
    } else if (lowerInput.includes('spa') || lowerInput.includes('armonia')) {
      botResponse = faqs.find((f) => f.id === 'spa')?.answer || botResponse;
    } else if (lowerInput.includes('niños') || lowerInput.includes('familia') || lowerInput.includes('family') || lowerInput.includes('kids')) {
      botResponse = faqs.find((f) => f.id === 'family')?.answer || botResponse;
    } else if (lowerInput.includes('comprar') || lowerInput.includes('ownership') || lowerInput.includes('propiedad')) {
      botResponse = faqs.find((f) => f.id === 'ownership')?.answer || botResponse;
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputValue('');
  };

  return (
    <>
      {/* Chat Button - Fixed Bottom Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#C8A882] hover:bg-[#B89872] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 hover:scale-110 group"
        aria-label={t('openChat')}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3342] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C8A882] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-serif font-light text-lg">{t('title')}</h3>
                <p className="text-white/70 text-xs">{t('subtitle')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F6F3]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#C8A882] text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm font-light leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString('es-MX', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-light">{t('quickQuestions')}</p>
            <div className="flex flex-wrap gap-2">
              {faqs.slice(0, 4).map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleQuestionClick(faq)}
                  className="text-xs px-3 py-1.5 bg-[#F8F6F3] hover:bg-[#C8A882] hover:text-white transition-all rounded-full border border-gray-200 font-light"
                >
                  {faq.question.split('?')[0]}?
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('placeholder')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#C8A882] focus:border-transparent font-light text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-[#C8A882] hover:bg-[#B89872] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

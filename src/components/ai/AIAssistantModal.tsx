/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello, I am **Nexus AI**, your Enterprise Industrial Copilot. How can I assist you with machine health diagnostics, inventory forecasting, financial summaries, or general technical questions today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customPrompt || prompt).trim();
    if (!textToSend || loading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { sender: 'user' as const, text: textToSend, time }];
    setMessages(newMessages);
    if (!customPrompt) setPrompt('');
    setLoading(true);

    // Format chat history for multi-turn LLM context
    const historyPayload = newMessages.slice(1, -1).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || data.error || 'No response received from AI model.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Error connecting to AI service: ${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-lg h-[650px] flex flex-col shadow-2xl animate-in slide-in-from-right overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-outline-variant bg-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-base">Nexus AI Industrial Copilot</h3>
              <p className="text-xs text-secondary font-semibold">Enterprise LLM Intelligence & Telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-secondary text-on-secondary rounded-tr-none font-medium'
                    : 'bg-surface-container-high border border-outline-variant text-on-surface rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-on-surface-variant mt-1 px-1">{m.time}</span>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-secondary font-medium animate-pulse p-2">
              <span className="material-symbols-outlined animate-spin text-secondary">sync</span>
              Nexus AI is generating intelligent response...
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="p-2 border-t border-outline-variant/50 bg-surface-container-low flex gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => handleSend(undefined, 'What is 27 × 18?')}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0 font-medium"
          >
            🧮 27 × 18
          </button>
          <button
            onClick={() => handleSend(undefined, 'Check CNC Lathe G7 health')}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0 font-medium"
          >
            🔍 Machine Health
          </button>
          <button
            onClick={() => handleSend(undefined, 'Forecast inventory reorders')}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0 font-medium"
          >
            📦 Stock Forecast
          </button>
          <button
            onClick={() => handleSend(undefined, 'What is React?')}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0 font-medium"
          >
            💻 What is React?
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-outline-variant bg-surface-container flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI Assistant anything..."
            className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

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
      text: 'Hello, I am Nexus AI, your factory floor copilot. Ask me anything about machine performance, stock forecasting, OEE metrics, or maintenance schedules.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userText = prompt.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time }]);
    setPrompt('');
    setLoading(true);

    setTimeout(() => {
      let responseText = `Analysis complete. Based on telemetry data and plant logs for "${userText}": Everything is operating within normal safety margins. OEE rate is 98.2%.`;

      const lower = userText.toLowerCase();
      if (lower.includes('machine') || lower.includes('cnc') || lower.includes('lathe') || lower.includes('temp')) {
        responseText = `⚠️ **Machine Alert (Sector G-7)**: CNC Lathe G7 shows a temperature variance of +14% (88°C). Recommended Action: Inspect bearing lubricant and reduce spindle speed by 10% during peak shift.`;
      } else if (lower.includes('inventory') || lower.includes('stock') || lower.includes('sku') || lower.includes('order')) {
        responseText = `📦 **Inventory Forecast**: SKU-8842 (Tungsten Carbide Blades) has dropped below safety threshold (12 units remaining). Recommended Reorder Quantity: 50 units from primary supplier.`;
      } else if (lower.includes('worker') || lower.includes('shift') || lower.includes('efficiency')) {
        responseText = `👥 **Workforce Intelligence**: Day shift attendance is 96.4%. Overall line productivity index is currently +4.2% above baseline.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setLoading(false);
    }, 1000);
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
              <p className="text-xs text-on-surface-variant">Realtime Telemetry & CRM Intelligence</p>
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
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-secondary text-on-secondary rounded-tr-none'
                    : 'bg-surface-container-high border border-outline-variant text-on-surface rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-on-surface-variant mt-1 px-1">{m.time}</span>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-on-surface-variant italic p-2">
              <span className="material-symbols-outlined animate-spin text-primary">sync</span>
              Nexus AI is querying real-time plant metrics...
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="p-2 border-t border-outline-variant/50 bg-surface-container-low flex gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => {
              setPrompt('Check CNC Lathe G7 health');
            }}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0"
          >
            🔍 Machine Health
          </button>
          <button
            onClick={() => {
              setPrompt('Forecast inventory reorders');
            }}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0"
          >
            📦 Stock Forecast
          </button>
          <button
            onClick={() => {
              setPrompt('Summarize shift efficiency');
            }}
            className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface-variant shrink-0"
          >
            📊 Shift Report
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-outline-variant bg-surface-container flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI Assistant about plant metrics..."
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

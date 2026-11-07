import React, { useState } from 'react';
import { ChatMessage } from '../../types';
import { MessageSquare, Send, Bot, User, Sparkles, BookOpen, Key, Copy, Check, Trash2, ArrowRight } from 'lucide-react';

interface ChatbotSectionProps {
  customApiKey: string;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({ customApiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Hello! I am NeuroMind AI, your RAG-augmented Neuro-AI & Brain-Computer Interface Assistant. Ask me anything about Human Brain Anatomy, EEG Signal Processing, SNNs, GANs, Vision Transformers, or Generative AI decoding!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: data.timestamp || new Date().toLocaleTimeString(),
          ragContext: data.ragContext,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text: `Error: ${data.error || 'Failed to connect to AI server.'}\n${data.suggestion || ''}`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: 'Network error communicating with NeuroMind backend server.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider">RAG-Augmented Gemini AI Assistant</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">NeuroMind AI Chatbot</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered with Gemini 3.6 Flash and grounded via RAG vector memory over comprehensive human brain & neurotech research literature.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'welcome-1',
                    sender: 'assistant',
                    text: 'Chat history cleared. How can I assist your Neuro-AI research today?',
                    timestamp: new Date().toLocaleTimeString(),
                  },
                ])
              }
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Query Quick Buttons */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
        <div className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recommended Neuro-AI Research Prompts:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {[
            'How does EEGNet use depthwise spatial convolutions to decode Motor Imagery?',
            'Explain the mathematical difference between non-invasive EEG, semi-invasive ECoG, and invasive Utah Arrays.',
            'Explain Vision Transformers (ViT) self-attention for fMRI spatial-temporal patches.',
            'How does Mind-Vis reconstruct visual images from human brain activity using Latent Diffusion?',
          ].map((promptText) => (
            <button
              key={promptText}
              onClick={() => handleSendMessage(promptText)}
              className="text-left p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-cyan-300 hover:text-cyan-100 hover:border-cyan-500/40 transition-all flex items-center justify-between"
            >
              <span className="line-clamp-1">{promptText}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl min-h-[420px] max-h-[550px] overflow-y-auto space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md shadow-cyan-600/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 space-y-2 border shadow-lg ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80 pb-1 border-b border-white/10">
                    <span>{isUser ? 'Researcher' : 'NeuroMind RAG Engine'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>

                  {/* Grounded RAG Citations */}
                  {!isUser && msg.ragContext && msg.ragContext.length > 0 && (
                    <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                      <div className="font-bold text-cyan-400 flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Grounded RAG Sources Cited:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {msg.ragContext.map((c, idx) => (
                          <div
                            key={c.chunk.id}
                            className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between text-slate-300"
                          >
                            <span className="font-medium truncate">[Source {idx + 1}] {c.chunk.title}</span>
                            <span className="font-mono text-emerald-400 text-[10px] shrink-0 ml-2">
                              Match: {(c.similarityScore * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isUser && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center space-x-1"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy Response'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-slate-900 p-3 rounded-xl border border-slate-800 w-fit animate-pulse">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Searching RAG Vector Memory & Generating Answer...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask any question about human brain, BCI, SNN, GAN, ViT, GAI..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

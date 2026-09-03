import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessageToGemini, ChatMessage } from '../../services/geminiService';
import { 
  Sparkles, Send, Bot, User, RefreshCw, Lightbulb, 
  Compass, Calendar, Backpack, ShieldCheck, ArrowRight
} from 'lucide-react';

export const AIConciergeView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Greetings. I am your **Wanderlust AI Concierge**, powered by Google Gemini intelligence. 

I am prepared to curate your travel aspirations:
- **Optimal Travel Seasons & Weather**
- **Recommended Stay Durations & Highlights**
- **Bespoke Packing Checklists & Etiquette**
- **Private Architectural & Culinary Sanctuaries**

How may I assist your voyage today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPills: [
        'Best season for Kyoto bamboo groves',
        'How long to stay in Amalfi Coast?',
        'Luxury packing list for Swiss Alps',
        'Hidden sanctuaries in Bora Bora'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    try {
      const replyText = await sendChatMessageToGemini(query, [...messages, userMsg]);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Chat error:', e);
    } finally {
      setIsThinking(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat reset. I am ready for your next destination inquiry. Where shall we travel next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-12 flex flex-col gap-10">
      
      {/* Immersive Header */}
      <div className="relative w-full p-8 md:p-10 rounded-3xl bg-surface-container-low border border-primary/20 shadow-2xl overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-high border border-primary/25">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              Gemini AI Conversational Companion
            </span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-medium">
            Your Bespoke Journey, <span className="italic text-primary font-normal">Curated Instantly.</span>
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
            Inquire about secret mountain viewpoints, optimal seasons, culinary etiquette, or duration suggestions crafted with precision.
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container border border-primary/30 shadow-xl backdrop-blur-md relative z-10 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-on-surface">Gemini Intelligence</div>
            <div className="text-[11px] text-primary flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Online • Live Assistant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Curated Prompts & Quick Shortcuts (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Curated Prompt Chips */}
          <div className="bg-surface-container p-6 rounded-2xl shadow-xl border border-primary/15 flex flex-col gap-4">
            <h3 className="font-headline text-xl text-on-surface font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span>Curated Questions</span>
            </h3>
            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
              Tap any prompt below to query your concierge instantly:
            </p>

            <div className="flex flex-col gap-2">
              {[
                { label: 'When is best to visit Amalfi?', icon: <Calendar className="w-3.5 h-3.5 text-primary" />, q: 'What is the absolute best season to visit the Amalfi Coast and why?' },
                { label: 'Luxury packing checklist for Alps', icon: <Backpack className="w-3.5 h-3.5 text-primary" />, q: 'Provide a luxury packing checklist for Swiss Alps skiing in Zermatt.' },
                { label: 'Hidden secrets in Kyoto', icon: <Compass className="w-3.5 h-3.5 text-primary" />, q: 'Reveal insider local secrets and hidden temples in Kyoto away from tourists.' },
                { label: 'How long to spend in Bora Bora?', icon: <Sparkles className="w-3.5 h-3.5 text-primary" />, q: 'How many days should I spend in Bora Bora for the ideal balance of luxury and adventure?' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.q)}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs text-on-surface-variant hover:text-on-surface transition-all text-left border border-outline/10 group"
                >
                  <div className="p-1.5 rounded-lg bg-surface-container group-hover:bg-primary/20 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <span className="flex-1 font-light leading-snug">{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Sanctuary Suggestions */}
          <div className="bg-surface-container p-6 rounded-2xl shadow-xl border border-primary/15 flex flex-col gap-4">
            <h3 className="font-headline text-xl text-on-surface font-medium flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              <span>Featured Inquiries</span>
            </h3>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSendMessage('Tell me all about traveling to Serengeti National Park during the Great Migration.')}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors text-left group"
              >
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80"
                  alt="Serengeti"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Serengeti Migration</h4>
                  <p className="text-[11px] text-on-surface-variant font-light">Dawn hot-air balloons & private safari camps</p>
                </div>
              </button>

              <button
                onClick={() => handleSendMessage('What are the top experiences in Reykjavik and the Retreat Lagoon?')}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors text-left group"
              >
                <img
                  src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=200&q=80"
                  alt="Reykjavik"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Reykjavik Thermal Spas</h4>
                  <p className="text-[11px] text-on-surface-variant font-light">Aurora retreats & volcanic mineral lagoons</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Chat Panel (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col bg-surface-container rounded-3xl shadow-2xl border border-primary/20 overflow-hidden h-[700px]">
          
          {/* Chat Header */}
          <div className="p-4 px-6 bg-surface-container-high border-b border-primary/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-headline text-base text-on-surface font-semibold">Wanderlust Concierge</div>
                <div className="text-[11px] text-primary flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Google Gemini 1.5 Flash</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="text-xs text-on-surface-variant hover:text-primary px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-bright transition-colors flex items-center gap-1.5 border border-outline/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 max-w-[88%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-primary text-on-primary'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-primary-container text-on-primary-container rounded-tr-none font-medium'
                      : 'bg-surface-container-low text-on-surface border border-primary/15 rounded-tl-none font-light'
                  }`}
                >
                  {/* Markdown Renderer simulation */}
                  <div className="whitespace-pre-line prose prose-invert prose-sm">
                    {msg.text}
                  </div>

                  {/* Suggestion Pills */}
                  {msg.suggestedPills && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-primary/10">
                      {msg.suggestedPills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(pill)}
                          className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary text-[11px] font-medium transition-colors border border-primary/20"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-outline block text-right mt-2">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-start gap-3.5 max-w-[80%] animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center text-xs shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 rounded-tl-none flex items-center gap-2 text-xs text-on-surface-variant font-light">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300"></span>
                  <span className="ml-2">Synthesizing travel intelligence...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Bar */}
          <div className="p-4 bg-surface-container-high border-t border-primary/15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-surface-dim rounded-2xl p-1.5 border border-outline/20 focus-within:border-primary/50 transition-colors shadow-inner"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about destinations, flight seasons, packing or hidden spots..."
                className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-outline outline-none font-light"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isThinking}
                className="p-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-xl transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 shadow-md shadow-primary/20"
                title="Send inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

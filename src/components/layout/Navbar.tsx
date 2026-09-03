import React, { useState } from 'react';
import { Compass, Sparkles, CloudSun, CalendarDays, User, Menu, X } from 'lucide-react';

export type AppView = 'explore' | 'itineraries' | 'weather-and-location' | 'ai-concierge';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { id: 'itineraries', label: 'Itineraries', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'weather-and-location', label: 'Weather & Location', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'ai-concierge', label: 'AI Concierge', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e2530]/80 backdrop-blur-[16px] shadow-[0_1px_8px_rgba(0,0,0,0.2)] border-b border-[#d4af37]/20 transition-all duration-300">
      <div className="h-20 max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('explore')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary group-hover:scale-105 transition-all shadow-md">
            <Compass className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-headline text-lg md:text-xl text-primary tracking-wider uppercase font-semibold block">
              WANDERLUST
            </span>
            <span className="text-[10px] tracking-widest text-outline uppercase font-medium -mt-1 block">
              Editorial Sanctuaries
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 bg-surface-container/60 p-1.5 rounded-xl border border-primary/10">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-md font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Bookmarks */}
        <div className="flex items-center gap-3">
          <div 
            title={`${savedCount} Curated Bookmarks`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-primary/15 text-xs text-primary"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>{savedCount} Saved</span>
          </div>

          <button 
            onClick={() => handleNavClick('ai-concierge')}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary hover:scale-105 transition-transform shadow-md shadow-primary/20"
            title="Open AI Concierge"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface-container text-on-surface hover:text-primary transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-high border-b border-primary/20 px-6 py-4 flex flex-col gap-2 animate-fade-in shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

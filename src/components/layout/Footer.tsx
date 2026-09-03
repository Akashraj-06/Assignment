import React from 'react';
import { Compass, Sparkles, Globe, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-primary/15 pt-16 pb-12 text-on-surface-variant">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary border border-primary/20">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-headline text-xl text-primary font-semibold tracking-wider">
                WANDERLUST
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md font-light leading-relaxed">
              A bespoke luxury travel publication and algorithmic itinerary architect. We curate transformative global sanctuaries for the world's most discerning travelers.
            </p>
            <div className="flex items-center gap-4 text-xs text-outline mt-2">
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-primary" /> Global Telemetry</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-primary" /> Gemini AI Engine</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary" /> Curated Sanctuaries</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-on-surface font-semibold">Sanctuaries</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Kyoto Imperial Gardens</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Amalfi Coast Cliffside</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Bora Bora Overwater Lagoon</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Zermatt Alpine Chalets</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Serengeti Conservation Safari</span></li>
            </ul>
          </div>

          {/* Editorial & Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-on-surface font-semibold">Intelligence</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Gemini AI Trip Architect</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Live Planetary Telemetry</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Private Aviation & Yachting</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Designesthetics Standards</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-outline">
          <div>
            © {new Date().getFullYear()} WANDERLUST Editorial. Engineered for Designesthetics.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span>Back to zenith</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

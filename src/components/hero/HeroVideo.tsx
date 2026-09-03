import React, { useRef, useState } from 'react';
import { Search, Sparkles, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface HeroVideoProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onExploreClick: () => void;
}

const CLOUDINARY_VIDEO_URL = import.meta.env.VITE_CLOUDINARY_HERO_VIDEO_URL || '';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

export const HeroVideo: React.FC<HeroVideoProps> = ({
  searchQuery,
  onSearchChange,
  onExploreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleScrollDown = () => {
    const section = document.getElementById('destinations-grid-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine Cloudinary video source with streaming transformations if available
  const resolvedCloudinaryUrl = CLOUDINARY_VIDEO_URL
    ? (CLOUDINARY_VIDEO_URL.includes('/upload/')
        ? CLOUDINARY_VIDEO_URL.replace('/upload/', '/upload/f_auto,q_auto,vc_auto/')
        : CLOUDINARY_VIDEO_URL)
    : (CLOUDINARY_CLOUD_NAME
        ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto,vc_auto/hero-loop.mp4`
        : '');

  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[920px] flex items-center justify-center overflow-hidden">
      
      {/* Background Video Player & Fallback Poster */}
      <div className="absolute inset-0 z-0 bg-surface-dim overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 transform animate-subtle-zoom transition-transform duration-1000 opacity-70"
        >
          {/* 1. Cloudinary Optimized Video Stream (if provided) */}
          {resolvedCloudinaryUrl && (
            <source src={resolvedCloudinaryUrl} type="video/mp4" />
          )}

          {/* 2. High-definition luxury travel drone footage (Mixkit/Coverr CDN) */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-maldives-41557-large.mp4"
            type="video/mp4"
          />

          {/* 3. Local fallback */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Scrim Gradient Overlays for Readability & Editorial Mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-transparent to-surface/85"></div>
        <div className="absolute inset-0 bg-radial-vignette opacity-60"></div>
      </div>

      {/* Floating Video Controls */}
      <div className="absolute top-28 right-6 z-20 hidden sm:flex items-center gap-2 bg-surface/60 backdrop-blur-md p-1.5 rounded-full border border-primary/20 text-on-surface-variant hover:text-primary transition-colors">
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-surface-container transition-colors"
          title={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-surface-container transition-colors"
          title={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 w-full flex flex-col items-center text-center">
        
        {/* Editorial Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container/85 backdrop-blur-md border border-primary/25 mb-6 shadow-2xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">
            Curated Luxury Sanctuaries & AI Architect
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-on-surface mb-6 max-w-4xl leading-[1.1]">
          Wander Beyond <br />
          <span className="italic font-normal text-primary gold-text-gradient">
            the Ordinary.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 font-light leading-relaxed">
          Discover bespoke itineraries, private architectural retreats, and live meteorological intelligence crafted for the world's most discerning travelers.
        </p>

        {/* Integrated Hero Search Bar */}
        <div className="w-full max-w-2xl bg-surface-container/90 backdrop-blur-xl p-2 sm:p-3 rounded-2xl shadow-2xl border border-primary/25 flex flex-col sm:flex-row gap-2.5 items-center">
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-xl w-full sm:flex-1 border border-outline/10 focus-within:border-primary/50 transition-colors">
            <Search className="w-4 h-4 text-primary shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Where does your intuition lead? (e.g. Kyoto, Amalfi, Alps...)"
              className="bg-transparent border-none outline-none text-on-surface placeholder:text-outline text-sm w-full font-normal"
            />
          </div>

          <button
            onClick={() => {
              onExploreClick();
              handleScrollDown();
            }}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-fixed text-on-primary rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-sm font-semibold shadow-lg shadow-primary/20"
          >
            <span>Explore</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-on-surface-variant">
          <span className="text-outline uppercase tracking-wider text-[11px]">Trending:</span>
          {['Kyoto', 'Amalfi Coast', 'Bora Bora', 'Zermatt', 'Serengeti'].map((place) => (
            <button
              key={place}
              onClick={() => {
                onSearchChange(place);
                handleScrollDown();
              }}
              className="px-2.5 py-1 rounded-full bg-surface-container/60 hover:bg-primary/20 hover:text-primary transition-colors border border-outline/15"
            >
              {place}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none group"
      >
        <span className="text-[10px] text-outline tracking-widest uppercase font-medium group-hover:text-primary transition-colors">
          Scroll to explore
        </span>
        <div className="w-6 h-9 rounded-full border border-primary/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </button>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Destination } from '../../types/destination';
import { FamousPlacesSection } from './FamousPlacesSection';
import { useDynamicGallery } from '../../hooks/useDynamicImage';
import { 
  X, MapPin, Calendar, Clock, Globe, DollarSign, 
  Sparkles, Bookmark, CloudSun, Utensils, ShieldAlert, KeyRound
} from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onPlanTrip: (destination: Destination) => void;
  onCheckWeather: (city: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onPlanTrip,
  onCheckWeather,
}) => {
  // Dynamically fetch dynamic gallery from Unsplash/Pexels image source
  const { gallery } = useDynamicGallery(
    destination ? `${destination.name} ${destination.country}` : '',
    destination?.galleryImages || []
  );

  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (destination) {
      setActiveImage(gallery[0] || destination.heroImage);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [destination, gallery]);

  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-surface-container rounded-none md:rounded-3xl border border-primary/20 shadow-2xl overflow-hidden my-auto max-h-[100vh] md:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Top Controls */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={(e) => onToggleBookmark(destination.id, e)}
            className={`p-3 rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/30'
                : 'bg-surface/80 text-on-surface-variant hover:text-primary hover:bg-surface'
            }`}
            title={isBookmarked ? 'Saved in Bookmarks' : 'Save Destination'}
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-surface/80 text-on-surface hover:text-primary hover:bg-surface backdrop-blur-md transition-colors border border-outline/20"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-6 md:p-10">
          
          {/* Header & Hero Image Display */}
          <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden mb-8 group bg-surface-container-high">
            <img
              src={activeImage || gallery[0] || destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/30 to-transparent"></div>
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.region}, {destination.country} • {destination.continent}</span>
              </div>
              <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-semibold mb-2">
                {destination.name}
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl font-light">
                {destination.tagline}
              </p>
            </div>
          </div>

          {/* Dynamic Gallery Thumbnails */}
          {gallery && gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Intelligence Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container-low border border-primary/15 mb-8">
            <div className="flex flex-col">
              <span className="text-[11px] text-outline uppercase font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Best Season
              </span>
              <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">{destination.bestMonths}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-outline uppercase font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Ideal Stay
              </span>
              <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">{destination.idealStayDays} Days</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-outline uppercase font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" /> Avg. Sanctuary
              </span>
              <span className="text-xs sm:text-sm font-semibold text-primary mt-1">${destination.pricePerNight.toLocaleString()} / night</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] text-outline uppercase font-medium flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-primary" /> Language
              </span>
              <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">{destination.language}</span>
            </div>
          </div>

          {/* Editorial Overview */}
          <div className="flex flex-col gap-4 mb-10">
            <h3 className="font-headline text-2xl text-on-surface font-medium">Curated Sanctuary Overview</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
              {destination.detailedOverview}
            </p>
          </div>

          {/* Notable Places Section (Meets Spec 03) */}
          <FamousPlacesSection
            places={destination.famousPlaces}
            destinationName={destination.name}
          />

          {/* Local Insights & Etiquette Cards */}
          <div className="mt-12">
            <h3 className="font-headline text-2xl text-on-surface font-medium mb-6">
              Insider Intelligence & Etiquette
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline/15 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                  <Utensils className="w-4 h-4" />
                  <span>Gastronomy Advisory</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                  {destination.localInsights.dining}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline/15 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Cultural Etiquette</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                  {destination.localInsights.etiquette}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline/15 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                  <KeyRound className="w-4 h-4" />
                  <span>Private Secret Spot</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                  {destination.localInsights.secretSpot}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-6 bg-surface-container-high border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <button
              onClick={() => onCheckWeather(destination.weatherQueryCity)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-bright text-on-surface transition-colors border border-outline/20 font-medium"
            >
              <CloudSun className="w-4 h-4 text-primary" />
              <span>Live Meteorological Telemetry</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onPlanTrip(destination)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary text-sm font-semibold transition-transform transform hover:scale-[1.02] shadow-lg shadow-primary/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Architect Itinerary with AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

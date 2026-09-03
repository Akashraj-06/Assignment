import React from 'react';
import { Bookmark, Star, ArrowRight, MapPin } from 'lucide-react';
import { Destination } from '../../types/destination';
import { useDynamicImage } from '../../hooks/useDynamicImage';

interface DestinationCardProps {
  destination: Destination;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isBookmarked,
  onToggleBookmark,
  onSelect,
}) => {
  // Dynamically resolve image from Unsplash / Pexels image source
  const { imageUrl, loading } = useDynamicImage(
    `${destination.name} ${destination.country} luxury travel`,
    destination.heroImage
  );

  return (
    <div
      onClick={() => onSelect(destination)}
      className="group relative rounded-2xl overflow-hidden bg-surface-container cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 border border-primary/10 hover:border-primary/40 flex flex-col justify-between"
    >
      {/* Visual Image Container */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-surface-container-high">
        {loading && (
          <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={destination.name}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md text-[11px] font-semibold tracking-wider text-primary border border-primary/25 uppercase">
            {destination.vibe}
          </span>
          <span className="px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md text-[11px] font-medium text-on-surface border border-outline/20">
            {destination.continent}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => onToggleBookmark(destination.id, e)}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${
            isBookmarked
              ? 'bg-primary text-on-primary shadow-lg shadow-primary/30'
              : 'bg-surface/80 text-on-surface-variant hover:text-primary hover:bg-surface'
          }`}
          title={isBookmarked ? 'Remove from Saved' : 'Save Sanctuary'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Card Overlay Details */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="flex items-center gap-1.5 text-xs text-outline mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{destination.name}, {destination.country}</span>
          </div>

          <h3 className="font-headline text-2xl text-on-surface mb-2 group-hover:text-primary transition-colors leading-snug font-medium">
            {destination.tagline}
          </h3>

          <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 font-light leading-relaxed">
            {destination.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-surface-bright/40">
            <div className="flex flex-col">
              <span className="text-[11px] text-outline uppercase tracking-wider">Estimated Sanctuary</span>
              <span className="text-sm font-semibold text-primary">
                ${destination.pricePerNight.toLocaleString()} <span className="text-xs text-on-surface-variant font-normal">/ night</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-on-surface bg-surface-container-high/80 px-2.5 py-1 rounded-lg border border-outline/20">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span className="font-semibold">{destination.rating}</span>
              </div>
              <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

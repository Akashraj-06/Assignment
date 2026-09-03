import React from 'react';
import { FamousPlace } from '../../types/destination';
import { useDynamicImage } from '../../hooks/useDynamicImage';
import { Clock, Tag, Sparkles, DollarSign, Sun, Star } from 'lucide-react';

interface FamousPlaceCardProps {
  place: FamousPlace;
  destinationName: string;
}

const FamousPlaceCard: React.FC<FamousPlaceCardProps> = ({ place, destinationName }) => {
  // Dynamically fetch image from Unsplash / Pexels image source for the specific landmark
  const { imageUrl, loading } = useDynamicImage(
    `${place.name} ${destinationName}`,
    place.imageUrl
  );

  return (
    <div className="group rounded-2xl bg-surface-container-low border border-primary/15 overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-lg flex flex-col justify-between">
      {/* Image Header */}
      <div className="relative h-56 w-full overflow-hidden bg-surface-container-high">
        {loading && (
          <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={place.name}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-surface/85 backdrop-blur-md text-[11px] font-semibold text-primary border border-primary/20 flex items-center gap-1">
            <Tag className="w-3 h-3" /> {place.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface/85 backdrop-blur-md text-[11px] font-semibold text-on-surface flex items-center gap-1 border border-outline/20">
          <Star className="w-3 h-3 text-primary fill-primary" />
          <span>{place.rating}</span>
          <span className="text-outline text-[10px]">({place.reviewsCount})</span>
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <h4 className="font-headline text-xl text-on-surface font-semibold group-hover:text-primary transition-colors">
            {place.name}
          </h4>
          <p className="text-xs text-primary font-medium">{place.tagline}</p>
        </div>
      </div>

      {/* Body Description & Highlights */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
        <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
          {place.description}
        </p>

        {/* Meta Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-surface-container rounded-xl border border-outline/10 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" /> Est. Time
            </span>
            <span className="font-medium text-on-surface text-[11px] mt-0.5">{place.estimatedTime}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-primary" /> Admission
            </span>
            <span className="font-medium text-primary text-[11px] mt-0.5">{place.entryCost}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-outline uppercase flex items-center gap-1">
              <Sun className="w-3 h-3 text-primary" /> Prime Hour
            </span>
            <span className="font-medium text-on-surface text-[11px] mt-0.5">{place.bestTimeOfDay}</span>
          </div>
        </div>

        {/* Insider Tip Pill */}
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-on-surface-variant flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="text-primary font-medium">Insider Note: </strong>
            <span className="font-light">{place.insiderTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FamousPlacesSectionProps {
  places: FamousPlace[];
  destinationName: string;
}

export const FamousPlacesSection: React.FC<FamousPlacesSectionProps> = ({
  places,
  destinationName,
}) => {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-primary uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Notable Architectural & Cultural Landmarks</span>
          </div>
          <h3 className="font-headline text-2xl sm:text-3xl text-on-surface font-medium">
            Famous Places in {destinationName}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {places.map((place) => (
          <FamousPlaceCard
            key={place.id}
            place={place}
            destinationName={destinationName}
          />
        ))}
      </div>
    </div>
  );
};

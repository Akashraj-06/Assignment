import React, { useState, useMemo } from 'react';
import { Destination, VibeCategory } from '../../types/destination';
import { DestinationCard } from './DestinationCard';
import { EmptyState } from '../common/EmptyState';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface DestinationGridProps {
  destinations: Destination[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectDestination: (dest: Destination) => void;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  destinations,
  searchQuery,
  onSearchChange,
  bookmarks,
  onToggleBookmark,
  onSelectDestination,
}) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>('all');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'price-asc' | 'price-desc'>('match');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const categories: { id: VibeCategory; label: string }[] = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'gastronomy', label: 'Gastronomy' },
    { id: 'wilderness', label: 'Wilderness & Peaks' },
    { id: 'island', label: 'Private Islands' },
    { id: 'heritage', label: 'Heritage & Art' },
    { id: 'wellness', label: 'Thermal & Wellness' },
  ];

  const continents = ['all', 'Asia', 'Europe', 'Oceania', 'Africa', 'Americas'];

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Vibe filter
        if (selectedVibe !== 'all' && dest.vibe !== selectedVibe) return false;
        // Continent filter
        if (selectedContinent !== 'all' && dest.continent !== selectedContinent) return false;
        // Bookmarks only
        if (showBookmarksOnly && !bookmarks.includes(dest.id)) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchCountry = dest.country.toLowerCase().includes(q);
          const matchTagline = dest.tagline.toLowerCase().includes(q);
          const matchVibe = dest.vibe.toLowerCase().includes(q);
          const matchPlaces = dest.famousPlaces.some((p) => p.name.toLowerCase().includes(q));
          return matchName || matchCountry || matchTagline || matchVibe || matchPlaces;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        return 0; // default curated match
      });
  }, [destinations, selectedVibe, selectedContinent, showBookmarksOnly, searchQuery, sortBy, bookmarks]);

  const handleResetFilters = () => {
    setSelectedVibe('all');
    setSelectedContinent('all');
    setShowBookmarksOnly(false);
    onSearchChange('');
  };

  return (
    <section id="destinations-grid-section" className="w-full bg-surface py-16 scroll-mt-20">
      
      {/* Category Navigation Bar */}
      <div className="w-full bg-surface-container-low py-6 border-y border-surface-container mb-12 shadow-md">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Vibe Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
            <span className="text-xs uppercase tracking-widest text-outline mr-1 shrink-0 font-medium">
              Vibe:
            </span>
            {categories.map((cat) => {
              const active = selectedVibe === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedVibe(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                    active
                      ? 'bg-primary text-on-primary shadow-md font-semibold'
                      : 'bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Controls: Bookmarks & Sorting */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
            
            {/* Bookmarks Toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                showBookmarksOnly
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-surface-container border-outline/20 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>Saved Only ({bookmarks.length})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline/20">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-on-surface outline-none cursor-pointer font-medium"
              >
                <option value="match" className="bg-surface-container text-on-surface">Curated Match</option>
                <option value="rating" className="bg-surface-container text-on-surface">Highest Rated</option>
                <option value="price-asc" className="bg-surface-container text-on-surface">Price: Low to High</option>
                <option value="price-desc" className="bg-surface-container text-on-surface">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-primary tracking-widest uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hand-Selected Escapes</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-medium">
              Featured Sanctuaries
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md font-light leading-relaxed">
            Every destination is meticulously evaluated for architectural distinction, ecological privacy, and transformative local immersion.
          </p>
        </div>

        {/* Results Counter & Search Indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs text-outline bg-surface-container/50 px-4 py-2.5 rounded-xl border border-primary/15">
            <span>Showing results for: <strong className="text-primary font-medium">"{searchQuery}"</strong></span>
            <button onClick={() => onSearchChange('')} className="text-on-surface-variant hover:text-primary underline">
              Clear search
            </button>
          </div>
        )}

        {/* Grid or Empty State */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isBookmarked={bookmarks.includes(destination.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectDestination}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Matching Sanctuaries"
            description="We could not find destinations matching your active search or filters. Try clearing your filters to explore our full curated catalogue."
            actionText="Reset All Filters"
            onAction={handleResetFilters}
          />
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Navbar, AppView } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroVideo } from './components/hero/HeroVideo';
import { DestinationGrid } from './components/explorer/DestinationGrid';
import { DestinationDetailModal } from './components/destination/DestinationDetailModal';
import { WeatherView } from './components/weather/WeatherView';
import { AIConciergeView } from './components/ai/AIConciergeView';
import { ItineraryPlannerView } from './components/itinerary/ItineraryPlannerView';
import { DESTINATIONS_DATA } from './data/destinations';
import { Destination } from './types/destination';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(['kyoto-japan', 'amalfi-coast-italy']);
  const [preselectedCityForWeather, setPreselectedCityForWeather] = useState<string>('Kyoto');
  const [preselectedDestForPlanner, setPreselectedDestForPlanner] = useState<string>('Kyoto');

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlanTripForDestination = (dest: Destination) => {
    setPreselectedDestForPlanner(dest.name);
    setSelectedDestination(null);
    setCurrentView('itineraries');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckWeatherForDestination = (city: string) => {
    setPreselectedCityForWeather(city);
    setSelectedDestination(null);
    setCurrentView('weather-and-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Fixed Luxury Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        savedCount={bookmarks.length}
      />

      {/* Main View Container */}
      <main className="flex-1 pt-20">
        {currentView === 'explore' && (
          <div className="flex flex-col w-full animate-fade-in">
            {/* 01. Landing Experience: Hero with Looping Video */}
            <HeroVideo
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onExploreClick={() => {
                const el = document.getElementById('destinations-grid-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 02. Destination Explorer & 03. Famous Places Showcase */}
            <DestinationGrid
              destinations={DESTINATIONS_DATA}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onSelectDestination={(dest) => setSelectedDestination(dest)}
            />
          </div>
        )}

        {currentView === 'itineraries' && (
          <div className="animate-fade-in">
            {/* 08. Structured Day-by-Day Itinerary Planning */}
            <ItineraryPlannerView preselectedDestination={preselectedDestForPlanner} />
          </div>
        )}

        {currentView === 'weather-and-location' && (
          <div className="animate-fade-in">
            {/* 04. Location Awareness & 05. Real-Time Weather */}
            <WeatherView
              initialCity={preselectedCityForWeather}
              onSelectDestination={(dest) => {
                setSelectedDestination(dest);
              }}
            />
          </div>
        )}

        {currentView === 'ai-concierge' && (
          <div className="animate-fade-in">
            {/* 07. Conversational AI Assistant (Google Gemini) */}
            <AIConciergeView />
          </div>
        )}
      </main>

      {/* Destination Detail Modal with Famous Places Section */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isBookmarked={selectedDestination ? bookmarks.includes(selectedDestination.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onPlanTrip={handlePlanTripForDestination}
        onCheckWeather={handleCheckWeatherForDestination}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;

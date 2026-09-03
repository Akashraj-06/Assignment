import React, { useState, useEffect } from 'react';
import { GeneratedItinerary, TravelStyle, BudgetLevel, ItineraryActivity } from '../../types/itinerary';
import { generateItineraryWithGemini } from '../../services/geminiService';
import { ExportModal } from './ExportModal';
import { DESTINATIONS_DATA } from '../../data/destinations';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Calendar, Clock, DollarSign, Star, 
  CheckCircle, Circle, MapPin, Printer, RefreshCw, 
  Check, ArrowRight, Sliders, ShieldCheck, Compass
} from 'lucide-react';

interface ItineraryPlannerViewProps {
  preselectedDestination?: string;
}

export const ItineraryPlannerView: React.FC<ItineraryPlannerViewProps> = ({
  preselectedDestination,
}) => {
  const [selectedDestination, setSelectedDestination] = useState(preselectedDestination || 'Kyoto');
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Cultural Immersion');
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('Curated Luxury');
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  // Auto-generate initial itinerary on mount
  useEffect(() => {
    handleGenerateItinerary();
  }, []);

  // Update destination if preselected changes
  useEffect(() => {
    if (preselectedDestination && preselectedDestination !== selectedDestination) {
      setSelectedDestination(preselectedDestination);
    }
  }, [preselectedDestination]);

  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    try {
      const result = await generateItineraryWithGemini(
        selectedDestination,
        durationDays,
        travelStyle,
        budgetLevel
      );
      setItinerary(result);
      setActiveDayNumber(1);

      // Trigger celebratory aesthetic confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f2ca50', '#d4af37', '#dfe2f1']
      });
    } catch (e) {
      console.error('Itinerary generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleActivityComplete = (actId: string) => {
    setCompletedActivities((prev) => ({
      ...prev,
      [actId]: !prev[actId]
    }));
  };

  const activeDay = itinerary?.days.find((d) => d.dayNumber === activeDayNumber) || itinerary?.days[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-12 flex flex-col gap-10">
      
      {/* Top Generator Control Hub */}
      <section className="relative w-full p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-primary/20 shadow-2xl overflow-hidden flex flex-col gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Wanderlust Bespoke AI Trip Architect
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl text-on-surface font-medium">
              {itinerary ? itinerary.title : 'Architect Your Next Voyage'}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
              {itinerary ? itinerary.overview : 'Select your destination and parameters to synthesize an algorithmic day-by-day journey.'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowExportModal(true)}
              disabled={!itinerary}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs sm:text-sm text-on-surface font-medium transition-colors border border-outline/20 disabled:opacity-40"
            >
              <Printer className="w-4 h-4 text-primary" />
              <span>Export Itinerary</span>
            </button>
          </div>
        </div>

        {/* Customization Parameters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-primary/15 relative z-10">
          
          {/* Destination Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-outline font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" /> Destination
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="bg-surface-container text-xs sm:text-sm text-on-surface px-3.5 py-2.5 rounded-xl border border-outline/20 outline-none focus:border-primary cursor-pointer font-medium"
            >
              {DESTINATIONS_DATA.map((d) => (
                <option key={d.id} value={d.name} className="bg-surface-container text-on-surface">
                  {d.name}, {d.country}
                </option>
              ))}
              <option value="Reykjavik" className="bg-surface-container text-on-surface">Reykjavik, Iceland</option>
              <option value="Paris" className="bg-surface-container text-on-surface">Paris, France</option>
              <option value="Tokyo" className="bg-surface-container text-on-surface">Tokyo, Japan</option>
            </select>
          </div>

          {/* Duration Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-outline font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-primary" /> Duration
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="bg-surface-container text-xs sm:text-sm text-on-surface px-3.5 py-2.5 rounded-xl border border-outline/20 outline-none focus:border-primary cursor-pointer font-medium"
            >
              {[3, 4, 5, 6, 7].map((days) => (
                <option key={days} value={days} className="bg-surface-container text-on-surface">
                  {days} Days Sanctuary Journey
                </option>
              ))}
            </select>
          </div>

          {/* Travel Style */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-wider text-outline font-medium flex items-center gap-1">
              <Sliders className="w-3 h-3 text-primary" /> Travel Persona
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
              className="bg-surface-container text-xs sm:text-sm text-on-surface px-3.5 py-2.5 rounded-xl border border-outline/20 outline-none focus:border-primary cursor-pointer font-medium"
            >
              <option value="Cultural Immersion" className="bg-surface-container">Cultural Immersion</option>
              <option value="Luxury & Relaxation" className="bg-surface-container">Luxury & Relaxation</option>
              <option value="Epicurean & Gastronomy" className="bg-surface-container">Epicurean & Gastronomy</option>
              <option value="Adventure & Wilderness" className="bg-surface-container">Adventure & Wilderness</option>
              <option value="Art & Architecture" className="bg-surface-container">Art & Architecture</option>
            </select>
          </div>

          {/* Generate Action Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateItinerary}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary text-xs sm:text-sm font-semibold transition-transform transform hover:scale-[1.02] shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Architecting...' : 'Generate Itinerary'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout: Timeline & Sidebar */}
      {itinerary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Day Tabs & Structured Timeline (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Day Selector Tabs (Meets Spec 08: Readable Day-by-Day plan) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {itinerary.days.map((day) => {
                const isActive = day.dayNumber === activeDayNumber;
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayNumber(day.dayNumber)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 border ${
                      isActive
                        ? 'bg-primary text-on-primary border-primary shadow-md'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border-outline/20'
                    }`}
                  >
                    Day {day.dayNumber}: {day.themeTitle.split(':')[0].substring(0, 16)}...
                  </button>
                );
              })}
            </div>

            {/* Active Day Card Header */}
            {activeDay && (
              <div className="p-5 rounded-2xl bg-surface-container-low border border-primary/15 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider font-semibold">
                  <span>Day {activeDay.dayNumber} Focus</span>
                </div>
                <h3 className="font-headline text-2xl text-on-surface font-medium">
                  {activeDay.themeTitle}
                </h3>
                <p className="text-xs text-on-surface-variant font-light">
                  {activeDay.summary}
                </p>
              </div>
            )}

            {/* Structured Timeline Activity Cards */}
            {activeDay && (
              <div className="flex flex-col gap-6 relative">
                {/* Vertical Gold Accent Timeline Bar */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-primary/25 hidden sm:block"></div>

                {activeDay.activities.map((act) => {
                  const isDone = completedActivities[act.id] || false;
                  return (
                    <div key={act.id} className="relative sm:pl-16 group">
                      {/* Timeline Dot */}
                      <button
                        onClick={() => toggleActivityComplete(act.id)}
                        className={`absolute left-6 top-7 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-surface hidden sm:flex items-center justify-center transition-colors z-10 ${
                          isDone ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary hover:bg-primary/30'
                        }`}
                        title="Mark activity completed"
                      >
                        {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </button>

                      {/* Activity Card */}
                      <div className={`p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all shadow-xl border flex flex-col md:flex-row gap-6 items-start justify-between ${
                        isDone ? 'border-primary/50 opacity-75' : 'border-primary/15'
                      }`}>
                        <div className="flex flex-col gap-2 flex-1">
                          
                          {/* Slot & Time Range */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-primary/15 text-primary rounded-md text-[11px] uppercase tracking-wider font-semibold border border-primary/20">
                              {act.timeSlot} • {act.timeRange}
                            </span>
                            <span className="text-[11px] text-outline font-light">
                              {act.categoryTag}
                            </span>
                          </div>

                          {/* Activity Title */}
                          <h4 className={`font-headline text-xl text-on-surface font-semibold ${isDone ? 'line-through text-outline' : ''}`}>
                            {act.title}
                          </h4>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                            {act.description}
                          </p>

                          {/* Cost & Rating */}
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="text-primary font-semibold flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" /> {act.estimatedCost}
                            </span>
                            <span className="text-on-surface-variant flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {act.rating} ({act.reviewsCount})
                            </span>
                          </div>

                          {/* Insider Tip */}
                          {act.insiderTip && (
                            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline/10 text-xs text-on-surface-variant mt-2 font-light">
                              <strong className="text-primary font-medium">Insider Advice: </strong>
                              {act.insiderTip}
                            </div>
                          )}
                        </div>

                        {/* Activity Photo */}
                        <div className="w-full md:w-44 h-32 rounded-xl overflow-hidden shrink-0 relative group">
                          <img
                            src={act.imageUrl}
                            alt={act.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Trip Overview & Dossier (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Trip Summary Card */}
            <div className="p-6 rounded-2xl bg-surface-container border border-primary/20 shadow-xl flex flex-col gap-4">
              <h3 className="font-headline text-xl text-on-surface font-medium flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                <span>Voyage Dossier</span>
              </h3>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between py-2 border-b border-outline/10">
                  <span className="text-outline">Destination</span>
                  <span className="font-semibold text-on-surface">{itinerary.destination}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline/10">
                  <span className="text-outline">Duration</span>
                  <span className="font-semibold text-on-surface">{itinerary.durationDays} Days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline/10">
                  <span className="text-outline">Travel Style</span>
                  <span className="font-semibold text-primary">{itinerary.travelStyle}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-outline/10">
                  <span className="text-outline">Est. Investment</span>
                  <span className="font-semibold text-primary">{itinerary.totalEstimatedCost}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-primary/15 text-xs">
                <span className="font-semibold text-primary block mb-1">Recommended Season</span>
                <p className="text-on-surface-variant font-light leading-relaxed">{itinerary.seasonRecommendation}</p>
              </div>

              <button
                onClick={() => setShowExportModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary text-xs font-semibold shadow-md transition-transform transform hover:scale-[1.02]"
              >
                <Printer className="w-4 h-4" />
                <span>Export Itinerary Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          itinerary={itinerary}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

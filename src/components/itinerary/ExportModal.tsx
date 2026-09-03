import React from 'react';
import { GeneratedItinerary } from '../../types/itinerary';
import { X, Printer, Download, Sparkles, Check } from 'lucide-react';

interface ExportModalProps {
  itinerary: GeneratedItinerary | null;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ itinerary, onClose }) => {
  if (!itinerary) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-surface-container rounded-3xl border border-primary/30 shadow-2xl p-6 sm:p-10 flex flex-col gap-6 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-headline text-2xl text-on-surface font-semibold">
              Bespoke Itinerary Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors text-on-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Content Area */}
        <div id="printable-itinerary" className="flex flex-col gap-6 text-on-surface">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-1">
              WANDERLUST ARCHITECTED EXPEDITION
            </span>
            <h1 className="font-headline text-3xl font-semibold text-on-surface">
              {itinerary.title}
            </h1>
            <p className="text-xs text-outline mt-1">
              Destination: {itinerary.destination} • Duration: {itinerary.durationDays} Days • Style: {itinerary.travelStyle}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/15 text-xs sm:text-sm font-light leading-relaxed">
            {itinerary.overview}
          </div>

          {/* Days Summary */}
          <div className="flex flex-col gap-6">
            {itinerary.days.map((day) => (
              <div key={day.dayNumber} className="border-l-2 border-primary pl-4 flex flex-col gap-3">
                <h3 className="font-headline text-lg font-semibold text-primary">
                  Day {day.dayNumber}: {day.themeTitle}
                </h3>
                <p className="text-xs text-on-surface-variant font-light">{day.summary}</p>
                
                <div className="flex flex-col gap-2 mt-1">
                  {day.activities.map((act, aIdx) => (
                    <div key={aIdx} className="p-3 rounded-xl bg-surface-container-low text-xs flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <span className="font-semibold text-on-surface">[{act.timeSlot} - {act.timeRange}] {act.title}</span>
                        <p className="text-on-surface-variant font-light mt-0.5">{act.description}</p>
                      </div>
                      <span className="text-primary font-semibold shrink-0">{act.estimatedCost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-high flex items-center justify-between text-xs">
            <span>Total Estimated Investment: <strong className="text-primary font-semibold">{itinerary.totalEstimatedCost}</strong></span>
            <span className="text-outline">Wanderlust Verified Edition</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-primary/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs text-on-surface transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed text-on-primary text-xs font-semibold shadow-lg shadow-primary/20 transition-transform transform hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

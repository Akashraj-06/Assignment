import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Sanctuaries Found',
  description = 'We could not find destinations matching your criteria. Try expanding your search or selecting a different vibe category.',
  actionText = 'Reset Filters',
  onAction,
}) => {
  return (
    <div className="w-full py-16 px-6 rounded-2xl bg-surface-container-low border border-primary/15 flex flex-col items-center justify-center text-center max-w-xl mx-auto shadow-xl">
      <div className="w-16 h-16 rounded-full bg-surface-container-high border border-primary/30 flex items-center justify-center text-primary mb-4 shadow-lg">
        <Compass className="w-8 h-8 opacity-80" />
      </div>
      <h3 className="font-headline text-2xl text-on-surface mb-2 font-medium">
        {title}
      </h3>
      <p className="text-sm text-on-surface-variant mb-6 font-light max-w-md leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-fixed transition-colors shadow-md shadow-primary/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

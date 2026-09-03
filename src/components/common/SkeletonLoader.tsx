import React from 'react';

export const DestinationSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface-container border border-outline/15 animate-pulse flex flex-col h-[450px]">
      <div className="h-60 bg-surface-container-high w-full"></div>
      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
          <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
          <div className="h-4 bg-surface-container-high rounded w-full"></div>
        </div>
        <div className="h-10 bg-surface-container-high rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-surface-container border border-primary/15 p-8 animate-pulse flex flex-col gap-6">
      <div className="h-8 bg-surface-container-high rounded w-1/2"></div>
      <div className="h-20 bg-surface-container-high rounded w-3/4"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-surface-container-high rounded"></div>
        <div className="h-12 bg-surface-container-high rounded"></div>
      </div>
    </div>
  );
};

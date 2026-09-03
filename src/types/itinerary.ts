export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';
export type TravelStyle = 'Luxury & Relaxation' | 'Cultural Immersion' | 'Epicurean & Gastronomy' | 'Adventure & Wilderness' | 'Art & Architecture';
export type BudgetLevel = 'Curated Luxury' | 'Ultra High-End' | 'Bespoke Executive';

export interface ItineraryActivity {
  id: string;
  timeSlot: TimeSlot;
  timeRange: string;
  title: string;
  description: string;
  location: string;
  estimatedCost: string;
  rating: number;
  reviewsCount: number;
  categoryTag: string;
  imageUrl: string;
  insiderTip: string;
  completed?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  themeTitle: string;
  summary: string;
  activities: ItineraryActivity[];
}

export interface GeneratedItinerary {
  id: string;
  destination: string;
  country: string;
  durationDays: number;
  travelStyle: TravelStyle;
  budgetLevel: BudgetLevel;
  title: string;
  overview: string;
  totalEstimatedCost: string;
  seasonRecommendation: string;
  days: ItineraryDay[];
  createdAt: string;
}

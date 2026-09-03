export type VibeCategory = 'all' | 'gastronomy' | 'wilderness' | 'island' | 'heritage' | 'wellness';

export interface FamousPlace {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  estimatedTime: string;
  category: string;
  rating: number;
  reviewsCount: number;
  entryCost: string;
  bestTimeOfDay: string;
  insiderTip: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  continent: 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  tagline: string;
  description: string;
  detailedOverview: string;
  heroImage: string;
  galleryImages: string[];
  vibe: VibeCategory;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  idealStayDays: number;
  bestMonths: string;
  climate: string;
  language: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  famousPlaces: FamousPlace[];
  localInsights: {
    dining: string;
    etiquette: string;
    secretSpot: string;
  };
  weatherQueryCity: string;
}

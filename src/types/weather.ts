export interface WeatherData {
  city: string;
  country: string;
  temperatureC: number;
  temperatureF: number;
  condition: string;
  conditionDescription: string;
  icon: string;
  humidity: number;
  windSpeedKmh: number;
  windSpeedMph: number;
  uvIndex: number;
  visibilityKm: number;
  airQuality: 'Excellent' | 'Good' | 'Moderate' | 'Fair';
  travelAdvisory: string;
  forecast: Array<{
    dayName: string;
    date: string;
    tempHighC: number;
    tempLowC: number;
    tempHighF: number;
    tempLowF: number;
    condition: string;
    icon: string;
    rainProbability: number;
  }>;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UserLocationState {
  isLocating: boolean;
  isGranted: boolean;
  isDenied: boolean;
  latitude: number | null;
  longitude: number | null;
  city: string;
  error: string | null;
}

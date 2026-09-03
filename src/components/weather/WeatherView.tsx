import React, { useState, useEffect } from 'react';
import { WeatherData } from '../../types/weather';
import { fetchWeatherForCityOrCoords } from '../../services/weatherService';
import { reverseGeocodeCoords, calculateHaversineDistance } from '../../services/geolocationService';
import { DESTINATIONS_DATA } from '../../data/destinations';
import { Destination } from '../../types/destination';
import { 
  CloudSun, MapPin, Navigation, Search, Wind, Droplets, 
  Eye, Sun, AlertTriangle, CheckCircle2, RefreshCw, Compass
} from 'lucide-react';

interface WeatherViewProps {
  initialCity?: string;
  onSelectDestination?: (dest: Destination) => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ initialCity = 'Kyoto', onSelectDestination }) => {
  const [activeCity, setActiveCity] = useState(initialCity);
  const [searchInput, setSearchInput] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [userLocationName, setUserLocationName] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Load initial weather
  useEffect(() => {
    loadWeather(activeCity);
  }, [activeCity]);

  const loadWeather = async (query: string, lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const data = await fetchWeatherForCityOrCoords(query, lat, lng);
      setWeatherData(data);
    } catch (e) {
      console.error('Weather load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setGeoStatus('granted');
        const resolvedName = await reverseGeocodeCoords(latitude, longitude);
        setUserLocationName(resolvedName);
        setActiveCity(resolvedName);
        await loadWeather(resolvedName, latitude, longitude);
        setLocating(false);
      },
      (err) => {
        console.warn('Geolocation permission denied or timed out:', err);
        setGeoStatus('denied');
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveCity(searchInput.trim());
      setSearchInput('');
    }
  };

  // Find nearest curated sanctuary if user coords are known
  const nearestSanctuary = userCoords
    ? DESTINATIONS_DATA.map((d) => ({
        ...d,
        distanceKm: calculateHaversineDistance(
          userCoords.lat,
          userCoords.lng,
          d.coordinates.lat,
          d.coordinates.lng
        ),
      })).sort((a, b) => a.distanceKm - b.distanceKm)[0]
    : null;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-12 flex flex-col gap-10">
      
      {/* Top Header & Unit Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-primary/15">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Meteorological & Geolocation Intelligence
            </span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl text-on-surface font-medium">
            Planetary Weather & Location
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
            Real-time planetary conditions, hyper-local meteorological advisories, and bespoke travel intelligence tailored to your exact coordinates.
          </p>
        </div>

        {/* Action Buttons: Detect Location & Unit Toggle */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleDetectLocation}
            disabled={locating}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Triangulating...' : 'Detect My Location'}</span>
          </button>

          <div className="flex items-center bg-surface-container rounded-xl p-1 border border-primary/20">
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                unit === 'C' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                unit === 'F' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Geolocation Status Alert Banner (Design for Spec 04: Denied/Granted states) */}
      {geoStatus === 'denied' && (
        <div className="p-4 rounded-2xl bg-surface-container-high border border-primary/30 flex items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-on-surface">
                Location Access Denied or Unavailable
              </p>
              <p className="text-xs text-on-surface-variant font-light">
                No problem. You can effortlessly explore any sanctuary worldwide using the search bar or preset chips below.
              </p>
            </div>
          </div>
        </div>
      )}

      {geoStatus === 'granted' && userLocationName && (
        <div className="p-4 rounded-2xl bg-surface-container-high border border-primary/40 flex items-center justify-between gap-4 animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="text-on-surface font-medium">Location Triangulated: </span>
              <strong className="text-primary">{userLocationName}</strong>
              {nearestSanctuary && (
                <span className="text-on-surface-variant ml-2 hidden sm:inline">
                  (Nearest Sanctuary: {nearestSanctuary.name} • {nearestSanctuary.distanceKm} km away)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search & Location Selection Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Manual Search Card */}
        <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-primary/15 relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-headline text-xl text-on-surface font-medium">Search Sanctuary</span>
              <Search className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
              Search any global destination or sanctuary for instant meteorological telemetry and advisories.
            </p>

            <form onSubmit={handleSearchSubmit} className="relative mt-2">
              <MapPin className="absolute left-3.5 top-3.5 text-primary w-4 h-4" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. Kyoto, Positano, Zermatt..."
                className="w-full bg-surface-dim text-on-surface placeholder:text-outline text-xs sm:text-sm pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary border border-outline/20 transition-all font-light"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-fixed"
              >
                Go
              </button>
            </form>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-6 pt-4 border-t border-outline/10">
            <span className="text-[10px] text-outline uppercase tracking-wider block mb-2 font-medium">
              Popular Telemetry Feeds:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Kyoto', 'Amalfi Coast', 'Bora Bora', 'Zermatt', 'Reykjavik', 'Serengeti'].map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors border ${
                    activeCity.toLowerCase().includes(city.toLowerCase())
                      ? 'bg-primary text-on-primary border-primary font-semibold'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-primary border-outline/20'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Coordinates Preview Card */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden relative min-h-[260px] shadow-xl border border-primary/20 group flex flex-col justify-end p-6 sm:p-8">
          <img
            src={
              weatherData?.city.toLowerCase().includes('kyoto')
                ? 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'
                : weatherData?.city.toLowerCase().includes('amalfi')
                ? 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
                : weatherData?.city.toLowerCase().includes('zermatt')
                ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
                : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
            }
            alt="Location Atmosphere"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-black/30"></div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                  Active Sanctuary Coordinates
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-semibold">
                {weatherData?.city || activeCity}
              </h2>
              <p className="text-xs text-on-surface-variant font-light mt-1">
                {weatherData?.coordinates.lat.toFixed(4)}° N, {weatherData?.coordinates.lng.toFixed(4)}° E • Live Telemetry Active
              </p>
            </div>

            <div className="flex items-center gap-2 bg-surface/85 backdrop-blur-md px-4 py-2 rounded-xl border border-primary/25 text-xs text-on-surface shadow-md">
              <RefreshCw className={`w-3.5 h-3.5 text-primary ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Refreshing feed...' : 'Real-time telemetry'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Weather Telemetry Dashboard */}
      {weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Current Conditions Large Card */}
          <div className="bg-surface-container rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-primary/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Current Atmospheric State
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                Optimal Visibility
              </span>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-6xl sm:text-7xl text-on-surface font-semibold">
                  {unit === 'C' ? weatherData.temperatureC : weatherData.temperatureF}
                </span>
                <span className="font-headline text-3xl text-primary font-light">
                  °{unit}
                </span>
              </div>
              <p className="text-base sm:text-lg text-on-surface font-medium capitalize mt-2">
                {weatherData.conditionDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/15 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase block font-medium">Humidity</span>
                  <span className="text-sm font-semibold text-on-surface">{weatherData.humidity}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase block font-medium">Wind Velocity</span>
                  <span className="text-sm font-semibold text-on-surface">
                    {unit === 'C' ? `${weatherData.windSpeedKmh} km/h` : `${weatherData.windSpeedMph} mph`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Meteorological Metrics & Advisory Card */}
          <div className="bg-surface-container rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-primary/15">
            <div>
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold block mb-4">
                Telemetry Diagnostics
              </span>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline/10">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Sun className="w-4 h-4" />
                    <span className="text-[11px] font-medium uppercase text-outline">UV Index</span>
                  </div>
                  <span className="text-lg font-semibold text-on-surface">{weatherData.uvIndex} (Moderate)</span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline/10">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-[11px] font-medium uppercase text-outline">Visibility</span>
                  </div>
                  <span className="text-lg font-semibold text-on-surface">{weatherData.visibilityKm} km</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                  Travel & Wardrobe Advisory
                </span>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                  {weatherData.travelAdvisory}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline/10 flex items-center justify-between text-xs text-outline">
              <span>Sensor: Planetary Calibrated Telemetry</span>
              <span className="text-primary font-medium">Status: Live</span>
            </div>
          </div>

          {/* 5-Day Outlook Strip */}
          <div className="bg-surface-container rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-primary/15">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-4 block">
              5-Day Meteorological Outlook
            </span>

            <div className="flex flex-col gap-3">
              {weatherData.forecast.map((fc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline/10 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface">{fc.dayName}</span>
                    <span className="text-[10px] text-outline">{fc.date}</span>
                  </div>

                  <span className="text-xs text-on-surface-variant font-light hidden sm:inline">
                    {fc.condition}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary">
                      {unit === 'C' ? `${fc.tempHighC}°` : `${fc.tempHighF}°`}
                    </span>
                    <span className="text-xs text-outline">
                      {unit === 'C' ? `${fc.tempLowC}°` : `${fc.tempLowF}°`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

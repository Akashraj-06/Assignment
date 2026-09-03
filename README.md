# 🌍 WANDERLUST — Curated Luxury Travel & AI Itinerary Architect

> A design-led, high-aesthetic travel web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Google Gemini AI**.
> Designed and engineered in strict adherence to the **Designesthetics Front-End Developer Assignment** specifications.

---

## 📸 Overview & Key Features

WANDERLUST is an editorial digital sanctuary for discerning travelers. It combines atmospheric visual storytelling, real-time planetary meteorological telemetry, and AI-powered trip planning into a dark-mode luxury experience.

### Implemented Specifications (1 to 8):

1. **01. Landing Experience (Hero Video Loop)**
   - Ambient, looping background video with dark gradient scrim overlays for contrast and readability.
   - Editorial typography pairing *Playfair Display* with clean *Inter* body copy.
   - Interactive hero search with instant destination query triggers and animated scroll exploration indicator.
2. **02. Destination Explorer**
   - Multi-tag category filtering (*Gastronomy*, *Wilderness & Peaks*, *Private Islands*, *Heritage & Art*, *Thermal & Wellness*).
   - Instant search across destinations, countries, and landmark attractions with debounced feedback.
   - Curated bookmarking system to save sanctuaries locally.
3. **03. Famous Places Showcase**
   - Each sanctuary features notable architectural and natural attractions presented with high-resolution photography, category tags, estimated visit times, admission costs, prime visiting hours, and insider advisory tips (*not just a bare list*).
4. **04. Location Awareness**
   - HTML5 Geolocation integration ("Detect My Location") with automatic reverse-geocoding.
   - **Designed Fallback**: Graceful banner for denied permissions and interactive manual search input with global preset city chips (*Kyoto, Amalfi, Bora Bora, Zermatt, Reykjavik, Serengeti*).
   - Nearest sanctuary calculation using the Haversine formula.
5. **05. Real-Time Meteorological Telemetry**
   - Live weather integration supporting **OpenWeatherMap API** with a reliable **Open-Meteo live fallback** (no key required).
   - Interactive `°C` / `°F` unit switching.
   - Comprehensive telemetry: temperature, condition description, humidity percentage, wind velocity, UV index, visibility range, and tailored wardrobe advisories.
   - 5-Day forward meteorological forecast strip.
6. **06. Dynamic Global Imagery (Cloudinary, Unsplash & Pexels)**
   - Dynamic image delivery with support for **Cloudinary CDN** (automatic WebP/AVIF format optimization and responsive transformations), **Unsplash**, and **Pexels API** with in-memory caching and blur-up loading skeletons.
7. **07. Conversational AI Travel Companion (Gemini)**
   - Conversational travel assistant powered by **Google Gemini 1.5 Flash**.
   - Curated quick prompt pills (*Best season to visit*, *Luxury packing checklist*, *Local secret spots*).
   - Contextual chat memory, streaming response simulation, and reset capabilities.
8. **08. Structured Day-by-Day Itinerary Planning**
   - Algorithmic trip generator with customizable destination, duration (3 to 7 days), travel style persona, and budget tier.
   - Renders a **visual timeline** with interactive tabs, morning/afternoon/evening slots, activity pricing, rating badges, and completion checkboxes (*not a raw block of text*).
   - **Export / Print Dossier Modal** with celebratory particle feedback.

---

## 🛠️ Tech Stack & Design Tokens

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom editorial design tokens (Obsidian `#0F131D`, Warm Gold `#D4AF37` / `#F2CA50`, Deep Slate `#1C1F2A`)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Tailwind keyframe transitions, Backdrop blur glassmorphism
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`)
- **Weather Services**: OpenWeatherMap API & Open-Meteo Engine
- **Image & Media Services**: Cloudinary CDN, Unsplash & Pexels API

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd wanderlust-travel-app
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Placeholders & What to Insert

All placeholder variables and asset slots have been cleanly isolated:

| Placeholder Slot | File Location | What to Place | Fallback Behavior |
| :--- | :--- | :--- | :--- |
| **Google Gemini API Key** | `.env` (`VITE_GEMINI_API_KEY`) | Your Google AI Studio API Key ([Get here](https://aistudio.google.com/)) | Activates built-in intelligent contextual response engine. |
| **OpenWeatherMap API Key** | `.env` (`VITE_OPENWEATHER_API_KEY`) | Your OpenWeatherMap free API key ([Get here](https://openweathermap.org/api)) | Automatically falls back to live Open-Meteo worldwide telemetry. |
| **Cloudinary Cloud Name** | `.env` (`VITE_CLOUDINARY_CLOUD_NAME`) | Your Cloudinary Cloud Name ([Get here](https://cloudinary.com/)) | Enables dynamic `f_auto,q_auto` image delivery and CDN transformation. |
| **Unsplash Access Key** | `.env` (`VITE_UNSPLASH_ACCESS_KEY`) | Your Unsplash Developer Access Key ([Get here](https://unsplash.com/developers)) | Uses curated high-res travel photography dataset. |
| **Pexels API Key** | `.env` (`VITE_PEXELS_API_KEY`) | Your Pexels API Key ([Get here](https://www.pexels.com/api/)) | Uses curated high-res travel photography dataset. |
| **Custom AI Looping Video** | `public/videos/hero-background.mp4` | Your generated 5-6s seamless AI loop video file | Uses high-definition CDN luxury aerial drone loop video. |

---

## 📦 Production Build & Deployment

To verify and generate a production bundle:
```bash
npm run build
```

The optimized static assets will be output to the `dist/` directory, ready for instant one-click deployment on **Vercel**, **Netlify**, or **GitHub Pages**.

import { GeneratedItinerary, TravelStyle, BudgetLevel, ItineraryDay } from '../types/itinerary';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPills?: string[];
}

/**
 * Intelligent contextual response generator for travel queries (fallback).
 */
function generateContextualTravelAdvice(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('kyoto') || lower.includes('japan')) {
    return `### 🏯 Kyoto Sanctuary Intelligence:
- **Best Season to Visit**: Late March to mid-April (cherry blossoms) and late October to November (autumn maples).
- **Recommended Stay**: 4 to 6 days for a serene, unhurried pace.
- **Top Notable Highlights**:
  - **Tenryu-ji & Sagano Bamboo Forest**: Arrive at dawn (06:30 AM) to experience the whispering canopies in quietude.
  - **Kinkaku-ji (Golden Pavilion)**: Gilded Zen temple mirrored on the tranquil Kyoko-chi pond.
  - **Gion Historic District**: Book private kaiseki dining in a traditional machiya townhouse along Shirakawa Canal.
- **Insider Secret**: Visit **Honen-in Temple**, a secluded moss garden nestled quietly along the Philosopher's Path.`;
  }

  if (lower.includes('amalfi') || lower.includes('italy') || lower.includes('positano')) {
    return `### 🍋 Amalfi Coast & Positano Intelligence:
- **Best Season**: **May to June** and **September to October**—warm sun-drenched days with pleasant sea breezes and calm crowds.
- **Recommended Stay**: 5 to 7 days.
- **Unmissable Experiences**:
  - **Ravello & Villa Rufolo**: Breathtaking clifftop terrace gardens suspended 350 meters above the azure Tyrrhenian Sea.
  - **Private Riva Boat Charter**: Cruise from Positano to the Faraglioni rocks of Capri for secluded swimming.
  - **Cliffside Gastronomy**: Savor hand-made *scialatielli ai frutti di mare* and fresh limoncello.`;
  }

  if (lower.includes('bora') || lower.includes('polynesia') || lower.includes('island')) {
    return `### 🏝️ Bora Bora Lagoon Intelligence:
- **Best Season**: **May through October** during the dry Polynesian winter, featuring gentle trade winds and crystal-clear lagoon clarity.
- **Recommended Stay**: 6 to 8 days in an overwater bungalow facing Mount Otemanu.
- **Curated Highlights**:
  - **Private Motu Picnic**: Fresh Tahitian *poisson cru* served on a submerged cedar table in turquoise shallows.
  - **Marine Lagoon Safari**: Snorkel alongside gentle manta rays and spotted eagle rays at the coral gardens.`;
  }

  if (lower.includes('zermatt') || lower.includes('alps') || lower.includes('switzerland') || lower.includes('matterhorn')) {
    return `### 🏔️ Zermatt & Alpine Grandeur:
- **Best Season**: **December to April** for world-class glacier skiing; **July to September** for alpine wildflower hiking.
- **Recommended Stay**: 4 to 5 days.
- **Highlights**:
  - **Gornergrat Cogwheel Railway**: Ascend to 3,089 meters for mirrored reflections of the Matterhorn in Lake Riffelsee.
  - **Matterhorn Glacier Paradise**: Europe's highest cable car station with eternal glacial ice palaces.
  - **Chez Vrony**: Legendary mountain-side gourmet dining in Findeln with truffled fondue.`;
  }

  if (lower.includes('serengeti') || lower.includes('safari') || lower.includes('africa') || lower.includes('tanzania')) {
    return `### 🦁 Serengeti Wildlife Intelligence:
- **Best Season**: **July to October** for dramatic Mara River crossings during the Great Migration; **January to March** for the southern calving season.
- **Recommended Stay**: 5 to 6 nights across mobile tented camps.
- **Pinnacle Experience**: Dawn hot air balloon safari drifting over acacia canopies followed by bush champagne breakfast.`;
  }

  if (lower.includes('reykjavik') || lower.includes('iceland') || lower.includes('aurora')) {
    return `### 🌌 Reykjavik & Aurora Sanctuaries:
- **Best Season**: **September to March** for the Northern Lights; **June to August** for the 24-hour Midnight Sun.
- **Recommended Stay**: 5 to 7 days.
- **Must-Visit**: The **Retreat Lagoon at the Blue Lagoon**, private volcanic obsidian baths, and super-jeep tours of the Golden Circle waterfalls.`;
  }

  if (lower.includes('pack') || lower.includes('checklist') || lower.includes('clothes') || lower.includes('wear')) {
    return `### 🎒 Bespoke Luxury Packing Checklist:
1. **Breathable Natural Fabrics**: Crisp linen shirts and fine merino wool for versatile temperature transitions.
2. **Handcrafted Walking Footwear**: High-comfort leather loafers or tailored sneakers for ancient cobblestones.
3. **Layering Essentials**: Lightweight cashmere sweater or silk evening wrap for coastal / alpine breezes.
4. **Protection & Optics**: Polarized designer sunglasses, reef-safe mineral sunscreen, and high-resolution camera gear.
5. **Universal Dual-Voltage Adapters**: Keep all devices seamlessly charged worldwide.`;
  }

  if (lower.includes('season') || lower.includes('when to go') || lower.includes('month') || lower.includes('weather')) {
    return `### 🌤️ Global Travel Seasonality Guide:
- **Mediterranean (Amalfi, Greek Isles)**: May–June & September–October (mild warmth, azure waters, fewer crowds).
- **East Asia (Kyoto, Tokyo)**: April–May (Cherry Blossoms) & October–November (Autumn Maple Foliage).
- **South Pacific (Bora Bora, Fiji)**: May–October (dry trade winds, crystal turquoise lagoons).
- **European Alps (Zermatt, Dolomites)**: December–April (Powder Snow) & July–September (Alpine Hiking).
- **East Africa (Serengeti, Kenya)**: July–October (Great Migration river crossings).`;
  }

  return `### 🌍 Wanderlust Travel Recommendation:
I can provide detailed guidance on our hand-selected global sanctuaries:
- **Kyoto, Japan**: Sacred Zen temples, bamboo groves, and Michelin kaiseki.
- **Amalfi Coast, Italy**: Vertical pastel cliffs, private yachting, and clifftop dining.
- **Bora Bora, Polynesia**: Turquoise overwater villas beneath Mount Otemanu.
- **Zermatt, Switzerland**: Car-free alpine serenity and Matterhorn vistas.
- **Serengeti, Tanzania**: Private conservation safari camps and hot-air balloons.
- **Reykjavik, Iceland**: Geothermal retreats and Aurora Borealis viewing.

Ask me about **best visiting seasons**, **luxury packing checklists**, **recommended stay durations**, or **bespoke itinerary planning**!`;
}

/**
 * Intelligent fallback generator for itinerary when Gemini API key is missing or rate limited.
 */
function createFallbackItinerary(destination: string, daysCount: number, style: TravelStyle, budget: BudgetLevel): GeneratedItinerary {
  const days: ItineraryDay[] = [];
  
  const sampleActivities = [
    {
      slot: 'Morning' as const,
      time: '09:00 AM – 11:30 AM',
      title: `${destination} Architectural Sanctuary & Private Access`,
      desc: `Exclusive early morning private walkthrough of ${destination}'s most revered historic landmark, tailored for ${style.toLowerCase()}.`,
      cost: '$65 / person',
      tag: 'Heritage & Culture',
      img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      tip: 'Arrive 15 minutes before private gates open for pristine golden-hour photography.'
    },
    {
      slot: 'Afternoon' as const,
      time: '01:00 PM – 03:30 PM',
      title: 'Artisanal Gastronomy & Sommelier Tasting',
      desc: `Bespoke multi-course culinary experience featuring regional terroir, rare seasonal ingredients, and vineyard pairings.`,
      cost: '$140 / person',
      tag: 'Gastronomy',
      img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
      tip: 'Request the chef’s table courtyard view for an intimate ambiance.'
    },
    {
      slot: 'Evening' as const,
      time: '06:00 PM – 09:30 PM',
      title: 'Sunset Panorama & Private Chamber Music',
      desc: `Private rooftop or cliffside aperitivo followed by an orchestral or acoustic performance overlooking the illuminated panorama of ${destination}.`,
      cost: '$190 / person',
      tag: 'Nightlife & Elegance',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      tip: 'Reserve terrace banquettes facing the sunset horizon.'
    }
  ];

  for (let i = 1; i <= daysCount; i++) {
    days.push({
      dayNumber: i,
      themeTitle: i === 1 ? 'Arrival, Sanctuary Check-in & Twilight Reverie' : i === daysCount ? 'Sublime Horizons & Grand Farewell' : `Deep Immersion: Chapter ${i}`,
      summary: `A carefully orchestrated cadence of discovery and serenity across ${destination}, calibrated for ${budget}.`,
      activities: sampleActivities.map((act, idx) => ({
        id: `day-${i}-act-${idx}`,
        timeSlot: act.slot,
        timeRange: act.time,
        title: act.title,
        description: act.desc,
        location: `${destination} Central Reserve`,
        estimatedCost: act.cost,
        rating: 4.9,
        reviewsCount: 420 + i * 50,
        categoryTag: act.tag,
        imageUrl: act.img,
        insiderTip: act.tip,
        completed: false
      }))
    });
  }

  return {
    id: `itinerary-${Date.now()}`,
    destination,
    country: 'Curated Global Sanctuary',
    durationDays: daysCount,
    travelStyle: style,
    budgetLevel: budget,
    title: `${destination}: The Bespoke ${daysCount}-Day Odyssey`,
    overview: `An expertly curated ${daysCount}-day luxury expedition through ${destination}, balancing architectural exploration, transcendent gastronomy, and private sanctuary retreats.`,
    totalEstimatedCost: `$${(daysCount * 850).toLocaleString()} USD`,
    seasonRecommendation: 'Spring or Autumn for optimal climate and low-density tourism',
    days,
    createdAt: new Date().toISOString()
  };
}

/**
 * Generates a structured Day-by-Day travel itinerary using Google Gemini API with seamless fallback.
 */
export async function generateItineraryWithGemini(
  destination: string,
  daysCount: number,
  style: TravelStyle,
  budget: BudgetLevel
): Promise<GeneratedItinerary> {
  if (GEMINI_API_KEY) {
    try {
      const prompt = `
You are a world-class luxury travel architect for the elite magazine 'Wanderlust'.
Create a structured ${daysCount}-day luxury travel itinerary for '${destination}'.
Travel Style: '${style}'.
Budget Category: '${budget}'.

Return ONLY a valid, raw JSON object (NO markdown backticks, NO intro, NO outro) with this EXACT structure:
{
  "title": "${destination}: The Curated Odyssey",
  "overview": "A 2-3 sentence evocative summary of the trip.",
  "totalEstimatedCost": "e.g. $4,200 / person",
  "seasonRecommendation": "Best months and meteorological tips",
  "days": [
    {
      "dayNumber": 1,
      "themeTitle": "Evocative theme for Day 1",
      "summary": "Brief 1-sentence overview of the day.",
      "activities": [
        {
          "timeSlot": "Morning",
          "timeRange": "09:00 AM – 11:30 AM",
          "title": "Specific luxury activity name",
          "description": "Engaging, vivid 2-sentence description.",
          "location": "Specific location in ${destination}",
          "estimatedCost": "$60 / person",
          "rating": 4.9,
          "reviewsCount": 850,
          "categoryTag": "Heritage",
          "imageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
          "insiderTip": "Insider secret."
        },
        {
          "timeSlot": "Afternoon",
          "timeRange": "01:00 PM – 03:30 PM",
          "title": "Afternoon activity name",
          "description": "Engaging description.",
          "location": "Location",
          "estimatedCost": "$120 / person",
          "rating": 4.8,
          "reviewsCount": 540,
          "categoryTag": "Gastronomy",
          "imageUrl": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
          "insiderTip": "Insider secret."
        },
        {
          "timeSlot": "Evening",
          "timeRange": "06:30 PM – 09:30 PM",
          "title": "Evening activity name",
          "description": "Evening description.",
          "location": "Location",
          "estimatedCost": "$180 / person",
          "rating": 5.0,
          "reviewsCount": 920,
          "categoryTag": "Nightlife & Serenity",
          "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "insiderTip": "Insider secret."
        }
      ]
    }
  ]
}
`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
          return {
            id: `itinerary-${Date.now()}`,
            destination,
            country: 'Global Sanctuary',
            durationDays: daysCount,
            travelStyle: style,
            budgetLevel: budget,
            title: parsed.title || `${destination}: Curated Journey`,
            overview: parsed.overview || `A bespoke ${daysCount}-day itinerary.`,
            totalEstimatedCost: parsed.totalEstimatedCost || `$${daysCount * 700} USD`,
            seasonRecommendation: parsed.seasonRecommendation || 'Spring and Autumn',
            days: parsed.days || [],
            createdAt: new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.warn('Gemini live generation fallback engaged:', error);
    }
  }

  // Instant intelligent fallback
  await new Promise((res) => setTimeout(res, 600));
  return createFallbackItinerary(destination, daysCount, style, budget);
}

/**
 * Conversational assistant chat with Gemini API with resilient contextual fallback.
 */
export async function sendChatMessageToGemini(userMessage: string, history: ChatMessage[]): Promise<string> {
  if (GEMINI_API_KEY) {
    try {
      const formattedHistory = history.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: 'You are Wanderlust AI Concierge, a refined, sophisticated, ultra-knowledgeable luxury travel expert. Speak with literary elegance, high clarity, warmth, and insider precision. Use markdown formatting with bullet points and bold highlights.'
            }]
          },
          contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: userMessage }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn('Gemini live call error, activating contextual response engine:', err);
    }
  }

  // Gracefully return rich travel response
  await new Promise((res) => setTimeout(res, 500));
  return generateContextualTravelAdvice(userMessage);
}

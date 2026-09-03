import { Destination } from '../types/destination';

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'kyoto-japan',
    slug: 'kyoto',
    name: 'Kyoto',
    region: 'Kansai',
    country: 'Japan',
    continent: 'Asia',
    tagline: 'The Imperial Zenith & Zen Sanctuaries',
    description: 'Ancient bamboo groves, private temple lodgings, and Michelin-starred kaiseki dining beneath weeping cherry blossoms.',
    detailedOverview: 'Kyoto served as Japan’s imperial capital for over a millennium. Today, it remains the cultural heart of the nation, seamlessly integrating ancestral craftsmanship, tranquil Zen gardens, and sublime culinary rituals within an understated modern tapestry.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'heritage',
    pricePerNight: 2400,
    currency: 'USD',
    rating: 4.96,
    reviewsCount: 1420,
    idealStayDays: 5,
    bestMonths: 'March – May & October – November',
    climate: 'Temperate with distinct, vibrant seasonal transitions',
    language: 'Japanese',
    coordinates: {
      lat: 35.0116,
      lng: 135.7681
    },
    weatherQueryCity: 'Kyoto',
    famousPlaces: [
      {
        id: 'kinkaku-ji',
        name: 'Kinkaku-ji (The Golden Pavilion)',
        tagline: 'Zen Splendor Reflected in the Mirror Pond',
        description: 'A sublime Zen Buddhist temple whose top two floors are completely gilded in pure gold leaf, positioned gracefully above the tranquil Kyoko-chi pond.',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '2 – 3 Hours',
        category: 'UNESCO Heritage & Zen Temple',
        rating: 4.9,
        reviewsCount: 2310,
        entryCost: '¥500 (~$3.50)',
        bestTimeOfDay: 'Early Morning (09:00 AM)',
        insiderTip: 'Arrive right at opening gate for pristine unrippled reflections on the pond without crowds.'
      },
      {
        id: 'arashiyama-bamboo',
        name: 'Arashiyama Bamboo Grove & Tenryu-ji',
        tagline: 'A Cathedral of Soaring Emerald Canopies',
        description: 'Towering emerald stalks sway with ethereal ambient resonance. Adjacent Tenryu-ji temple features a 14th-century landscape garden crafted by Zen master Muso Soseki.',
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '3 – 4 Hours',
        category: 'Natural Wonder & Sacred Architecture',
        rating: 4.95,
        reviewsCount: 3840,
        entryCost: 'Free (Tenryu-ji: ¥500)',
        bestTimeOfDay: 'Sunrise (06:30 AM)',
        insiderTip: 'Walk through the northern gate into the secluded gardens of Okochi Sanso Villa for private matcha overlooking the valley.'
      },
      {
        id: 'gion-district',
        name: 'Gion Historic Geisha District',
        tagline: 'Centuries of Refinement & Preserved Machiya',
        description: 'Atmospheric cobblestone lanes lined with 17th-century wooden tea houses (ochaya), lantern-lit alleyways, and discrete private kaiseki institutions.',
        imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Evening Walk & Dining',
        category: 'Cultural Precinct & Gastronomy',
        rating: 4.88,
        reviewsCount: 1950,
        entryCost: 'Free Access (Kaiseki: $180+)',
        bestTimeOfDay: 'Dusk (05:30 PM)',
        insiderTip: 'Book a private tea master session on Shirakawa Canal well ahead of peak seasons.'
      }
    ],
    localInsights: {
      dining: 'Reserve seasonal kaiseki at Gion Sasaki or traditional shojin ryori (Zen vegetarian cuisine) inside temple grounds.',
      etiquette: 'Quiet contemplation is cherished in sacred gardens. Always remove footwear when stepping onto tatami mats.',
      secretSpot: 'Honen-in Temple: a secluded, moss-covered sanctuary tucked along the Philosopher’s Path.'
    }
  },
  {
    id: 'amalfi-coast-italy',
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    region: 'Campania',
    country: 'Italy',
    continent: 'Europe',
    tagline: 'Sun-Drenched Cliffs & Azure Mediterranean Elegance',
    description: 'Pastel villas cascading down dramatic cliffs into turquoise waters, private yacht charters, and limoncello orchards.',
    detailedOverview: 'Carved precipitously into the dramatic cliffs of southern Italy, the Amalfi Coast represents the pinnacle of Mediterranean glamour. From Positano’s vertical cascade to the elevated musical gardens of Ravello, it is a masterclass in coastal romance.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'gastronomy',
    pricePerNight: 3200,
    currency: 'USD',
    rating: 4.94,
    reviewsCount: 1180,
    idealStayDays: 6,
    bestMonths: 'May – June & September – October',
    climate: 'Sun-drenched Mediterranean warmth with balmy sea breezes',
    language: 'Italian',
    coordinates: {
      lat: 40.634,
      lng: 14.6027
    },
    weatherQueryCity: 'Amalfi',
    famousPlaces: [
      {
        id: 'positano-cliffside',
        name: 'Positano Cliffside & Spiaggia Grande',
        tagline: 'The Legendary Vertical Village',
        description: 'An amphitheater of vibrant terracotta, pink, and ivory residences tumbling down to the Tyrrhenian Sea, flanked by artisan boutiques and chic beach clubs.',
        imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Full Day',
        category: 'Coastal Architecture & Beach Life',
        rating: 4.92,
        reviewsCount: 3100,
        entryCost: 'Free Access (Lounge: €50+)',
        bestTimeOfDay: 'Late Afternoon / Sunset',
        insiderTip: 'Take a vintage Riva boat charter from the pier to witness the golden hour cliffs illuminated from the water.'
      },
      {
        id: 'villa-rufalo-ravello',
        name: 'Villa Rufolo & Infinity Terrace',
        tagline: 'Gardens in the Clouds Above the Tyrrhenian Sea',
        description: 'Perched 350 meters above the sea in Ravello, this historic 13th-century villa inspired Richard Wagner and offers panoramas framing ancient Roman pines and endless ocean.',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '2 – 3 Hours',
        category: 'Historic Villa & Panoramic Gardens',
        rating: 4.98,
        reviewsCount: 1650,
        entryCost: '€8 (~$9.00)',
        bestTimeOfDay: 'Midday to 04:00 PM',
        insiderTip: 'Time your visit during the annual Ravello Concert Series for cliffside orchestral performances.'
      }
    ],
    localInsights: {
      dining: 'Savor freshly hand-made scialatielli ai frutti di mare at a cliffside table in Conca dei Marini.',
      etiquette: 'Coastal paths involve vertical staircases. Comfortable designer footwear is essential for walking the villages.',
      secretSpot: 'Fiordo di Furore: a hidden natural fjord spanned by an arched stone bridge tucked away from main tourist paths.'
    }
  },
  {
    id: 'bora-bora-polynesia',
    slug: 'bora-bora',
    name: 'Bora Bora',
    region: 'Society Islands',
    country: 'French Polynesia',
    continent: 'Oceania',
    tagline: 'Overwater Sanctuary Beneath Mount Otemanu',
    description: 'Private overwater bungalows suspended over fifty shades of luminous turquoise, secluded motus, and vibrant coral reefs.',
    detailedOverview: 'Bora Bora is the undisputed crown jewel of the South Pacific. A crystalline turquoise lagoon encircled by a necklace of sandy islets (motus) and anchored by the dramatic basalt peak of Mount Otemanu.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'island',
    pricePerNight: 4100,
    currency: 'USD',
    rating: 4.98,
    reviewsCount: 890,
    idealStayDays: 7,
    bestMonths: 'May – October',
    climate: 'Tropical Polynesian warmth with gentle trade winds',
    language: 'French & Tahitian',
    coordinates: {
      lat: -16.5004,
      lng: -151.7415
    },
    weatherQueryCity: 'Bora Bora',
    famousPlaces: [
      {
        id: 'mount-otemanu',
        name: 'Mount Otemanu & The Coral Lagoon',
        tagline: 'The Sacred Basalt Monolith',
        description: 'An extinct 727-meter volcanic peak rising dramatically from the center of the illuminated lagoon, offering world-class diving and private outrigger canoe safaris.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Half Day / Private Charter',
        category: 'Geological Icon & Private Lagoon Tour',
        rating: 4.99,
        reviewsCount: 1420,
        entryCost: 'Lagoon Safari: $220+',
        bestTimeOfDay: 'Morning (10:00 AM)',
        insiderTip: 'Arrange a private motu picnic with Tahitian poisson cru served on a submerged cedar table.'
      },
      {
        id: 'matira-beach',
        name: 'Matira Beach & Coral Gardens',
        tagline: 'Pristine Powder White Sands',
        description: 'Voted one of the most stunning public beaches on Earth, with ultra-shallow turquoise waters and living coral gardens sheltering manta rays.',
        imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '3 – 5 Hours',
        category: 'Lagoon Sanctuary & Snorkeling',
        rating: 4.93,
        reviewsCount: 970,
        entryCost: 'Free Access',
        bestTimeOfDay: 'Sunset (06:00 PM)',
        insiderTip: 'Snorkel the channel reef at low tide to observe spotted eagle rays gliding effortlessly.'
      }
    ],
    localInsights: {
      dining: 'Indulge in canoe breakfast delivered straight to your overwater terrace via traditional outrigger.',
      etiquette: 'A relaxed island rhythm prevails. Tipping is not customary in French Polynesian culture, though heartfelt appreciation is revered.',
      secretSpot: 'Anau Bay: a serene marine reserve where giant manta rays gather at cleaning stations.'
    }
  },
  {
    id: 'zermatt-switzerland',
    slug: 'zermatt',
    name: 'Zermatt & The Matterhorn',
    region: 'Valais',
    country: 'Switzerland',
    continent: 'Europe',
    tagline: 'Alpine Grandeur & Glacial Serenity',
    description: 'Car-free alpine sanctuaries, legendary Matterhorn views, Michelin fondue huts, and high-altitude heli-skiing.',
    detailedOverview: 'Nestled at the base of the iconic, chisel-peaked Matterhorn, Zermatt is an aristocratic mountain retreat where pristine air, centuries-old chalet architecture, and world-class alpine gastronomy converge in flawless Swiss harmony.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'wilderness',
    pricePerNight: 2850,
    currency: 'USD',
    rating: 4.97,
    reviewsCount: 1650,
    idealStayDays: 5,
    bestMonths: 'December – April (Ski) & July – September (Hiking)',
    climate: 'Crisp alpine mountain climate with pristine snowy winters and radiant summers',
    language: 'German & French',
    coordinates: {
      lat: 45.9765,
      lng: 7.7491
    },
    weatherQueryCity: 'Zermatt',
    famousPlaces: [
      {
        id: 'gornergrat-railway',
        name: 'Gornergrat Cogwheel Railway & Riffelsee',
        tagline: '3,089 Meters of Glacial Panorama',
        description: 'Europe’s highest open-air cogwheel railway ascending to dramatic views of 29 peaks exceeding 4,000 meters, mirroring the Matterhorn in Lake Riffelsee.',
        imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '4 – 5 Hours',
        category: 'High Altitude Scenic Railway',
        rating: 4.97,
        reviewsCount: 3410,
        entryCost: 'CHF 110 (~$125)',
        bestTimeOfDay: 'Morning (08:30 AM)',
        insiderTip: 'Disembark at Rotenboden station and take the 10-minute walk to Riffelsee before morning breezes ruffle the mirror reflection.'
      },
      {
        id: 'matterhorn-glacier-paradise',
        name: 'Matterhorn Glacier Paradise',
        tagline: 'Highest Cable Car Station in Europe (3,883m)',
        description: 'Ascend into eternal ice featuring a 360-degree viewing platform, an underground Glacier Palace carved into ancient ice, and year-round skiing.',
        imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Half Day',
        category: 'Glacial Sanctuary & Cable Car',
        rating: 4.91,
        reviewsCount: 2200,
        entryCost: 'CHF 120 (~$135)',
        bestTimeOfDay: 'Midday for optimal visibility',
        insiderTip: 'Book the Crystal Ride cabins featuring Swarovski crystal-embedded glass floors that turn transparent over the glacier.'
      }
    ],
    localInsights: {
      dining: 'Experience gourmet truffled fondue and Valais wines at Chez Vrony in Findeln.',
      etiquette: 'Zermatt is strictly car-free; travel within the village is conducted via quiet electric taxis or horse-drawn carriages.',
      secretSpot: 'Hinterdorf (Old Village): a preserved enclave of 16th-century sun-blackened larch wood barns perched on flat schist stone stilts.'
    }
  },
  {
    id: 'reykjavik-iceland',
    slug: 'reykjavik',
    name: 'Reykjavik & Golden Circle',
    region: 'Capital Region',
    country: 'Iceland',
    continent: 'Europe',
    tagline: 'Geothermal Sanctuaries & The Aurora Borealis',
    description: 'Private mineral-rich geothermal lagoons, volcanic lava tunnels, glacial ice caves, and private aurora observation domes.',
    detailedOverview: 'Iceland is a realm where raw geological power meets minimalist Nordic luxury. From the luminescent waters of the Retreat Lagoon to the ethereal dancing curtains of the Northern Lights, Reykjavik offers a transformative escape.',
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'wellness',
    pricePerNight: 2600,
    currency: 'USD',
    rating: 4.93,
    reviewsCount: 1350,
    idealStayDays: 6,
    bestMonths: 'September – March (Aurora) & June – August (Midnight Sun)',
    climate: 'Subpolar oceanic with atmospheric geothermal warmth',
    language: 'Icelandic & English',
    coordinates: {
      lat: 64.1466,
      lng: -21.9426
    },
    weatherQueryCity: 'Reykjavik',
    famousPlaces: [
      {
        id: 'blue-lagoon-retreat',
        name: 'The Retreat Lagoon & Geothermal Spa',
        tagline: 'Mineral Healing in an 800-Year-Old Lava Field',
        description: 'An exclusive, private volcanic sanctuary carved directly into ancient obsidian lava rock, fed by silica-rich geothermal seawater maintained at 38°C.',
        imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '4 – 6 Hours',
        category: 'Geothermal Sanctuary & Wellness',
        rating: 4.98,
        reviewsCount: 2890,
        entryCost: 'Retreat Pass: $450+',
        bestTimeOfDay: 'Twilight / Night for Aurora Viewing',
        insiderTip: 'Book the private subterranean ritual suites featuring silica, algae, and mineral scrubs.'
      },
      {
        id: 'gullfoss-geysir',
        name: 'Gullfoss Golden Waterfall & Thingvellir',
        tagline: 'Continental Rifts & Roaring Glacial Waterfalls',
        description: 'Walk between tectonic plates where North America meets Eurasia, and witness the double-cascading torrents of the Hvítá river plunging into a rugged canyon.',
        imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Full Day Expedition',
        category: 'UNESCO Geological Wonder',
        rating: 4.95,
        reviewsCount: 4120,
        entryCost: 'Free Access (Super Jeep: $320+)',
        bestTimeOfDay: 'Midday (11:00 AM)',
        insiderTip: 'Book a helicopter excursion departing from Reykjavik airport to land directly on the Langjökull ice cap.'
      }
    ],
    localInsights: {
      dining: 'Experience New Nordic tasting menus at Dill, showcasing Arctic char, smoked birch, and wild foraged herbs.',
      etiquette: 'Shower thoroughly before entering geothermal waters; preserving mineral purity is sacred.',
      secretSpot: 'Reykjadalur Steam Valley: a natural thermal river tucked into green volcanic hills suitable for bathing.'
    }
  },
  {
    id: 'serengeti-tanzania',
    slug: 'serengeti',
    name: 'Serengeti National Park',
    region: 'Mara Region',
    country: 'Tanzania',
    continent: 'Africa',
    tagline: 'Untamed Savanna & Private Safari Lodges',
    description: 'Ultra-exclusive tented suites under boundless African skies, private hot air balloon safaris, and front-row seats to the Great Migration.',
    detailedOverview: 'Spanning 15,000 square kilometers of golden plains and acacia woodlands, the Serengeti is Earth’s greatest wildlife theater. Here, luxury harmonizes with ecological conservation in solar-powered private camps with butler service.',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
    ],
    vibe: 'wilderness',
    pricePerNight: 3900,
    currency: 'USD',
    rating: 4.99,
    reviewsCount: 620,
    idealStayDays: 6,
    bestMonths: 'June – October (Migration) & January – March (Calving)',
    climate: 'Tropical savanna with pleasant warm days and brisk star-studded nights',
    language: 'Swahili & English',
    coordinates: {
      lat: -2.3333,
      lng: 34.8333
    },
    weatherQueryCity: 'Serengeti',
    famousPlaces: [
      {
        id: 'serengeti-balloon-safari',
        name: 'Dawn Hot Air Balloon Safari & Champagne Breakfast',
        tagline: 'Floating Silently Over the Great Migration',
        description: 'Drift serenely above acacia treetops at sunrise observing lion prides, leopard sanctuaries, and vast herds of wildebeest across the savanna.',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
        estimatedTime: '4 Hours (Dawn)',
        category: 'Aerial Wildlife Experience',
        rating: 5.0,
        reviewsCount: 890,
        entryCost: '$599 / person',
        bestTimeOfDay: 'Sunrise (05:30 AM)',
        insiderTip: 'Includes a silver-service champagne breakfast cooked directly on hot coals in the bush.'
      },
      {
        id: 'mara-river-crossing',
        name: 'Mara River Dramatic Wildlife Theater',
        tagline: 'The Apex Crossing of Predator & Prey',
        description: 'The iconic northern boundary where millions of migrating herbivores brave torrential currents and Nile crocodiles under the watchful eyes of game rangers.',
        imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
        estimatedTime: 'Full Day Game Drive',
        category: 'Wildlife Sanctuary & Safari',
        rating: 4.98,
        reviewsCount: 1120,
        entryCost: 'Park Fee: $82 / day',
        bestTimeOfDay: 'Early Morning to Midday',
        insiderTip: 'Stay in the Lamai wedge to be minutes from river crossing points before vehicles arrive from central camps.'
      }
    ],
    localInsights: {
      dining: 'Experience lantern-lit bush dinners beneath ancient acacia trees with Maasai cultural storytelling.',
      etiquette: 'Respect wildlife zones and listen attentively to your armed tracker during walking safaris.',
      secretSpot: 'Grumeti River Private Reserve: a low-density luxury corridor with exclusive off-road night drive privileges.'
    }
  }
];

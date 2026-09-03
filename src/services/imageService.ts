const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY || '';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

const singleImageCache = new Map<string, string>();
const galleryCache = new Map<string, string[]>();

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  crop?: string;
  format?: string;
}

/**
 * Builds an optimized Cloudinary delivery URL with automatic format and compression transformations.
 * ONLY transforms URLs that are hosted on Cloudinary or local public IDs.
 */
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicIdOrUrl) return '';
  const { width = 1200, height, quality = 'auto', crop = 'fill', format = 'auto' } = options;

  // 1. If it is already a Cloudinary URL, inject transformations
  if (publicIdOrUrl.includes('res.cloudinary.com')) {
    const parts = publicIdOrUrl.split('/upload/');
    if (parts.length === 2 && !parts[1].startsWith('f_auto') && !parts[1].startsWith('f_')) {
      const transformString = `f_${format},q_${quality},w_${width}${height ? `,h_${height}` : ''},c_${crop}`;
      return `${parts[0]}/upload/${transformString}/${parts[1]}`;
    }
    return publicIdOrUrl;
  }

  // 2. If it's a non-Cloudinary external URL (e.g. Unsplash), do NOT prepend Cloudinary domain!
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    return publicIdOrUrl;
  }

  // 3. If it is a Cloudinary public ID and cloud name is set
  if (CLOUDINARY_CLOUD_NAME) {
    const transformString = `f_${format},q_${quality},w_${width}${height ? `,h_${height}` : ''},c_${crop}`;
    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, '');
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${cleanPublicId}`;
  }

  return publicIdOrUrl;
}

/**
 * Dynamically fetches a single high-resolution image for any destination or famous place
 * using Unsplash or Pexels API, with fallback caching.
 */
export async function fetchPlaceImage(query: string, fallbackUrl?: string): Promise<string> {
  if (singleImageCache.has(query)) {
    return singleImageCache.get(query)!;
  }

  // 1. If Unsplash API key is available, query Unsplash API
  if (UNSPLASH_KEY) {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const photoUrl = data.results?.[0]?.urls?.regular;
        if (photoUrl) {
          singleImageCache.set(query, photoUrl);
          return photoUrl;
        }
      }
    } catch (e) {
      console.warn(`Unsplash fetch error for "${query}":`, e);
    }
  }

  // 2. Try Pexels API if key is present
  if (PEXELS_KEY) {
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
      const res = await fetch(url, {
        headers: { Authorization: PEXELS_KEY }
      });
      if (res.ok) {
        const data = await res.json();
        const photoUrl = data.photos?.[0]?.src?.large2x || data.photos?.[0]?.src?.large;
        if (photoUrl) {
          singleImageCache.set(query, photoUrl);
          return photoUrl;
        }
      }
    } catch (e) {
      console.warn(`Pexels fetch error for "${query}":`, e);
    }
  }

  // 3. Fallback to valid URL directly
  const fallback = fallbackUrl || `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80`;
  singleImageCache.set(query, fallback);
  return fallback;
}

/**
 * Dynamically fetches a gallery of high-resolution travel photos for a destination
 * using Unsplash or Pexels API.
 */
export async function fetchDestinationImages(query: string, fallbacks: string[] = []): Promise<string[]> {
  if (galleryCache.has(query)) {
    return galleryCache.get(query)!;
  }

  // 1. Try Unsplash API
  if (UNSPLASH_KEY) {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' luxury travel')}&per_page=6&orientation=landscape&client_id=${UNSPLASH_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const urls = data.results?.map((item: any) => item.urls?.regular).filter(Boolean);
        if (urls && urls.length > 0) {
          galleryCache.set(query, urls);
          return urls;
        }
      }
    } catch (e) {
      console.warn('Unsplash gallery fetch error:', e);
    }
  }

  // 2. Try Pexels API
  if (PEXELS_KEY) {
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' travel')}&per_page=6&orientation=landscape`;
      const res = await fetch(url, {
        headers: { Authorization: PEXELS_KEY }
      });
      if (res.ok) {
        const data = await res.json();
        const urls = data.photos?.map((item: any) => item.src?.large2x || item.src?.large).filter(Boolean);
        if (urls && urls.length > 0) {
          galleryCache.set(query, urls);
          return urls;
        }
      }
    } catch (e) {
      console.warn('Pexels gallery fetch error:', e);
    }
  }

  // 3. High-Aesthetic Fallback Array directly
  const defaultList = fallbacks.length > 0 ? fallbacks : [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'
  ];
  galleryCache.set(query, defaultList);
  return defaultList;
}

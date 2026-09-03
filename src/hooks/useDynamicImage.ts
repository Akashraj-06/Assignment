import { useState, useEffect } from 'react';
import { fetchPlaceImage, fetchDestinationImages } from '../services/imageService';

/**
 * Hook to dynamically resolve a place/destination image from Unsplash/Pexels at runtime.
 */
export function useDynamicImage(query: string, fallbackUrl?: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl || '');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPlaceImage(query, fallbackUrl)
      .then((url) => {
        if (isMounted) {
          setImageUrl(url);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImageUrl(fallbackUrl || '');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query, fallbackUrl]);

  return { imageUrl, loading };
}

/**
 * Hook to dynamically resolve a full gallery of images for a destination from Unsplash/Pexels.
 */
export function useDynamicGallery(destinationName: string, fallbackUrls: string[] = []) {
  const [gallery, setGallery] = useState<string[]>(fallbackUrls);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchDestinationImages(destinationName, fallbackUrls)
      .then((urls) => {
        if (isMounted) {
          setGallery(urls);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGallery(fallbackUrls);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [destinationName]);

  return { gallery, loading };
}

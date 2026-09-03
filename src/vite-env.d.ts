/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
  readonly VITE_PEXELS_API_KEY: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_HERO_VIDEO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

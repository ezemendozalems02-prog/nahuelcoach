export interface Routine {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles" | string;
  image: string;
  badge?: string;
  desc: string;
  benefits: string[];
  active: boolean;
  featured: boolean;
  order: number;
}

export interface Plan {
  id: string;
  name: string;
  tag: string;
  price: string;
  period: string;
  glow: string;
  active: boolean;
  featured: boolean;
  desc: string;
  features: string[];
  slug: string;
  image?: string;
  order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageDesktop: string;
  imageMobile: string;
  buttonText?: string;
  buttonLink?: string;
  overlayOpacity: number;
  sectionId: string;
  active: boolean;
  order: number;
}

export interface HomeSectionConfig {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  order: number;
  active: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export interface SiteSettings {
  whatsappNumber: string;
  instagramUrl: string;
  youtubeUrl: string;
  brandName: string;
  logoUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  aboutTitle: string;
  aboutBio: string;
  aboutImage?: string;
}

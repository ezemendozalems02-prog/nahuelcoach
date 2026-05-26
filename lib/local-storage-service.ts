import {
  seedRoutines,
  seedPlans,
  seedBanners,
  seedHomeSections,
  seedFAQs,
  seedSiteSettings
} from "./seed-data";
import { Routine, Plan, Banner, FAQ, SiteSettings, HomeSectionConfig } from "@/types/admin";

// Keys used in localStorage
const KEYS = {
  ROUTINES: "nahue_coach_routines",
  PLANS: "nahue_coach_plans",
  BANNERS: "nahue_coach_banners",
  SECTIONS: "nahue_coach_sections",
  FAQS: "nahue_coach_faqs",
  SETTINGS: "nahue_coach_settings"
};

// Check if window is defined (client-side)
const isClient = typeof window !== "undefined";

// Safe wrapper to get data from localStorage
function getSafeItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key ${key} from localStorage`, error);
    return defaultValue;
  }
}

// Safe wrapper to set data in localStorage
function setSafeItem<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key ${key} to localStorage`, error);
  }
}

// Initialize LocalStorage with seed data if keys don't exist
export function initializeLocalStorage(): void {
  if (!isClient) return;

  if (!window.localStorage.getItem(KEYS.ROUTINES)) {
    setSafeItem(KEYS.ROUTINES, seedRoutines);
  }
  if (!window.localStorage.getItem(KEYS.PLANS)) {
    setSafeItem(KEYS.PLANS, seedPlans);
  }
  if (!window.localStorage.getItem(KEYS.BANNERS)) {
    setSafeItem(KEYS.BANNERS, seedBanners);
  }
  if (!window.localStorage.getItem(KEYS.SECTIONS)) {
    setSafeItem(KEYS.SECTIONS, seedHomeSections);
  }
  if (!window.localStorage.getItem(KEYS.FAQS)) {
    setSafeItem(KEYS.FAQS, seedFAQs);
  }
  if (!window.localStorage.getItem(KEYS.SETTINGS)) {
    setSafeItem(KEYS.SETTINGS, seedSiteSettings);
  }
}

// ROUTINES CRUD
export function getRoutinesFromStorage(): Routine[] {
  initializeLocalStorage();
  return getSafeItem<Routine[]>(KEYS.ROUTINES, seedRoutines);
}

export function saveRoutinesToStorage(routines: Routine[]): void {
  setSafeItem(KEYS.ROUTINES, routines);
}

// PLANS CRUD
export function getPlansFromStorage(): Plan[] {
  initializeLocalStorage();
  return getSafeItem<Plan[]>(KEYS.PLANS, seedPlans);
}

export function savePlansToStorage(plans: Plan[]): void {
  setSafeItem(KEYS.PLANS, plans);
}

// BANNERS CRUD
export function getBannersFromStorage(): Banner[] {
  initializeLocalStorage();
  return getSafeItem<Banner[]>(KEYS.BANNERS, seedBanners);
}

export function saveBannersToStorage(banners: Banner[]): void {
  setSafeItem(KEYS.BANNERS, banners);
}

// SECTIONS CRUD
export function getSectionsFromStorage(): HomeSectionConfig[] {
  initializeLocalStorage();
  return getSafeItem<HomeSectionConfig[]>(KEYS.SECTIONS, seedHomeSections);
}

export function saveSectionsToStorage(sections: HomeSectionConfig[]): void {
  setSafeItem(KEYS.SECTIONS, sections);
}

// FAQS CRUD
export function getFAQsFromStorage(): FAQ[] {
  initializeLocalStorage();
  return getSafeItem<FAQ[]>(KEYS.FAQS, seedFAQs);
}

export function saveFAQsToStorage(faqs: FAQ[]): void {
  setSafeItem(KEYS.FAQS, faqs);
}

// SETTINGS CRUD
export function getSettingsFromStorage(): SiteSettings {
  initializeLocalStorage();
  return getSafeItem<SiteSettings>(KEYS.SETTINGS, seedSiteSettings);
}

export function saveSettingsToStorage(settings: SiteSettings): void {
  setSafeItem(KEYS.SETTINGS, settings);
}

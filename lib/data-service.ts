import {
  getRoutinesFromStorage,
  saveRoutinesToStorage,
  getPlansFromStorage,
  savePlansToStorage,
  getBannersFromStorage,
  saveBannersToStorage,
  getSectionsFromStorage,
  saveSectionsToStorage,
  getFAQsFromStorage,
  saveFAQsToStorage,
  getSettingsFromStorage,
  saveSettingsToStorage
} from "./local-storage-service";
import { Routine, Plan, Banner, FAQ, SiteSettings, HomeSectionConfig } from "@/types/admin";

// Add a slight simulation delay to test async UI loaders (optional, let's keep it instant for speed, but fully promise-based)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// ROUTINES SERVICE
// ==========================================
export async function getRoutines(): Promise<Routine[]> {
  await delay(50); // Simulates network roundtrip
  const routines = getRoutinesFromStorage();
  return routines.sort((a, b) => a.order - b.order);
}

export async function getRoutineBySlug(slug: string): Promise<Routine | undefined> {
  const routines = await getRoutines();
  return routines.find((r) => r.slug === slug && r.active);
}

export async function saveRoutine(routine: Routine): Promise<Routine> {
  const routines = await getRoutines();
  const index = routines.findIndex((r) => r.id === routine.id);

  if (index >= 0) {
    // Update existing
    routines[index] = routine;
  } else {
    // Add new
    routines.push(routine);
  }

  saveRoutinesToStorage(routines);
  return routine;
}

export async function deleteRoutine(id: string): Promise<boolean> {
  const routines = await getRoutines();
  const filtered = routines.filter((r) => r.id !== id);
  if (filtered.length === routines.length) return false;
  saveRoutinesToStorage(filtered);
  return true;
}

// ==========================================
// PLANS SERVICE
// ==========================================
export async function getPlans(): Promise<Plan[]> {
  await delay(50);
  const plans = getPlansFromStorage();
  return plans.sort((a, b) => a.order - b.order);
}

export async function getPlanBySlug(slug: string): Promise<Plan | undefined> {
  const plans = await getPlans();
  return plans.find((p) => p.slug === slug && p.active);
}

export async function savePlan(plan: Plan): Promise<Plan> {
  const plans = await getPlans();
  const index = plans.findIndex((p) => p.id === plan.id);

  if (index >= 0) {
    plans[index] = plan;
  } else {
    plans.push(plan);
  }

  savePlansToStorage(plans);
  return plan;
}

export async function deletePlan(id: string): Promise<boolean> {
  const plans = await getPlans();
  const filtered = plans.filter((p) => p.id !== id);
  if (filtered.length === plans.length) return false;
  savePlansToStorage(filtered);
  return true;
}

// ==========================================
// BANNERS SERVICE
// ==========================================
export async function getBanners(): Promise<Banner[]> {
  await delay(50);
  const banners = getBannersFromStorage();
  return banners.sort((a, b) => a.order - b.order);
}

export async function saveBanner(banner: Banner): Promise<Banner> {
  const banners = await getBanners();
  const index = banners.findIndex((b) => b.id === banner.id);

  if (index >= 0) {
    banners[index] = banner;
  } else {
    banners.push(banner);
  }

  saveBannersToStorage(banners);
  return banner;
}

// ==========================================
// SECTIONS SERVICE
// ==========================================
export async function getSections(): Promise<HomeSectionConfig[]> {
  await delay(50);
  const sections = getSectionsFromStorage();
  return sections.sort((a, b) => a.order - b.order);
}

export async function saveSections(sections: HomeSectionConfig[]): Promise<HomeSectionConfig[]> {
  saveSectionsToStorage(sections);
  return sections;
}

// ==========================================
// FAQS SERVICE
// ==========================================
export async function getFAQs(): Promise<FAQ[]> {
  await delay(50);
  const faqs = getFAQsFromStorage();
  return faqs.sort((a, b) => a.order - b.order);
}

export async function saveFAQ(faq: FAQ): Promise<FAQ> {
  const faqs = await getFAQs();
  const index = faqs.findIndex((f) => f.id === faq.id);

  if (index >= 0) {
    faqs[index] = faq;
  } else {
    faqs.push(faq);
  }

  saveFAQsToStorage(faqs);
  return faq;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const faqs = await getFAQs();
  const filtered = faqs.filter((f) => f.id !== id);
  if (filtered.length === faqs.length) return false;
  saveFAQsToStorage(filtered);
  return true;
}

// ==========================================
// SETTINGS SERVICE
// ==========================================
export async function getSettings(): Promise<SiteSettings> {
  await delay(50);
  return getSettingsFromStorage();
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  saveSettingsToStorage(settings);
  return settings;
}

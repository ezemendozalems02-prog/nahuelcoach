import { Routine, Plan, Banner, FAQ, SiteSettings, HomeSectionConfig } from "@/types/admin";

export const seedRoutines: Routine[] = [
  {
    id: "1",
    name: "Plan Inicial",
    subtitle: "Tu primer paso hacia la transformación",
    slug: "plan-inicial",
    price: 29,
    originalPrice: 49,
    duration: "4 semanas",
    level: "Principiante",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    badge: "Recomendado",
    desc: "El punto de partida perfecto para comenzar tu camino fitness con bases sólidas y resultados reales desde la primera semana. Aprenderás la técnica perfecta, construirás una base sólida y entenderás los principios del entrenamiento que te acompañarán toda la vida.",
    benefits: [
      "Técnica perfecta desde el inicio",
      "Rutinas adaptadas a tu nivel",
      "Guía nutricional básica",
      "Soporte por WhatsApp",
      "Plan de progresión semanal",
      "Videos explicativos de cada ejercicio"
    ],
    active: true,
    featured: true,
    order: 1
  },
  {
    id: "2",
    name: "Plan Transformación",
    subtitle: "Cambia tu físico, cambia tu vida",
    slug: "plan-transformacion",
    price: 79,
    originalPrice: 129,
    duration: "12 semanas",
    level: "Intermedio",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    badge: "Más elegido",
    desc: "Un programa intensivo de 12 semanas diseñado para transformar tu cuerpo con periodización avanzada, nutrición precisa y mentalidad ganadora. Combina entrenamiento de hipertrofia, cardio estratégico y nutrición personalizada para resultados máximos.",
    benefits: [
      "Periodización avanzada en 3 fases",
      "Nutrición personalizada con macros",
      "Entrenamiento de hipertrofia científico",
      "Cardio estratégico para quemar grasa",
      "Seguimiento semanal de progreso",
      "Ajustes en tiempo real"
    ],
    active: true,
    featured: true,
    order: 2
  },
  {
    id: "3",
    name: "Coaching Premium",
    subtitle: "El nivel más alto de personalización",
    slug: "coaching-premium",
    price: 199,
    originalPrice: 299,
    duration: "8 semanas",
    level: "Todos los niveles",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    badge: "Premium",
    desc: "Mentoría completa con Nahuel. Planes 100% personalizados, videollamadas semanales, ajustes en tiempo real y acceso directo ilimitado. Trabajarás directamente con Nahuel con un plan completamente diseñado para tu cuerpo, objetivos y estilo de vida.",
    benefits: [
      "Plan 100% personalizado para ti",
      "Videollamada semanal con Nahuel",
      "Ajustes de plan cada semana",
      "Nutrición individualizada",
      "Soporte 24/7 por WhatsApp",
      "Seguimiento de métricas diarias"
    ],
    active: true,
    featured: true,
    order: 3
  },
  {
    id: "4",
    name: "Full Body Power",
    subtitle: "Todo el cuerpo, máxima eficiencia",
    slug: "full-body",
    price: 39,
    originalPrice: 59,
    duration: "8 semanas",
    level: "Principiante",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    desc: "Entrenamiento de cuerpo completo 3 días por semana. Ideal para optimizar tiempo sin sacrificar resultados. 3 sesiones por semana de alta eficiencia que activan cada grupo muscular con ejercicios compuestos y progresión inteligente.",
    benefits: [
      "Solo 3 días por semana",
      "Ejercicios compuestos de alto rendimiento",
      "Progresión de cargas incluida",
      "Opción gym y opción casa",
      "Cardio integrado al final de sesión"
    ],
    active: true,
    featured: false,
    order: 4
  },
  {
    id: "5",
    name: "Definición Extrema",
    subtitle: "Marcación y definición máxima",
    slug: "definicion-extrema",
    price: 59,
    originalPrice: 89,
    duration: "10 semanas",
    level: "Avanzado",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80",
    desc: "Programa especializado para reducir grasa al máximo, marcar abdomen y lograr definición muscular de alto nivel. Combina entrenamiento de alta intensidad, cardio estratégico y nutrición en déficit controlado.",
    benefits: [
      "Protocolo anti-grasa específico",
      "Abdomen definido en 10 semanas",
      "Cardio HIIT integrado",
      "Nutrición en déficit estratégico",
      "Preservación máxima de músculo"
    ],
    active: true,
    featured: false,
    order: 5
  },
  {
    id: "6",
    name: "Volumen Muscular",
    subtitle: "Construye masa muscular de verdad",
    slug: "volumen-muscular",
    price: 49,
    originalPrice: 79,
    duration: "12 semanas",
    level: "Intermedio",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    desc: "El programa definitivo para ganar músculo real con periodización científica, superávit calórico controlado y máxima hipertrofia. Usamos periodización ondulatoria, técnicas avanzadas de hipertrofia y nutrición en superávit inteligente.",
    benefits: [
      "Hipertrofia científica comprobada",
      "División de entrenamientos optimizada",
      "Nutrición en superávit controlado",
      "Técnicas avanzadas: drop sets, superseries",
      "Progresión de cargas sistemática"
    ],
    active: true,
    featured: false,
    order: 6
  }
];

export const seedPlans: Plan[] = [
  {
    id: "1",
    name: "Plan Élite VIP",
    tag: "Recomendado",
    price: "$199",
    period: "mes",
    glow: "rgba(0, 102, 255, 0.15)",
    active: true,
    featured: true,
    desc: "Mentoría personalizada integral para personas decididas a cambiar su físico y hábitos de manera inteligente.",
    features: [
      "Plan de entrenamiento 100% a medida (Gimnasio o Casa)",
      "Plan de nutrición flexible adaptado a tus gustos y objetivos",
      "Soporte 24/7 directo con Nahuel por WhatsApp",
      "1 Videollamada semanal de ajuste y check-in de métricas",
      "Ajustes ilimitados del plan según tu ritmo de vida",
      "Acceso completo a videoteca exclusiva y recursos premium"
    ],
    slug: "plan-elite-vip",
    order: 1
  },
  {
    id: "2",
    name: "Plan Elite Master",
    tag: "Cupos VIP Limitados",
    price: "$349",
    period: "mes",
    glow: "rgba(123, 47, 255, 0.15)",
    active: true,
    featured: true,
    desc: "El acompañamiento definitivo. Coaching físico, mental y de hábitos diarios con seguimiento prioritario directo.",
    features: [
      "Todo lo incluido en el Plan Élite VIP",
      "Soporte ultra directo con respuesta prioritaria de Nahuel",
      "2 Videollamadas semanales (Coaching mental y hábitos)",
      "Análisis y monitoreo diario de sueño, estrés y fatiga",
      "Revisiones de técnica diarias mediante video feedback",
      "Acceso VIP ilimitado y de por vida a todos los catálogos y lanzamientos"
    ],
    slug: "plan-elite-master",
    order: 2
  }
];

export const seedBanners: Banner[] = [
  {
    id: "1",
    title: "10% OFF EN TU PRIMER PLAN",
    subtitle: "Cupón de bienvenida por tiempo limitado. ¡Aprovechalo hoy!",
    imageDesktop: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80",
    imageMobile: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    buttonText: "Ver Rutinas",
    buttonLink: "#rutinas",
    overlayOpacity: 70,
    sectionId: "general",
    active: true,
    order: 1
  }
];

export const seedHomeSections: HomeSectionConfig[] = [
  { id: "1", key: "hero", title: "Hero Principal", order: 1, active: true },
  { id: "2", key: "about", title: "Sobre Mí", order: 2, active: true },
  { id: "3", key: "featured", title: "Rutinas Destacadas", order: 3, active: true },
  { id: "4", key: "vip-pricing", title: "Opciones de Mentoría VIP", order: 4, active: true },
  { id: "5", key: "impacto-vsl", title: "Video Explicativo Impacto 1a1", order: 5, active: true }
];

export const seedFAQs: FAQ[] = [
  {
    id: "1",
    question: "¿Cómo funcionan los programas?",
    answer: "Al comprar un programa recibirás por WhatsApp un PDF completo con tus rutinas semanales, videos de técnica, guía nutricional y todo el material incluido. Podés acceder desde cualquier dispositivo.",
    order: 1,
    active: true
  },
  {
    id: "2",
    question: "¿Cómo recibo mi programa después de comprarlo?",
    answer: "Una vez confirmado el pago por WhatsApp, recibirás todo el material digital en 24-48 horas hábiles directamente en tu WhatsApp o email. El proceso es rápido y personalizado.",
    order: 2,
    active: true
  },
  {
    id: "3",
    question: "¿Cómo se realiza el pago?",
    answer: "Los pagos se coordinan por WhatsApp. Aceptamos transferencia bancaria, Mercado Pago, PayPal y tarjetas de crédito/débito. Una vez confirmado el pago enviamos tu programa.",
    order: 3,
    active: true
  },
  {
    id: "4",
    question: "¿Hay seguimiento incluido en los programas?",
    answer: "Los programas base incluyen soporte por WhatsApp. El Impacto 1 a 1 incluye seguimiento semanal personalizado, videollamadas con Nahuel y ajustes en tiempo real del plan.",
    order: 4,
    active: true
  },
  {
    id: "5",
    question: "¿Los programas son aptos para principiantes?",
    answer: "Sí, contamos con programas para todos los niveles. El Plan Inicial y Full Body Power son perfectos para comenzar. Cada programa indica claramente el nivel recomendado.",
    order: 5,
    active: true
  },
  {
    id: "6",
    question: "¿Puedo hacer los entrenamientos en casa?",
    answer: "Varios programas incluyen versión para casa con o sin equipamiento. Te recomendamos especificarlo al momento de comprar para que el material sea adaptado a tu situación.",
    order: 6,
    active: true
  },
  {
    id: "7",
    question: "¿Qué diferencia al Impacto 1 a 1 de un programa?",
    answer: "El Impacto 1 a 1 es mentoría personalizada directamente con Nahuel. Todo está diseñado 100% para vos, con videollamadas semanales, ajustes en tiempo real y soporte ilimitado.",
    order: 7,
    active: true
  },
  {
    id: "8",
    question: "¿Cuánto tiempo lleva ver resultados?",
    answer: "Los primeros cambios visibles aparecen entre las semanas 3-4. Resultados significativos entre los meses 2-3. Los resultados dependen de la constancia y adherencia al programa.",
    order: 8,
    active: true
  }
];

export const seedSiteSettings: SiteSettings = {
  whatsappNumber: "5491100000000",
  instagramUrl: "https://instagram.com/nahuelcoach",
  youtubeUrl: "https://youtube.com/nahuelcoach",
  brandName: "NAHUEL COACH",
  logoUrl: "/logo.png",
  heroTitle: "CONSTRUÍ TU MEJOR VERSIÓN",
  heroSubtitle: "Entrenamientos premium personalizados, coaching científico y mentalidad de acero para transformar tu físico de una vez por todas.",
  heroCtaText: "Comenzar Ahora",
  aboutTitle: "MI HISTORIA Y METODOLOGÍA",
  aboutBio: "Soy Nahuel, entrenador personal y coach de hábitos. Durante los últimos 6 años he ayudado a cientos de personas a romper barreras físicas y mentales para lograr su cuerpo soñado. Mi método combina ciencia del entrenamiento con herramientas prácticas de cambio de comportamiento para lograr resultados rápidos, reales y para toda la vida.",
  aboutImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
};

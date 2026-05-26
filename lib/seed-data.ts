import { Routine, Plan, Banner, FAQ, SiteSettings, HomeSectionConfig } from "@/types/admin";

export const seedRoutines: Routine[] = [
  {
    id: "1",
    name: "Rutina Express 30 Min",
    subtitle: "Activá tu cuerpo y constancia",
    slug: "rutina-express-30-min",
    price: 25000,
    originalPrice: 40000,
    duration: "4 semanas",
    level: "Todos los niveles",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    badge: "Nuevo",
    desc: "Rutinas súper efectivas de 30 minutos diseñadas para personas ocupadas. Activa tu energía, mejora tu tono muscular y empieza a construir el hábito de entrenar sin excusas.",
    benefits: [
      "Rutina estructurada por días",
      "Ejercicios simples y efectivos",
      "Adaptable a gimnasio o casa",
      "Ideal para activar energía y constancia",
      "Guía básica de progresión"
    ],
    active: true,
    featured: true,
    order: 1
  },
  {
    id: "2",
    name: "Guía de Alimentación Consciente",
    subtitle: "Comé mejor sin vivir restringido",
    slug: "guia-alimentacion-consciente",
    price: 25000,
    originalPrice: 40000,
    duration: "Guía digital",
    level: "Todos los niveles",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    badge: "Recomendado",
    desc: "Principios fundamentales para ordenar tu alimentación diaria con claridad. Aprende a distribuir tus porciones, organizar tus comidas y comer lo que te gusta de forma inteligente.",
    benefits: [
      "Principios básicos de alimentación",
      "Organización simple de comidas",
      "Ideas para déficit, mantenimiento o volumen",
      "Lista de alimentos recomendados",
      "Estrategia para sostener sin obsesionarte"
    ],
    active: true,
    featured: true,
    order: 2
  },
  {
    id: "3",
    name: "Pack Impacto Inicial",
    subtitle: "El combo integral para tu cambio",
    slug: "pack-impacto-inicial",
    price: 35000,
    originalPrice: 55000,
    duration: "6 semanas",
    level: "Principiante",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
    badge: "Más elegido",
    desc: "La estructura física, mental y alimenticia que necesitas para empezar a ver cambios reales. Incluye rutina de entrenamiento, guía nutricional y checklist de hábitos diarios.",
    benefits: [
      "Rutina de entrenamiento",
      "Guía de alimentación",
      "Checklist de hábitos diarios",
      "Organización semanal",
      "Recursos prácticos"
    ],
    active: true,
    featured: true,
    order: 3
  },
  {
    id: "4",
    name: "Recetario Impacto Fitness",
    subtitle: "Comidas deliciosas y altas en proteína",
    slug: "recetario-impacto-fitness",
    price: 20000,
    originalPrice: 32000,
    duration: "Guía digital",
    level: "Todos los niveles",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    badge: "Premium",
    desc: "Recetas saludables, prácticas y con excelente aporte proteico. Opciones dulces, saladas e ideas rápidas para sostener tu alimentación con total placer.",
    benefits: [
      "Recetas dulces",
      "Recetas saladas",
      "Opciones altas en proteína",
      "Ideas rápidas",
      "Comidas fáciles de sostener"
    ],
    active: true,
    featured: true,
    order: 4
  },
  {
    id: "5",
    name: "Plan Transformación",
    subtitle: "Cambia tu físico, cambia tu vida",
    slug: "plan-transformacion",
    price: 80000,
    originalPrice: 125000,
    duration: "12 semanas",
    level: "Intermedio",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    desc: "Un programa intensivo de 12 semanas diseñado para transformar tu cuerpo con periodización avanzada, nutrición precisa y mentalidad ganadora.",
    benefits: [
      "Periodización avanzada en 3 fases",
      "Nutrición personalizada con macros",
      "Entrenamiento de hipertrofia científico",
      "Cardio estratégico para quemar grasa",
      "Seguimiento de progreso"
    ],
    active: true,
    featured: false,
    order: 5
  },
  {
    id: "6",
    name: "Full Body Power",
    subtitle: "Todo el cuerpo, máxima eficiencia",
    slug: "full-body",
    price: 45000,
    originalPrice: 65000,
    duration: "8 semanas",
    level: "Principiante",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    desc: "Entrenamiento de cuerpo completo 3 días por semana. Ideal para optimizar tiempo sin sacrificar resultados reales.",
    benefits: [
      "Solo 3 días por semana",
      "Ejercicios compuestos de alto rendimiento",
      "Progresión de cargas incluida",
      "Opción gym y opción casa"
    ],
    active: true,
    featured: false,
    order: 6
  }
];

export const seedPlans: Plan[] = [
  {
    id: "1",
    name: "Impacto Base",
    tag: "Recomendado",
    price: "$70.000",
    period: "mes",
    glow: "rgba(0, 102, 255, 0.15)",
    active: true,
    featured: true,
    desc: "Estructura y dirección personalizada para tu progreso físico y hábitos saludables.",
    features: [
      "1 sesión de alineación inicial",
      "Rutina personalizada con videos explicativos",
      "Planificación de alimentación consciente",
      "Corrección técnica de ejercicios por WhatsApp",
      "Guía de entrenamiento + PDFs descargables",
      "Organización inicial de hábitos diarios"
    ],
    slug: "impacto-base",
    order: 1
  },
  {
    id: "2",
    name: "Impacto Vital",
    tag: "Más Elegido",
    price: "$250.000",
    period: "pago único",
    glow: "rgba(16, 185, 129, 0.15)",
    active: true,
    featured: true,
    desc: "Acompañamiento integral de 8 semanas para ordenar tu entrenamiento, alimentación y hábitos.",
    features: [
      "Programa grabado de 14 clases teóricas/prácticas",
      "Sistema paso a paso de reestructuración de hábitos",
      "2 sesiones individuales de coaching directo",
      "Tareas específicas de mentalidad y nutrición",
      "Corrección de ejercicios prioritaria",
      "Seguimiento diario por WhatsApp",
      "Recetarios exclusivos incluidos",
      "Ajustes semanales según tu progreso"
    ],
    slug: "impacto-vital",
    order: 2
  }
];

export const seedBanners: Banner[] = [
  {
    id: "1",
    title: "15% OFF EN TU PRIMER PLAN",
    subtitle: "Cupón de bienvenida por tiempo limitado. ¡Activá tu cambio hoy!",
    imageDesktop: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80",
    imageMobile: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    buttonText: "Ver Recursos",
    buttonLink: "#recursos",
    overlayOpacity: 70,
    sectionId: "general",
    active: true,
    order: 1
  }
];

export const seedHomeSections: HomeSectionConfig[] = [
  { id: "1", key: "hero", title: "Hero Principal", order: 1, active: true },
  { id: "2", key: "about", title: "Sobre Mí", order: 2, active: true },
  { id: "3", key: "featured", title: "Recursos Digitales", order: 3, active: true },
  { id: "4", key: "transition", title: "Frase de Transición", order: 4, active: true },
  { id: "5", key: "distance", title: "Entrenamiento a Distancia", order: 5, active: true },
  { id: "6", key: "advisory", title: "Planes de Asesoría", order: 6, active: true },
  { id: "7", key: "comparative", title: "Comparativa", order: 7, active: true },
  { id: "8", key: "testimonials", title: "Testimonios", order: 8, active: true },
  { id: "9", key: "community", title: "Comunidad WhatsApp", order: 9, active: true },
  { id: "10", key: "trust", title: "Sección de Confianza", order: 10, active: true },
  { id: "11", key: "faq", title: "Preguntas Frecuentes", order: 11, active: true },
  { id: "12", key: "final-cta", title: "CTA Final", order: 12, active: true }
];

export const seedFAQs: FAQ[] = [
  {
    id: "1",
    question: "¿Sirve si tengo poco tiempo?",
    answer: "Totalmente. El método está diseñado específicamente para personas ocupadas. La Rutina Express de 30 minutos te permite entrenar con alta eficiencia en cualquier momento del día, y los planes personalizados se adaptan a tu agenda real, no al revés.",
    order: 1,
    active: true
  },
  {
    id: "2",
    question: "¿Necesito experiencia entrenando?",
    answer: "No, para nada. Contamos con recursos diseñados paso a paso desde cero como el Pack Impacto Inicial, donde aprenderás la técnica correcta, y planes de asesoría 1 a 1 donde Nahuel corregirá cada uno de tus ejercicios por video para evitar lesiones.",
    order: 2,
    active: true
  },
  {
    id: "3",
    question: "¿Tengo que hacer una dieta estricta?",
    answer: "No. En Impacto Fitness creemos en la alimentación consciente y flexible. Te enseñamos a organizar tus platos basándote en alimentos nutritivos y a calcular porciones, pero sin prohibiciones extremas ni obsesiones para que puedas sostener el plan socialmente.",
    order: 3,
    active: true
  },
  {
    id: "4",
    question: "¿Puedo comprar solo una rutina?",
    answer: "Sí, claro. Podés empezar con un recurso digital e independiente como la Rutina Express 30 Min o el Recetario Impacto Fitness sin necesidad de contratar una asesoría mensual. Son de un solo pago y acceso de por vida.",
    order: 4,
    active: true
  },
  {
    id: "5",
    question: "¿Cuál es la diferencia entre una rutina y la mentoría?",
    answer: "Una rutina digital es un PDF estático auto-gestionable. La mentoría y asesoría personalizada (como Impacto Base o Vital) incluye seguimiento humano real, videollamadas con Nahuel, ajustes de cargas, retroalimentación técnica y un plan nutricional adaptado a tus métricas semanales.",
    order: 5,
    active: true
  },
  {
    id: "6",
    question: "¿La mentoría es online?",
    answer: "Sí, es 100% online y a distancia. Trabajamos mediante WhatsApp para correcciones técnicas rápidas de tus videos, videollamadas para check-ins semanales y una plataforma digital para tu rutina. Esto te permite entrenar a tus propios horarios desde cualquier parte del mundo.",
    order: 6,
    active: true
  },
  {
    id: "7",
    question: "¿Qué pasa si ya intenté muchas veces y abandoné?",
    answer: "La mayoría de las personas abandona porque dependen únicamente de la motivación. En Impacto Fitness te damos estructura, disciplina y un sistema de hábitos atómicos. Nos enfocamos en reprogramar tu identidad física para que el entrenamiento sea parte de quién sos, no una carga obligatoria.",
    order: 7,
    active: true
  }
];

export const seedSiteSettings: SiteSettings = {
  whatsappNumber: "5491100000000",
  instagramUrl: "https://instagram.com/nahuelcoach",
  youtubeUrl: "https://youtube.com/nahuelcoach",
  brandName: "NAHUEL COACH",
  logoUrl: "/logo.png",
  heroTitle: "Transformá tu cuerpo. Recuperá tu energía. Volvé a confiar en vos.",
  heroSubtitle: "Impacto Fitness es un método de transformación integral para personas con poco tiempo que quieren dejar de improvisar, ordenar sus hábitos y construir un cuerpo más fuerte, liviano y funcional.",
  heroCtaText: "Ver planes",
  aboutTitle: "Mi nombre es Nahuel y soy coach de transformación física e integral.",
  aboutBio: "Llevo más de 10 años entrenando mi cuerpo y más de 4 años acompañando a personas de manera presencial y digital en su evolución. Mi formación abarca Personal Trainer, Instructor en Musculación, Atleta de Calistenia, Nutrición Deportiva, Coaching Personal y Programación Neurolingüística (PNL). Impacto Fitness no es solo una rutina de gimnasio; es una estructura física, mental y emocional sostenible diseñada para recuperar tu liderazgo personal.",
  aboutImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
};

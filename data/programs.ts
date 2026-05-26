export interface Program {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";
  badge?: "Más elegido" | "Premium" | "Recomendado" | "Nuevo" | string;
  image: string;
  color: string;
  benefits: string[];
  includes: string[];
  forWho: string[];
  expectedResults: string[];
  category: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
}

export const programs: Program[] = [
  {
    id: "1",
    slug: "rutina-express-30-min",
    name: "Rutina Express 30 Min",
    subtitle: "Activá tu cuerpo y constancia",
    description: "Rutinas súper efectivas de 30 minutos diseñadas para personas ocupadas. Activa tu energía, mejora tu tono muscular y empieza a construir el hábito de entrenar sin excusas.",
    longDescription: "La Rutina Express 30 Min es la solución ideal para quienes sienten que no tienen tiempo para entrenar. Con sesiones optimizadas de 30 minutos de alta eficiencia basada en ejercicios compuestos, lograrás activar tu metabolismo, quemar calorías y tonificar tus músculos de manera simple, rápida y sin rodeos.",
    price: 25000,
    originalPrice: 40000,
    duration: "4 semanas",
    level: "Todos los niveles",
    badge: "Nuevo",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    color: "#0066FF",
    benefits: [
      "Rutina estructurada por días",
      "Ejercicios simples y efectivos",
      "Adaptable a gimnasio o casa",
      "Ideal para activar energía y constancia",
      "Guía básica de progresión"
    ],
    includes: [
      "Rutina en PDF de alta definición",
      "Demostración técnica en video",
      "Adaptación 100% para casa o gimnasio",
      "Guía básica para aumentar cargas progresivamente",
      "Soporte técnico de dudas por WhatsApp"
    ],
    forWho: [
      "Personas con agendas complejas y poco tiempo libre",
      "Quienes quieren reactivar su cuerpo tras una pausa larga",
      "Principiantes que buscan arrancar con rutinas sencillas de sostener",
      "Buscadores de constancia física duradera"
    ],
    expectedResults: [
      "Aumento inmediato en tus niveles de energía diarios",
      "Consistencia de entrenamiento establecida",
      "Mejora del tono muscular y resistencia cardiovascular",
      "Activación del metabolismo basal"
    ],
    category: "Recursos Digitales",
    featured: true,
    active: true,
    order: 1
  },
  {
    id: "2",
    slug: "guia-alimentacion-consciente",
    name: "Guía de Alimentación Consciente",
    subtitle: "Comé mejor sin vivir restringido",
    description: "Principios fundamentales para ordenar tu alimentación diaria con claridad. Aprende a distribuir tus porciones, organizar tus comidas y comer lo que te gusta de forma inteligente.",
    longDescription: "La Guía de Alimentación Consciente de Nahuel Coach te enseña a reprogramar tu relación con la comida. Olvidate de las dietas restrictivas y los enfoques insostenibles. Aprenderás las bases científicas y prácticas de la nutrición para comer rico, sentirte con vitalidad constante y alcanzar tus objetivos físicos sin obsesiones.",
    price: 25000,
    originalPrice: 40000,
    duration: "Guía digital",
    level: "Todos los niveles",
    badge: "Recomendado",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    color: "#00CCFF",
    benefits: [
      "Principios básicos de alimentación",
      "Organización simple de comidas",
      "Ideas para déficit, mantenimiento o volumen",
      "Lista de alimentos recomendados",
      "Estrategia para sostener sin obsesionarte"
    ],
    includes: [
      "Ebook digital interactivo en formato PDF",
      "Lista inteligente de compras para el supermercado",
      "Guía para estimación visual de porciones",
      "Estrategia paso a paso para eventos sociales sin culpa",
      "Soporte de dudas nutricionales básicas por WhatsApp"
    ],
    forWho: [
      "Personas cansadas del efecto rebote de dietas estrictas",
      "Quienes deseen aprender a comer de manera equilibrada",
      "Quienes busquen organizar su cocina de forma práctica y veloz",
      "Buscadores de una mejor digestión y vitalidad diaria"
    ],
    expectedResults: [
      "Pérdida de peso o ganancia muscular sostenible en el tiempo",
      "Focalización mental y reducción de ansiedad por la comida",
      "Independencia absoluta para elegir qué comer diariamente",
      "Establecimiento de hábitos alimenticios duraderos"
    ],
    category: "Recursos Digitales",
    featured: true,
    active: true,
    order: 2
  },
  {
    id: "3",
    slug: "pack-impacto-inicial",
    name: "Pack Impacto Inicial",
    subtitle: "El combo de entrenamiento y hábitos para tu cambio",
    description: "La estructura física, mental y alimenticia que necesitas para empezar a ver cambios reales. Incluye rutina de entrenamiento, guía nutricional y checklist de hábitos diarios.",
    longDescription: "El Pack Impacto Inicial combina entrenamiento y nutrición en una sola estructura unificada de alto impacto. Ideal para quienes quieren ordenar su vida de forma integral, este combo te entrega la rutina perfecta de activación física y los hábitos fundamentales para forjar disciplina, constancia y un cuerpo más fuerte.",
    price: 35000,
    originalPrice: 55000,
    duration: "6 semanas",
    level: "Principiante",
    badge: "Más elegido",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
    color: "#10B981",
    benefits: [
      "Rutina de entrenamiento",
      "Guía de alimentación",
      "Checklist de hábitos diarios",
      "Organización semanal",
      "Recursos prácticos"
    ],
    includes: [
      "Plan de Entrenamiento de 6 semanas (Gym/Casa)",
      "Guía de Alimentación Consciente en PDF",
      "Ficha Interactiva de Checklist de Hábitos Diarios",
      "Planificador de Rutina y Comidas Semanal",
      "Acompañamiento básico directo por WhatsApp"
    ],
    forWho: [
      "Principiantes decididos a construir bases de acero desde cero",
      "Personas estancadas que necesitan dirección y estructura",
      "Quienes busquen un cambio tanto físico como de hábitos cotidianos",
      "Buscadores de organización y disciplina consciente"
    ],
    expectedResults: [
      "Reducción notable de porcentaje de grasa y tonificación física",
      "Automatización de hábitos saludables clave (sueño, agua, entreno)",
      "Aumento sostenido de la autoestima y auto-confianza",
      "Organización integral de tu semana fit"
    ],
    category: "Recursos Digitales",
    featured: true,
    active: true,
    order: 3
  },
  {
    id: "4",
    slug: "recetario-impacto-fitness",
    name: "Recetario Impacto Fitness",
    subtitle: "Comidas deliciosas, rápidas y altas en proteína",
    description: "Recetas saludables, prácticas y con excelente aporte proteico. Opciones dulces, saladas e ideas rápidas para sostener tu alimentación con total placer.",
    longDescription: "El Recetario Impacto Fitness fue creado para desmitificar que comer sano es aburrido o insípido. Contiene una recopilación de preparaciones de alto contenido proteico que te ayudarán a construir músculo y quemar grasa disfrutando cada bocado. Con recetas dulces y saladas sumamente prácticas, cocinarás platos premium en minutos.",
    price: 20000,
    originalPrice: 32000,
    duration: "Guía digital",
    level: "Todos los niveles",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    color: "#7B2FFF",
    benefits: [
      "Recetas dulces",
      "Recetas saladas",
      "Opciones altas en proteína",
      "Ideas rápidas",
      "Comidas fáciles de sostener"
    ],
    includes: [
      "Ebook de Recetas con macros detallados por porción",
      "Guía de reemplazo de ingredientes para adaptarlo a tus gustos",
      "Ideas de meriendas y snacks proteicos exprés",
      "Opciones de postres saludables para calmar la ansiedad",
      "Contacto directo por dudas de preparación vía WhatsApp"
    ],
    forWho: [
      "Quienes buscan comer exquisito sin sabotear sus metas físicas",
      "Personas con poco tiempo para la cocina diaria",
      "Deportistas que desean aumentar su ingesta de proteínas de forma rica",
      "Amantes de los dulces que busquen versiones fit"
    ],
    expectedResults: [
      "Aumento en la masa muscular gracias a un óptimo aporte proteico",
      "Adherencia del 100% a tu plan nutricional gracias al disfrute culinario",
      "Ahorro de tiempo diario en la cocina con ideas sencillas",
      "Mayor saciedad y control del apetito"
    ],
    category: "Recursos Digitales",
    featured: true,
    active: true,
    order: 4
  },
  {
    id: "5",
    slug: "plan-transformacion",
    name: "Plan Transformación",
    subtitle: "Cambia tu físico, cambia tu vida",
    description: "Un programa intensivo de 12 semanas diseñado para transformar tu cuerpo con periodización avanzada, nutrición precisa y mentalidad ganadora.",
    longDescription: "El Plan Transformación es un proceso completo de 12 semanas para quienes ya tienen una base de entrenamiento y desean dar un salto estético y funcional rotundo. Diseñado con periodización avanzada de cargas en 3 fases y guías de macros precisas, esculpirás tu físico al máximo nivel de manera inteligente y disciplinada.",
    price: 80000,
    originalPrice: 125000,
    duration: "12 semanas",
    level: "Intermedio",
    badge: "Más elegido",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    color: "#00CCFF",
    benefits: [
      "Periodización avanzada en 3 fases",
      "Nutrición personalizada con macros",
      "Entrenamiento de hipertrofia científico",
      "Cardio estratégico para quemar grasa",
      "Seguimiento de progreso"
    ],
    includes: [
      "Planificación completa de entrenamiento en 3 bloques",
      "Guía avanzada de nutrición y cálculo de macronutrientes",
      "Protocolos específicos de cardio HIIT y LISS",
      "Calculadora de calorías personalizada",
      "Comunidad VIP e intercambio por WhatsApp"
    ],
    forWho: [
      "Personas con experiencia intermedia de 6+ meses de entrenamiento",
      "Quienes quieran lograr una recomposición corporal máxima",
      "Entrenadores o deportistas recreativos buscando planes estructurados"
    ],
    expectedResults: [
      "Pérdida drástica de porcentaje de grasa abdominal",
      "Ganancia notable de fuerza e hipertrofia muscular",
      "Mejora en la capacidad cardiopulmonar",
      "Mentalidad competitiva aplicada al día a día"
    ],
    category: "Transformación",
    featured: false,
    active: true,
    order: 5
  },
  {
    id: "6",
    slug: "full-body",
    name: "Full Body Power",
    subtitle: "Todo el cuerpo, máxima eficiencia",
    description: "Entrenamiento de cuerpo completo 3 días por semana. Ideal para optimizar tiempo sin sacrificar resultados reales.",
    longDescription: "Full Body Power activa todo tu cuerpo en cada sesión. Es el esquema óptimo para quienes desean entrenar solo 3 veces por semana con máxima eficiencia utilizando movimientos compuestos de alta demanda metabólica.",
    price: 45000,
    originalPrice: 65000,
    duration: "8 semanas",
    level: "Principiante",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    color: "#0066FF",
    benefits: [
      "Solo 3 días por semana",
      "Ejercicios compuestos de alto rendimiento",
      "Progresión de cargas incluida",
      "Opción gym y opción casa"
    ],
    includes: [
      "Rutina Full Body de 3 días para gimnasio",
      "Variante adaptable para entrenar en el hogar",
      "Videos explicativos de la ejecución de cada movimiento",
      "Esquema de progresión de cargas ondulatorio",
      "Contacto de resolución de dudas vía WhatsApp"
    ],
    forWho: [
      "Personas ocupadas que solo pueden entrenar 3 días",
      "Principiantes que desean construir una base motriz fuerte",
      "Buscadores de alta frecuencia de entrenamiento muscular"
    ],
    expectedResults: [
      "Incremento generalizado de fuerza en todo el cuerpo",
      "Optimización de tiempos sin sacrificar desarrollo muscular",
      "Activación física y bienestar global",
      "Excelente gasto calórico semanal"
    ],
    category: "Fuerza",
    featured: false,
    active: true,
    order: 6
  }
];

export const getFeaturedPrograms = () => programs.filter((p) => p.featured);
export const getProgramBySlug = (slug: string) =>
  programs.find((p) => p.slug === slug);
export const getAllPrograms = () => programs;

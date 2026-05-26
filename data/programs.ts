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
  badge?: "Más elegido" | "Premium" | "Recomendado" | "Nuevo";
  image: string;
  color: string;
  benefits: string[];
  includes: string[];
  forWho: string[];
  expectedResults: string[];
  category: string;
  featured?: boolean;
}

export const programs: Program[] = [
  {
    id: "1",
    slug: "plan-inicial",
    name: "Plan Inicial",
    subtitle: "Tu primer paso hacia la transformación",
    description:
      "El punto de partida perfecto para comenzar tu camino fitness con bases sólidas y resultados reales desde la primera semana.",
    longDescription:
      "El Plan Inicial está diseñado para personas que quieren comenzar de forma correcta, sin errores ni lesiones. Aprenderás la técnica perfecta, construirás una base sólida y entenderás los principios del entrenamiento que te acompañarán toda la vida.",
    price: 29,
    originalPrice: 49,
    duration: "4 semanas",
    level: "Principiante",
    badge: "Recomendado",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    color: "#0066FF",
    benefits: [
      "Técnica perfecta desde el inicio",
      "Rutinas adaptadas a tu nivel",
      "Guía nutricional básica",
      "Soporte por WhatsApp",
      "Plan de progresión semanal",
      "Videos explicativos de cada ejercicio",
    ],
    includes: [
      "PDF con rutinas semanales",
      "Videos demostrativos en HD",
      "Guía nutricional de inicio",
      "Soporte por WhatsApp por 4 semanas",
      "Ficha de seguimiento",
      "Acceso a comunidad privada",
    ],
    forWho: [
      "Personas sin experiencia previa en el gym",
      "Quienes regresan al entrenamiento tras una pausa",
      "Personas que quieren aprender la técnica correcta",
      "Quienes buscan un plan claro y estructurado",
    ],
    expectedResults: [
      "Dominio de los movimientos básicos",
      "Mejora de la postura y movilidad",
      "Primeros cambios físicos visibles",
      "Hábito de entrenamiento establecido",
    ],
    category: "Iniciación",
    featured: true,
  },
  {
    id: "2",
    slug: "plan-transformacion",
    name: "Plan Transformación",
    subtitle: "Cambia tu físico, cambia tu vida",
    description:
      "Un programa intensivo de 12 semanas diseñado para transformar tu cuerpo con periodización avanzada, nutrición precisa y mentalidad ganadora.",
    longDescription:
      "El Plan Transformación es nuestro programa más completo para quienes ya tienen base y quieren llevar su físico al siguiente nivel. Combina entrenamiento de hipertrofia, cardio estratégico y nutrición personalizada para resultados máximos.",
    price: 79,
    originalPrice: 129,
    duration: "12 semanas",
    level: "Intermedio",
    badge: "Más elegido",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    color: "#00CCFF",
    benefits: [
      "Periodización avanzada en 3 fases",
      "Nutrición personalizada con macros",
      "Entrenamiento de hipertrofia científico",
      "Cardio estratégico para quemar grasa",
      "Seguimiento semanal de progreso",
      "Ajustes en tiempo real",
    ],
    includes: [
      "Programa completo de 12 semanas",
      "Plan nutricional con macros",
      "Videos de técnica avanzada",
      "Soporte premium por WhatsApp",
      "Check-in semanal con Nahuel",
      "Calculadora de macros personalizada",
      "Acceso a comunidad VIP",
    ],
    forWho: [
      "Personas con 6+ meses de experiencia",
      "Quienes quieren una transformación real",
      "Personas comprometidas con el proceso",
      "Atletas recreativos que quieren subir su nivel",
    ],
    expectedResults: [
      "Pérdida de 5-10kg de grasa",
      "Ganancia muscular visible",
      "Definición y tonicidad notable",
      "Mejora de rendimiento atlético",
    ],
    category: "Transformación",
    featured: true,
  },
  {
    id: "3",
    slug: "coaching-premium",
    name: "Coaching Premium",
    subtitle: "El nivel más alto de personalización",
    description:
      "Mentoría completa con Nahuel. Planes 100% personalizados, videollamadas semanales, ajustes en tiempo real y acceso directo ilimitado.",
    longDescription:
      "El Coaching Premium es para quien no acepta resultados mediocres. Trabajarás directamente con Nahuel con un plan completamente diseñado para tu cuerpo, objetivos y estilo de vida. Esto no es un programa genérico, es tu programa.",
    price: 199,
    originalPrice: 299,
    duration: "8 semanas",
    level: "Todos los niveles",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    color: "#7B2FFF",
    benefits: [
      "Plan 100% personalizado para ti",
      "Videollamada semanal con Nahuel",
      "Ajustes de plan cada semana",
      "Nutrición individualizada",
      "Soporte 24/7 por WhatsApp",
      "Seguimiento de métricas diarias",
    ],
    includes: [
      "Onboarding completo (evaluación física)",
      "Plan de entrenamiento personalizado",
      "Plan nutricional detallado",
      "4 videollamadas con Nahuel",
      "Soporte ilimitado por WhatsApp",
      "Ajustes semanales del plan",
      "Ficha de medidas y progreso",
      "Acceso a biblioteca de ejercicios",
    ],
    forWho: [
      "Personas que quieren lo mejor",
      "Quienes han intentado todo sin resultados",
      "Atletas que quieren preparación específica",
      "Personas con necesidades especiales o lesiones",
    ],
    expectedResults: [
      "Transformación física garantizada",
      "Cambio de hábitos permanente",
      "Mentalidad y disciplina de élite",
      "Resultados documentados semana a semana",
    ],
    category: "Premium",
    featured: true,
  },
  {
    id: "4",
    slug: "full-body",
    name: "Full Body Power",
    subtitle: "Todo el cuerpo, máxima eficiencia",
    description:
      "Entrenamiento de cuerpo completo 3 días por semana. Ideal para optimizar tiempo sin sacrificar resultados.",
    longDescription:
      "Full Body Power es el programa ideal para quienes tienen poco tiempo pero quieren resultados serios. 3 sesiones por semana de alta eficiencia que activan cada grupo muscular con ejercicios compuestos y progresión inteligente.",
    price: 39,
    originalPrice: 59,
    duration: "8 semanas",
    level: "Principiante",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    color: "#0066FF",
    benefits: [
      "Solo 3 días por semana",
      "Ejercicios compuestos de alto rendimiento",
      "Progresión de cargas incluida",
      "Opción gym y opción casa",
      "Cardio integrado al final de sesión",
    ],
    includes: [
      "Programa de 8 semanas",
      "Versión gym y versión casa",
      "Guía de progresión",
      "Videos de técnica",
      "Soporte por WhatsApp",
    ],
    forWho: [
      "Personas con agenda apretada",
      "Principiantes e intermedios",
      "Quienes prefieren entrenar menos días",
      "Personas que quieren base sólida",
    ],
    expectedResults: [
      "Mejora de fuerza general",
      "Pérdida de grasa corporal",
      "Mayor energía diaria",
      "Cuerpo más tonificado",
    ],
    category: "Fuerza",
  },
  {
    id: "5",
    slug: "definicion-extrema",
    name: "Definición Extrema",
    subtitle: "Marcación y definición máxima",
    description:
      "Programa especializado para reducir grasa al máximo, marcar abdomen y lograr definición muscular de alto nivel.",
    longDescription:
      "Definición Extrema es el programa que usamos para preparaciones de playa, competencias y cambios estéticos radicales. Combina entrenamiento de alta intensidad, cardio estratégico y nutrición en déficit controlado.",
    price: 59,
    originalPrice: 89,
    duration: "10 semanas",
    level: "Avanzado",
    image:
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80",
    color: "#00CCFF",
    benefits: [
      "Protocolo anti-grasa específico",
      "Abdomen definido en 10 semanas",
      "Cardio HIIT integrado",
      "Nutrición en déficit estratégico",
      "Preservación máxima de músculo",
    ],
    includes: [
      "Programa de 10 semanas",
      "Plan nutricional en déficit",
      "Rutinas de cardio HIIT",
      "Guía de suplementación",
      "Soporte por WhatsApp",
      "Calculadora calórica",
    ],
    forWho: [
      "Personas con experiencia previa",
      "Quienes quieren definición máxima",
      "Preparación de playa o competencia",
      "Personas con base muscular construida",
    ],
    expectedResults: [
      "Abdomen marcado y visible",
      "Reducción de grasa significativa",
      "Músculo preservado y definido",
      "Físico estético de alto nivel",
    ],
    category: "Definición",
  },
  {
    id: "6",
    slug: "volumen-muscular",
    name: "Volumen Muscular",
    subtitle: "Construye masa muscular de verdad",
    description:
      "El programa definitivo para ganar músculo real con periodización científica, superávit calórico controlado y máxima hipertrofia.",
    longDescription:
      "Volumen Muscular está diseñado para maximizar la ganancia de masa muscular con ciencia. Usamos periodización ondulatoria, técnicas avanzadas de hipertrofia y nutrición en superávit inteligente para construir el físico que siempre quisiste.",
    price: 49,
    originalPrice: 79,
    duration: "12 semanas",
    level: "Intermedio",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    color: "#7B2FFF",
    benefits: [
      "Hipertrofia científica comprobada",
      "División de entrenamientos optimizada",
      "Nutrición en superávit controlado",
      "Técnicas avanzadas: drop sets, superseries",
      "Progresión de cargas sistemática",
    ],
    includes: [
      "12 semanas de programa completo",
      "Plan nutricional para volumen",
      "Guía de técnicas avanzadas",
      "Calculadora de superávit calórico",
      "Videos de ejercicios",
      "Soporte por WhatsApp",
    ],
    forWho: [
      "Personas que quieren ganar masa muscular",
      "Intermedios y avanzados",
      "Ectomorfos que luchan por ganar peso",
      "Quienes quieren un físico más grande",
    ],
    expectedResults: [
      "Ganancia de 3-6 kg de músculo",
      "Mayor fuerza en todos los ejercicios",
      "Físico más grande y definido",
      "Mejora de composición corporal",
    ],
    category: "Volumen",
  },
  {
    id: "7",
    slug: "bajar-de-peso",
    name: "Pérdida de Peso",
    subtitle: "Resultados reales y sostenibles",
    description:
      "Programa holístico para perder peso de forma inteligente, sin dietas extremas, con hábitos que duran toda la vida.",
    longDescription:
      "El programa de Pérdida de Peso de Nahuel va más allá de las calorías. Trabajamos mente, hábitos, alimentación y ejercicio de forma integrada para que pierdas peso de manera sostenible y nunca más lo recuperes.",
    price: 44,
    originalPrice: 69,
    duration: "8 semanas",
    level: "Todos los niveles",
    image:
      "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80",
    color: "#0066FF",
    benefits: [
      "Pérdida de grasa sostenible",
      "Sin dietas extremas ni restricciones",
      "Hábitos alimenticios para siempre",
      "Entrenamiento adaptado",
      "Mindset de transformación",
    ],
    includes: [
      "Programa de 8 semanas",
      "Guía nutricional completa",
      "Lista de alimentos recomendados",
      "Recetas fitness incluidas",
      "Soporte por WhatsApp",
      "Registro de progreso semanal",
    ],
    forWho: [
      "Personas con sobrepeso que quieren cambiar",
      "Quienes han fallado en otras dietas",
      "Personas que quieren hábitos sostenibles",
      "Todos los niveles de experiencia",
    ],
    expectedResults: [
      "Pérdida de 4-8 kg de grasa",
      "Mejora de energía y bienestar",
      "Hábitos alimenticios establecidos",
      "Mayor autoestima y confianza",
    ],
    category: "Pérdida de peso",
  },
  {
    id: "8",
    slug: "movilidad-y-flexibilidad",
    name: "Movilidad & Flexibilidad",
    subtitle: "Muévete mejor, vive mejor",
    description:
      "Programa especializado para mejorar movilidad articular, flexibilidad y calidad de movimiento. Ideal como complemento o programa independiente.",
    longDescription:
      "La movilidad es la base de todo rendimiento físico. Este programa combina estiramientos activos, trabajo de movilidad articular, yoga funcional y técnicas de recuperación para que te muevas con libertad total.",
    price: 29,
    duration: "6 semanas",
    level: "Todos los niveles",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    color: "#00CCFF",
    benefits: [
      "Mejora de movilidad articular",
      "Reducción de dolores posturales",
      "Mayor rango de movimiento",
      "Recuperación activa incluida",
      "Ideal para todos los niveles",
    ],
    includes: [
      "Programa de 6 semanas",
      "Rutinas diarias de 20-30 min",
      "Videos guiados con Nahuel",
      "Guía de postura correcta",
      "Soporte por WhatsApp",
    ],
    forWho: [
      "Personas con dolor postural",
      "Deportistas que quieren mejorar rendimiento",
      "Quienes trabajan sentados muchas horas",
      "Cualquier persona sin importar nivel",
    ],
    expectedResults: [
      "Mejora notable de flexibilidad",
      "Reducción de dolores musculares",
      "Mayor libertad de movimiento",
      "Mejor calidad de vida general",
    ],
    category: "Movilidad",
  },
];

export const getFeaturedPrograms = () => programs.filter((p) => p.featured);
export const getProgramBySlug = (slug: string) =>
  programs.find((p) => p.slug === slug);
export const getAllPrograms = () => programs;

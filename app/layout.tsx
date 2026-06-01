import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingInstagram from "@/components/FloatingInstagram";

export const metadata: Metadata = {
  title: "Nahuel Coach | Entrenamiento Premium",
  description:
    "Transformá tu cuerpo, mente y espíritu con Nahuel Coach. Programas de entrenamiento personalizados, coaching premium y mentoría 1 a 1.",
  keywords: "entrenador personal, coaching fitness, rutinas, transformacion, musculacion",
  openGraph: {
    title: "Nahuel Coach | Entrenamiento Premium",
    description: "Transformá tu cuerpo. Recuperá tu energía. Volvé a confiar en vos.",
    url: "https://nahuelcoach-nu.vercel.app",
    siteName: "Nahuel Coach",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nahuel Fitness Coach" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahuel Coach | Entrenamiento Premium",
    description: "Transformá tu cuerpo. Recuperá tu energía. Volvé a confiar en vos.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-black text-white antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingInstagram />
        </CartProvider>
      </body>
    </html>
  );
}

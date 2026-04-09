import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Hind_Madurai,
  Maven_Pro,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/ui/SplashScreen";
import { SplashProvider } from "@/components/ui/SplashContext";
import CustomCursor from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-title",
});

const hindMadurai = Hind_Madurai({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-subtitle",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-body",
});


export const metadata: Metadata = {
  title: "ageni.ai — AI-Powered Learning Platform",
  description: "AI-Powered Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Playwrite+IE&family=Boldonse&family=Source+Serif+4:ital,wght@0,400;1,700&family=Orbitron:wght@700&family=Mea+Culpa&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${cormorant.variable} ${hindMadurai.variable} ${mavenPro.variable} antialiased bg-light`}>
        <SplashProvider>
          <CustomCursor />
          <SplashScreen />
          <Navbar />
          {children}
          <Footer />
          {/* Fixed bottom viewport blur — content clears as it scrolls into view */}
          <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-36 w-full bg-gradient-to-t from-black/40 to-transparent backdrop-blur-[6px]" style={{ maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }} />
        </SplashProvider>
      </body>
    </html>
  );
}

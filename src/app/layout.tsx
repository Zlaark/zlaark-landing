import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ThemeProvider from "./context/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Navbar from "./components/Navbar/Navbar";
import CinematicGrain from "./components/Effects/CinematicGrain";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZLAARK | Crafting Digital Legacies",
  description: "Award-winning digital agency specializing in high-end web design, mobile apps, and e-commerce. We build immersive, performance-driven digital experiences. Est. MMXXV.",
  keywords: ["web design", "digital agency", "luxury web design", "3D websites", "Next.js", "React Native", "creative agency", "Zlaark"],
  authors: [{ name: "Zlaark" }],
  creator: "Zlaark",
  publisher: "Zlaark",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ZLAARK | Crafting Digital Legacies",
    description: "Award-winning digital agency specializing in high-end web design, mobile apps, and e-commerce.",
    url: "https://zlaark.com",
    siteName: "Zlaark",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZLAARK - Crafting Digital Legacies',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZLAARK | Crafting Digital Legacies",
    description: "Award-winning digital agency specializing in high-end web design, mobile apps, and e-commerce.",
    creator: "@zlaark",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${inter.variable}`}>
        <ThemeProvider>
          <CustomCursor />
          {/* <CinematicGrain /> */}
          {/* <ThemeToggle /> */}
          <Navbar />
          <PageWrapper>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}


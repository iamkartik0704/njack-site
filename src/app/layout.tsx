import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import NoiseOverlay from '@/components/NoiseOverlay';
import CommandPalette from '@/components/CommandPalette';

// WebGL 3D Canvas dynamically loaded on client only (disabling SSR prevents window/canvas mismatch)
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
  display: 'swap',
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: 'NJACK — Official Coding Club | IIT Patna',
    template: '%s | NJACK IIT Patna',
  },
  description:
    'The premier student-led computer science club of Indian Institute of Technology Patna (Not Just Another Computer Science Club). Algorithmic problem solving, production systems, cybersecurity, and artificial intelligence.',
  keywords: [
    'NJACK',
    'IIT Patna',
    'Computer Science Club',
    'Not Just Another Computer Science Club',
    'Competitive Programming',
    'Open Source',
    'Machine Learning',
    'Cyber Security',
    'ICPC',
    'GSoC',
    'NWoC',
    'Apeireon',
  ],
  authors: [{ name: 'NJACK IIT Patna', url: 'https://njack.iitp.ac.in' }],
  openGraph: {
    title: 'NJACK — Official Computer Science Club | IIT Patna',
    description:
      'The official Computer Science Club of IIT Patna (Not Just Another Computer Science Club) — fostering engineering excellence, open source, algorithmic dominance, and AI research.',
    url: 'https://njack.iitp.ac.in',
    siteName: 'NJACK IIT Patna',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-[#07080A] text-[#F3F4F6] relative selection:bg-[#FF5722] selection:text-white`}
      >
        {/* Global Atmospheric Noise Overlay */}
        <NoiseOverlay />

        {/* Global Architectural Radial Masked Grid */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none architectural-grid"
        />

        {/* Persistent Scroll-Linked 3D Canvas */}
        <Scene3D />

        {/* Global Command Palette (⌘K) */}
        <CommandPalette />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Inertia Smooth Scroll Container */}
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CursorSpotlight from "@/components/CursorSpotlight";
import GsapScrollEffects from "@/components/GsapScrollEffects";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "NJACK — Not Just Another Coding Club | IIT Patna",
    template: "%s | NJACK IIT Patna",
  },
  description:
    "The official Computer Science & Coding Club of Indian Institute of Technology Patna. Competitive Programming, Development & Open Source, Machine Learning, and Cyber Security.",
  keywords: [
    "NJACK",
    "IIT Patna",
    "Not Just Another Coding Club",
    "Computer Science Club",
    "Competitive Programming",
    "Open Source",
    "Machine Learning",
    "Cyber Security",
    "ICPC",
    "GSoC",
    "NWoC",
    "Apeireon",
  ],
  authors: [{ name: "NJACK IIT Patna", url: "https://njack.iitp.ac.in" }],
  openGraph: {
    title: "NJACK — Not Just Another Coding Club | IIT Patna",
    description:
      "The official Computer Science & Coding Club of IIT Patna — fostering engineering excellence, open source, algorithmic dominance, and AI research.",
    url: "https://njack.iitp.ac.in",
    siteName: "NJACK IIT Patna",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ScrollProgress />
        <CursorSpotlight />
        <GsapScrollEffects />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

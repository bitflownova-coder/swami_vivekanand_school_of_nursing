import './globals.css';
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// This line automatically handles your production and local URLs
const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
  // Add this one line to fix the warning
  metadataBase: new URL(siteUrl),

  title: "INDRAYANI PRATISHTHAN - Swami Vivekanand School of Nursing",
  description:
    "Premier institute for GNM nursing education in Maharashtra. Nurturing compassionate healthcare professionals dedicated to serving society.",
  keywords:
    "nursing school, GNM, Maharashtra, nursing education, healthcare, medical training",
  openGraph: {
    title: "INDRAYANI PRATISHTHAN - Swami Vivekanand School of Nursing",
    description: "Premier institute for GNM nursing education in Maharashtra.",
    images: ['/og-image.png'], // You can now use relative paths
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

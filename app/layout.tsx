import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FloatingEnquiry from "@/components/floating-enquiry";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "600", "700", "800"] });

// 1. METADATA EXPORT (Server-side SEO)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.svsnursing.org"),
  title: {
    default: "Best Nursing College in Aurangabad | Swami Vivekanand School of Nursing | Top GNM & ANM Institute Maharashtra",
    template: "%s | Swami Vivekanand School of Nursing – Top Nursing College Aurangabad",
  },
  description:
    "Swami Vivekanand School of Nursing is one of the top 10 best nursing colleges in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra. Offering GNM and ANM courses approved by Maharashtra State Board of Nursing. Expert faculty, modern labs, 100% placement support. Admissions open 2026–27.",
  keywords: [
    "top nursing college Aurangabad",
    "best nursing college Aurangabad",
    "top 10 nursing colleges Maharashtra",
    "best GNM college Aurangabad",
    "GNM nursing admission 2026",
    "ANM nursing college Aurangabad",
    "nursing institute Chhatrapati Sambhajinagar",
    "Swami Vivekanand nursing college",
    "nursing college near me Aurangabad",
    "Maharashtra nursing council approved college",
    "GNM course Maharashtra",
    "nursing school Marathwada",
    "top nursing institutes Maharashtra",
    "best paramedical college Aurangabad",
    "nursing admission open 2026 Maharashtra",
  ],
  openGraph: {
    title: "Best Nursing College Aurangabad | Swami Vivekanand School of Nursing",
    description:
      "Top nursing college in Aurangabad (Chhatrapati Sambhajinagar) offering GNM & ANM courses. Maharashtra Nursing Council approved. Modern labs, clinical training, 100% placement. Admissions open 2026–27.",
    url: "https://www.svsnursing.org",
    siteName: "Swami Vivekanand Nursing School",
    images: [
      {
        url: "/og-image.png", // Make sure "og-image.png" exists in your /public folder
        width: 1200,
        height: 630,
        alt: "Swami Vivekanand School of Nursing Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/icon.png',
  },
};

// 2. ROOT LAYOUT COMPONENT (The HTML structure)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Swami Vivekanand School of Nursing",
    url: "https://www.svsnursing.org",
    logo: "https://www.svsnursing.org/nursinglogo (1).png",
    description: "One of the top nursing colleges in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra. Offering GNM and ANM nursing courses approved by Maharashtra State Board of Nursing. Modern infrastructure, expert faculty, clinical training, and 100% placement support.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beed Bypass Road, Beside Surya Lawns",
      addressLocality: "Aurangabad",
      postalCode: "431009",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7517275151",
      contactType: "admissions",
    },
    sameAs: [
      "https://www.facebook.com/swamivivekanandschoolofnursing/",
      "https://www.instagram.com/svs_of_nursing/",
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
        {/* Add JSON-LD Script Here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navigation />
        <main className="min-h-screen pt-[152px]">{children}</main>
        <Footer />
        <FloatingEnquiry />
      </body>
    </html>
  );
}

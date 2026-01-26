import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Assuming you use Inter font
import "./globals.css";
import Navigation from "@/components/navigation"; // Your components
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

// 1. METADATA EXPORT (Server-side SEO)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.svsnursing.org"),
  title: {
    default: "Swami Vivekanand School of Nursing | GNM & ANM College",
    template: "%s | Swami Vivekanand School of Nursing",
  },
  description:
    "Premier nursing institute in Chh. Sambhajinagar offering GNM and ANM courses. Approved by Maharashtra Nursing Council. 100% placement support.",
  keywords: [
    "Nursing School",
    "GNM Course",
    "ANM Course",
    "Nursing College Aurangabad",
    "Swami Vivekanand Nursing",
    "Medical Education Maharashtra",
  ],
  openGraph: {
    title: "Swami Vivekanand School of Nursing",
    description:
      "Shaping the future of healthcare professionals with excellence and compassion.",
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
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
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
    description: "Premier nursing institute offering GNM and ANM courses.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beed Bypass Road, PWD Colony",
      addressLocality: "Chhatrapati Sambhajinagar",
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
      <body className={inter.className}>
        {/* Add JSON-LD Script Here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

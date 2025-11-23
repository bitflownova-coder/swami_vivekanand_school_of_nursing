import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INDRAYANI PRATISHTHAN - Swami Vivekanand School of Nursing",
  description:
    "Premier institute for GNM nursing education in Maharashtra. Nurturing compassionate healthcare professionals dedicated to serving society.",
  keywords:
    "nursing school, GNM, Maharashtra, nursing education, healthcare, medical training",
  openGraph: {
    title: "INDRAYANI PRATISHTHAN - Swami Vivekanand School of Nursing",
    description: "Premier institute for GNM nursing education in Maharashtra.",
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
      </body>
    </html>
  );
}

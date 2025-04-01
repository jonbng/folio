import type React from "react";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Jonathan Bangert - Folio",
  description: "My place on the internet! Welcome.",
  authors: [{ name: "Jonathan Bangert" }],
  category: "website",
  keywords: ["Jonathan Bangert", "folio", "portfolio", "website"],
  creator: "Jonathan Bangert",
  publisher: "Jonathan Bangert",
  formatDetection: {
    url: true,
    date: false,
    email: true,
    address: true,
    telephone: true,
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://jonathanb.dk"),
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Bangert - Folio",
    description: "My place on the internet! Welcome.",
    creatorId: "@jonba_",
    siteId: "@jonba_",
    site: "@jonba_",
    creator: "@jonba_",
    images: [
      {
        url: "/og.webp",
        alt: "Jonathan Bangert - Folio",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Jonathan Bangert - Folio",
    description: "My place on the internet! Welcome.",
    type: "website",
    countryName: "United States",
    locale: "en-US",
    siteName: "Jonathan Bangert - Folio",
    url: "https://jonathanb.dk",
    emails: ["contact@jonathanb.dk"],
    images: [
      {
        url: "/og.webp",
        alt: "Jonathan Bangert - Folio",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`$antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

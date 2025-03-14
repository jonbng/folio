import type React from "react";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jonathan Bangert - Folio",
  description: "My place on the internet! Welcome.",
  authors: [{ name: "Jonathan Bangert" }],
  category: "website",
  keywords: ["Jonathan Bangert", "folio", "portfolio", "website"],
  creator: "Jonathan Bangert",
  publisher: "Jonathan Bangert",
  themeColor: "#ffffff",
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
    creatorId: "@arctixdev",
    siteId: "@arctixdev",
    site: "@arctixdev",
    creator: "@arctixdev",
    images: [{
      url: "/og.png",
      alt: "Jonathan Bangert - Folio",
      width: 1200,
      height: 630,
      type: "image/png",
    }],
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
    images: [{
      url: "/og.png",
      alt: "Jonathan Bangert - Folio",
      width: 1200,
      height: 630,
      type: "image/png",
    }],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`$antialiased`}>{children}</body>
    </html>
  );
}

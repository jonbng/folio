import type React from "react";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { getSiteDescription, site } from "@/lib/site";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const description = await getSiteDescription();

  return {
    title: `${site.name} — Software Engineer & Builder`,
    description,
    authors: [{ name: site.name, url: site.url }],
    category: "website",
    creator: site.name,
    publisher: site.name,
    formatDetection: {
      url: true,
      date: false,
      email: true,
      address: true,
      telephone: true,
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
    },
    metadataBase: new URL(site.url),
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — Software Engineer & Builder`,
      description,
      site: "@jonbng",
      creator: "@jonbng",
      images: [
        {
          url: "/og.webp",
          alt: "Jonathan Bangert",
          width: 1200,
          height: 630,
          type: "image/webp",
        },
      ],
    },
    openGraph: {
      title: `${site.name} — Software Engineer & Builder`,
      description,
      type: "website",
      countryName: "Denmark",
      locale: "en_DK",
      siteName: site.name,
      url: site.url,
      images: [
        {
          url: "/og.webp",
          alt: "Jonathan Bangert",
          width: 1200,
          height: 630,
          type: "image/webp",
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: "en-DK",
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        image: `${site.url}/pfp.jpeg`,
        description: site.profileDescription,
        jobTitle: "Software Engineer",
        nationality: {
          "@type": "Country",
          name: "Denmark",
        },
        affiliation: {
          "@type": "EducationalOrganization",
          name: "UWC Red Cross Nordic",
          url: "https://uwcrcn.no",
        },
        sameAs: site.socialLinks,
        knowsAbout: [
          "Software engineering",
          "Product development",
          "Technology",
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": site.url,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased font-body">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

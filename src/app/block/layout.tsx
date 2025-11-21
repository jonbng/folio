import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Builder Fellowship | Jonathan Bangert",
  description: "Block Builder Fellowship | Jonathan Bangert.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


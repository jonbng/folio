import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Builder Fellowship | Jonathan Bangert",
  description: "Block Builder Fellowship | Jonathan Bangert.",
};

export default function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


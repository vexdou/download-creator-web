import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VEXDOU — Digital World",
  description:
    "Welcome to VEXDOU. Discover projects, social platforms, media and updates.",
  keywords: ["VEXDOU", "creator", "developer", "projects", "social", "technology"],
  authors: [{ name: "VEXDOU" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

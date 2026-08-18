import React from "react";

export const metadata = {
  title: "Download Creator — Telegram Bot Builder",
  description: "Create your own Telegram downloader bot in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}

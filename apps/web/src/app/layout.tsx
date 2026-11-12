import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AANTVYOG — Build with clarity",
  description: "Shape a clear project request before the build begins.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

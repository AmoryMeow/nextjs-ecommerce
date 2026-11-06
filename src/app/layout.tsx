import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import styles from "./layout.module.css";
import "./globals.css";

import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cartly",
    template: "%s | Cartly",
  },
  description: "A modern e-commerce storefront",
  applicationName: "Cartly",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteHeader />
        <main className={styles.main}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

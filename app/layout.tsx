import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Alex Morris — Full-Stack Developer",
    template: "%s | Alex Morris",
  },
  description:
    "Full-Stack Developer crafting fast, accessible, and beautifully engineered web products. Based in Berlin, open to remote collaboration worldwide.",
  openGraph: {
    title: "Alex Morris — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting fast, accessible, and beautifully engineered web products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Morris — Full-Stack Developer",
    description:
      "Full-Stack Developer crafting fast, accessible, and beautifully engineered web products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
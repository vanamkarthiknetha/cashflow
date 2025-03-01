export const dynamic = 'force-dynamic'
import type { Metadata } from "next";
import {Inter,IBM_Plex_Serif} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({
  subsets:["latin"],
  variable: "--font-inter",
});
const IBMPlexSerif = IBM_Plex_Serif({
  subsets:["latin"],
  weight:['400','700'],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "CashFlow",
  description: "CashFlow is a modern banking platform",
  icons:{
    icon:'./icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${IBMPlexSerif.variable} `}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

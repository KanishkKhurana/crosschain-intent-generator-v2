import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import Providers from "../lib/providers";


const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crosschain Intent Generator",
  description: "Generate crosschain intents and bridge funds instantly",
  icons: {
    icon: "/image.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;    
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} font-barlow antialiased dark`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

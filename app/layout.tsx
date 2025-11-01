import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MusicPlayer from "@/components/MusicPlayer";
import { Providers } from "@/lib/redux/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Streaming App",
  description: "Stream and listen your favorite music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
          <Header />
          <main>
            {children}
          </main>
          <MusicPlayer />
        </div>
        </Providers>
      </body>
    </html>
  );
}

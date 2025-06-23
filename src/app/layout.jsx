import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Artistly.com",
  description: "Performing Artist Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white/90 min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">{children}</main>
      </body>
    </html>
  );
}

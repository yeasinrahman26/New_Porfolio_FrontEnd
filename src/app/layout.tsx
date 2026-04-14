import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YR-Safa | Full-Stack Developer & Designer",
  description:
    "Full-stack developer specializing in Next.js, React, Node.js, and MongoDB. Building modern web experiences.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-dm antialiased bg-bg text-text">
        <Providers>
          {/* Floating background orbs - decorative only */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent2/15 rounded-full blur-[140px]" />
            <div className="absolute top-[35%] left-[45%] w-[350px] h-[350px] bg-accent3/10 rounded-full blur-[130px]" />
          </div>

          {/* Main content wrapper */}
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20">
              {/* pt-20 matches your Navbar height (h-20) */}
              {children}
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

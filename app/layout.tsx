import type { Metadata } from "next";
import { Roboto, Yantramanav } from "next/font/google";
import "./globals.css";
import FloatingWidgets from "../components/shared/FloatingWidgets";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const yantramanav = Yantramanav({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-yantramanav",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skill Aura Academy - Empowering Futures Through Quality Education",
  description: "Accredited online courses, university degrees, and professional certifications at Skill Aura Academy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${yantramanav.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <div className="overflow-x-hidden w-full max-w-full flex flex-col flex-1">
          {children}
        </div>
        <FloatingWidgets />
      </body>
    </html>
  );
}

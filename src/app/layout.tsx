import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Factory CRM & Industrial Copilot | Nexus AI",
  description: "Real-time industrial CRM, machine health monitoring, and AI predictive maintenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-on-surface font-body-md min-h-screen`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

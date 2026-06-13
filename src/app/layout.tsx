import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buildfolio Studio",
  description: "Verified Proof of Work Bento Portfolios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        // 🎨 CLERK V6 FINAL STABLE PROPERTY SPECIFICATIONS
        variables: {
          colorPrimary: "#15803d",
          colorBackground: "#16181a",
          colorForeground: "#f4f4f5", // Replaced colorText
          colorInput: "#0f1011",           // Replaced colorInputBackground
          colorInputForeground: "#ffffff", // Replaced colorInputText
        }
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
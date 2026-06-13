import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buildfolio | Where Code Becomes Credibility",
  description: "Automated premium developer portfolio generator designed for Devlynix Buildathon 2.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#15803d", 
          colorBackground: "#16181a", 
          colorText: "#f4f4f5",
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased bg-[#0f1011] text-[#f4f4f5]">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
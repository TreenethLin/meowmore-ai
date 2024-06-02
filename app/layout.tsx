import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Loading from "./loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meowmore Fortune Teller",
  description: "Meowmore Fortune Teller"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />} />
        {children}
      </body>
    </html>
  );
}

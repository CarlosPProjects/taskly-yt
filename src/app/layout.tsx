import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";

const inter = Inter({
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: "Convex AI",
  description: "Convex AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}

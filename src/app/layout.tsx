import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import { Toaster } from "@/components/ui/toaster";

const poppins: NextFont = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#5D8736",
  maximumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Vimedika App",
  description: "System Point of Sales Pharmacy",
  generator: "Next.js",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/vimedika-128.png" },
    { rel: "icon", url: "/icons/vimedika-128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.className} antialiased overflow-hidden`}
        suppressHydrationWarning
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}

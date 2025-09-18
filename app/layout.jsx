import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import RightMenu from "@/Components/RightMenu/RightMenu";
import Banner from "@/Components/Banner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tokano",
  description: "Tokano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark`}
      >
        {/* vercel analitics */}
        <Analytics />
        <Navbar />
        <Banner src={"banner1.png"} />

        <div className="flex">
          <div className="w-full">{children}</div>
          <div className="pr-4 py-18 md:py-6 text-light absolute right-0 w-1/3 2xl:w-6/19">
            <RightMenu />
          </div>
        </div>
      </body>
    </html>
  );
}

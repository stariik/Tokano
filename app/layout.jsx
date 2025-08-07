import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import RightMenu from "@/Components/RightMenu/RightMenu";
import Banner from "@/Components/Banner";
import Live from "@/Components/Live/Live";
import PlatrformStats from "@/Components/PlatformStats/PlatrformStats";

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
        <Navbar />
        <Banner src={"banner1.png"} />

        <div className="grid grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">{children}</div>
          <div className="pr-4 py-18 md:py-6 text-light">
            <RightMenu />
          </div>
        </div>
      </body>
    </html>
  );
}

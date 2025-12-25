import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import RightMenu from "@/Components/RightMenu/RightMenu";
import Banner from "@/Components/Banner";
import Footer from "@/Components/Footer";
import { Analytics } from "@vercel/analytics/next";
import LayoutProviders from "@/Components/shared/layout-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
});

export const metadata = {
  title: "Tokano",
  description: "Tokano",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="font-khand"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  let resolvedTheme = theme;

                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }

                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark dark:text-light font-khand flex min-h-screen flex-col bg-[#f5f5f5] text-black antialiased`}
      >
        <LayoutProviders>
          <Analytics />
          <Navbar />
          <Banner src={"banner1.png"} />

          <div className="relative grow pt-16 lg:pt-0">
            <div className="">{children}</div>
            {/* <div className="dark:text-light absolute top-0 right-0 w-1/3 py-18 pr-4 text-black md:py-6 2xl:w-6/19">
              <RightMenu />
            </div> */}
          </div>
          <Footer />
        </LayoutProviders>
      </body>
    </html>
  );
}

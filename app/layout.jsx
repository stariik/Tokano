import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import RightMenu from "@/Components/RightMenu/RightMenu";
import Banner from "@/Components/Banner";
import { Analytics } from "@vercel/analytics/next";
import LayoutProviders from "@/Components/shared/layout-providers";

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
    <html
      lang="en"
      suppressHydrationWarning
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
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark dark:text-light bg-white text-black antialiased`}
      >
        <LayoutProviders>
          <Analytics />
          <Navbar />
          <Banner src={"banner1.png"} />

          <div className="relative">
            <div className="">{children}</div>
            <div className="dark:text-light absolute top-0 right-0 w-1/3 py-18 pr-4 text-black md:py-6 2xl:w-6/19">
              <RightMenu />
            </div>
          </div>
        </LayoutProviders>
      </body>
    </html>
  );
}

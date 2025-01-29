import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sora } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sora = Sora ({
  subsets: ["latin"],
  variable: "--font-sora-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Fundhivecorps.com",
  description: "Empowering your financial growth with smart tools, expert insights——invest with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" >
      <body
         className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      >
      <Providers>
        {children}
      </Providers>
       <script defer src="https://app.fastbots.ai/embed.js" data-bot-id="cm3suitcw0eaosvbm7id1fvcr"></script>
   
      </body>
    </html>
  );
}

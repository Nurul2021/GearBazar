/**
 * Root Layout
 * Main application layout with providers
 */

import "@/styles/globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import RegistrationBanner from "../components/RegistrationBanner";
import Footer from "../components/Footer";

export const metadata = {
  title: "GearBazar - Auto Parts Marketplace",
  description: "Your trusted source for auto parts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <RegistrationBanner />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

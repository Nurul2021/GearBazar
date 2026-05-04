/**
 * Root Layout
 * Main application layout with providers
 */

import "@/styles/globals.css";
import { Providers } from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

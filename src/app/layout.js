import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

// Подключаем шрифты
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "The Food Company",
  description: "Mit - Your favorite fast food service!",
  icons: {
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Mit",
    description: "Your favorite fast food service!",
    url: "https://www.mit-foodcompany.uz", // Используй www
    siteName: "Mit Food Company",
    images: [
      {
        url: "https://www.mit-foodcompany.uz/og-image-new.jpg", // Укажи www
        width: 1200,
        height: 630,
        alt: "Mit+1 Food Company Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mit",
    description: "Your favorite fast food service!",
    images: ["https://www.mit-foodcompany.uz/og-image-new.jpg"],
  },
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${roboto.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
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
  title: "Mit Food Company",
  description: "Mit Food Company - Your favorite food delivery service",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Mit Food Company",
    description: "Mit Food Company - Your favorite food delivery service in Uzbekistan",
    url: "https://www.mit-foodcompany.uz", // Используй домен с www
    siteName: "Mit Food Company",
    images: [
      {
        url: "https://www.mit-foodcompany.uz/og-image-new.jpg", // Обнови путь
        width: 1200,
        height: 630,
        alt: "Mit Food Company Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mit Food Company",
    description: "Mit Food Company - Your favorite food delivery service in Uzbekistan",
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
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
    url: "https://mit-foodcompany.uz",
    siteName: "Mit Food Company",
    images: [
      {
        url: "https://mit-foodcompany.uz/og-image.jpg", // Проверь путь
        width: 1200,
        height: 630,
        alt: "Mit Food Company Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
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
// src/app/layout.js
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

// Подключаем Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Подключаем Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Подключаем Roboto
// • Можно добавить веса, которые вам нужны, например 400, 500, 700.
// • Если нужно, чтобы кириллица корректно отображалась, укажите "cyrillic".
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Mit - The food company",
  description: "Mit Food Company - Your favorite food service",
  icons: {
    icon: "/favicon-32x32.png", // Указываем путь к favicon
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

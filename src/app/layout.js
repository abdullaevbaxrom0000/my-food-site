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
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Mit Food Company", // Заголовок для превью
    description: "Mit Food Company - Your favorite food delivery service in Uzbekistan", // Описание для превью
    url: "https://mit-foodcompany.uz", // URL сайта
    siteName: "Mit Food Company", // Название сайта
    images: [
      {
        url: "https://mit-foodcompany.uz/og-image.jpg", // Путь к изображению для превью
        width: 1200, // Рекомендуемый размер для OG-изображений
        height: 630,
        alt: "Mit Food Company Preview Image",
      },
    ],
    locale: "en_US", // Язык (можно изменить, например, на "ru_RU")
    type: "website", // Тип контента
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
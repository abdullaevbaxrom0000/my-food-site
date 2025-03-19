import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import PingComponent from "./components/PingComponent";


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

// Функция для генерации метаданных на основе текущего маршрута
export function generateMetadata({ params }) {
  const path = params?.slug || "";

  // Дефолтные значения (если страница не имеет особых настроек)
  let title = "Mit - Your favorite fast food service!";
  let description = "Visit our web site https://www.mit-foodcompany.uz to enjoy with delicious food and to share with love by donation with Mit!";
  let url = `https://www.mit-foodcompany.uz/${path}`;
  let image = "https://www.mit-foodcompany.uz/og-image-new.jpg";

  // Уникальные превью для разных страниц
  if (path.includes("menu")) {
    title = "Меню | Food Company";
    description = "Ознакомьтесь с нашим вкусным меню – бургеры, роллы, напитки и многое другое!";
    image = "https://www.mit-foodcompany.uz/images/menu-preview.jpg";
  } else if (path.includes("about")) {
    title = "О нас | Food Company";
    description = "Узнайте больше о Mit – современный фастфуд с лучшим сервисом!";
    image = "https://www.mit-foodcompany.uz/images/about-preview.jpg";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Food Company",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

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
         <PingComponent />
        {children}
      </body>
    </html>
  );
}

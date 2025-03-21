import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import PingComponent from "./components/PingComponent";
import Footer from "./components/Footer"; // Импорт Footer если у вас он в components

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

// Метаданные без изменений
export function generateMetadata({ params }) {
  const path = params?.slug || "";
  let title = "Mit - Your favorite fast food service!";
  let description = "Visit our web site https://www.mit-foodcompany.uz to enjoy with delicious food and to share with love by donation with Mit!";
  let url = `https://www.mit-foodcompany.uz/${path}`;
  let image = "https://www.mit-foodcompany.uz/og-image-new.jpg";

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

// ✅ Главное исправление:
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          flex flex-col min-h-screen 
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${roboto.variable} 
          antialiased
          bg-[#FFA424]  
          lg:bg-white 
        `}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }} // Для iPhone
      >
        <PingComponent />

        {/* Контент */}
        <main className="flex-grow bg-white w-full mx-auto p-4 lg:p-0">
          {children}
        </main>

        {/* Футер */}
        <Footer />
      </body>
    </html>
  );
}

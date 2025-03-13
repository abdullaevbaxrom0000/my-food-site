"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const sidebarItems = [
    { label: "Меню", icon: "menu.svg" },
    { label: "Кэшбэк", icon: "cashback.svg" },
    { label: "Mit Coin", icon: "mitcoin.svg" },
    { label: "Входящие", icon: "incoming.svg" },
    { label: "Акции", icon: "promotions.svg" },
    { label: "Донаты", icon: "donate.svg" },
    { label: "Гифт Карты", icon: "gcard.svg" },
    { label: "Мои заказы", icon: "orders.svg" },
    { label: "Фуд пакеты", icon: "orders.svg" },
  ];

  const handleProfilePhotoClick = () => {
    alert("Изменить фото профиля");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Отправляем cookie с запросом
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        console.log("Выход успешен:", data.message);
        router.push("/"); // Перенаправляем на страницу логина
      } else {
        console.error("Ошибка при выходе:", data.message);
        alert("Ошибка при выходе: " + data.message);
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      alert("Ошибка при выходе. Проверьте консоль для деталей.");
    }
  };

  // Опционально можно добавить проверку наличия активной сессии и перенаправление, если пользователь не авторизован.

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Мобильная верхняя панель */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
        <button onClick={handleProfilePhotoClick} className="flex items-center">
          <Image
            src="profile.svg"
            alt="Фото профиля"
            width={40}
            height={40}
            className="rounded-none"
          />
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className="flex">
        {/* Боковая панель для десктопа */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6 shadow-sm h-screen sticky top-0">
          <div className="flex flex-col items-center mb-8">
            <button onClick={handleProfilePhotoClick} className="mb-3 relative group">
              <Image
                src="profile.svg"
                alt="Фото профиля"
                width={80}
                height={80}
                className="transition-transform group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Изменить</span>
              </span>
            </button>
            <span className="font-semibold text-lg text-gray-800">Имя пользователя</span>
            <span className="text-sm text-gray-500">+998 99 1233 45 6</span>
          </div>
          <nav className="flex flex-col space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-3 w-full py-1 bg-[#1333EA] text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
          >
            Выход
          </button>
        </aside>

        {/* Основной контент */}
        <main className="flex-1 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Профиль</h1>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Имя пользователя</h2>
                <p className="text-sm text-gray-500">+998 99 123 45 67 / адрес почты</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Уровень пользователя:</span>
                <span className="text-green-600 font-semibold">Стартер</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Кэшбэк:</span>
                <span className="text-gray-800 font-semibold">5%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Mit Coin:</span>
                <span className="text-gray-800 font-semibold">0</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Для повышения уровня делайте больше заказов и Донатов! Следующий уровень:
                  <span className="text-blue-600 font-medium"> Продвинутый</span> (10% кэшбэк) после 5 заказов.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white z-50 p-4"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <button onClick={handleProfilePhotoClick} className="flex items-center">
                <Image
                  src="profile.svg"
                  alt="Фото профиля"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-3 flex-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image src={item.icon} alt={item.label} width={24} height={24} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="fixed bottom-4 left-4 right-4 py-3 bg-[#1333EA] text-white font-medium rounded-full hover:bg-red-600 transition-colors"
            >
              Выход
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

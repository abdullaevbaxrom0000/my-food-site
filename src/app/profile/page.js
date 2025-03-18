"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCashbackModalOpen, setIsCashbackModalOpen] = useState(false); // Для модального окна
  const [userData, setUserData] = useState({
    name: "Имя пользователя",
    phone: "+998 99 123 45 67",
    email: "адрес почты",
    level: "Стартер",
    cashback: 0, // Динамическая сумма кэшбэка
  });
  const [cashbackHistory, setCashbackHistory] = useState([]); // История кэшбэка
  const [isLoading, setIsLoading] = useState(true);
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


  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      
  
      try {
        const authResponse = await fetch("/api/check-auth", {
          credentials: "include",
          
        });
        const authData = await authResponse.json();
  
        if (!authData.isAuthenticated) { // Изменено на isAuthenticated
          router.push("/login"); // Перенаправляем на логин
          return;
        }
  
        const userResponse = await fetch("/api/user", {
          credentials: "include",
          
        });
        const userDataResponse = await userResponse.json();
  
        if (userDataResponse.success) {
          setUserData({
            name: userDataResponse.username || "Имя пользователя",
            phone: userDataResponse.phone || "+998 99 123 45 67",
            email: userDataResponse.email || "адрес почты",
            level: userDataResponse.level || "Стартер",
            cashback: userDataResponse.total_cashback || 0,
          });
        }
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        router.push("/login"); // Перенаправляем на логин в случае ошибки
      } finally {
        setIsLoading(false);
      }
    };
  
    checkAuthAndFetchData();
  }, [router]);

  const handleProfilePhotoClick = () => {
    alert("Изменить фото профиля");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
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

  // Обработчик для кнопки "Кэшбэк"
  const handleCashbackClick = async () => {
    

    try {
      // Запрос истории кэшбэка
      const response = await fetch("/api/cashback/history", {
        credentials: "include",
        
      });
      const data = await response.json();

      if (data.success) {
        setCashbackHistory(data.history || []);
        setIsCashbackModalOpen(true); // Открываем модальное окно
      } else {
        alert("Ошибка при загрузке истории кэшбэка: " + data.message);
      }
    } catch (err) {
      console.error("Ошибка при загрузке истории кэшбэка:", err);
      alert("Ошибка при загрузке истории кэшбэка.");
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;

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
            <span className="font-semibold text-lg text-gray-800">{userData.name}</span>
            <span className="text-sm text-gray-500">{userData.phone}</span>
          </div>
          <nav className="flex flex-col space-y-2 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  if (item.label === "Меню") router.push("/menu");
                  if (item.label === "Кэшбэк") handleCashbackClick(); // Открываем модальное окно
                }}
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
                <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.phone} / {userData.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Уровень пользователя:</span>
                <span className="text-green-600 font-semibold">{userData.level}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Кэшбэк:</span>
                <span className="text-gray-800 font-semibold">{userData.cashback} UZS</span>
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.label === "Меню") router.push("/menu");
                    if (item.label === "Кэшбэк") handleCashbackClick();
                  }}
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

      {/* Модальное окно для истории кэшбэка */}
      <AnimatePresence>
        {isCashbackModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">История кэшбэка</h2>
                <button
                  onClick={() => setIsCashbackModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
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
              {cashbackHistory.length === 0 ? (
                <p className="text-gray-500">История кэшбэка пуста.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cashbackHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                    >
                      <div>
                        <p className="text-sm text-gray-600">
                          Заказ #{entry.orderId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Сумма: {entry.orderAmount} UZS
                        </p>
                        <p className="text-sm font-semibold text-green-600">
                          +{entry.cashbackAmount} UZS
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
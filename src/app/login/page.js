"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  // Инициализация Telegram Login Widget
  useEffect(() => {
    console.log("Инициализация Telegram Login Widget...");
    // Глобальная функция, вызываемая при успешной авторизации Telegram
    window.onTelegramAuth = (user) => {
      console.log("Telegram Auth Data:", user);
      fetch("https://mit-food-donation.onrender.com/api/telegram-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Авторизация успешна:", data);
            router.push("/profile");
          } else {
            console.error("Ошибка авторизации:", data.message);
            alert("Ошибка авторизации: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Ошибка при авторизации:", error);
          alert("Ошибка при авторизации. Попробуйте снова.");
        });
    };

    // Динамически добавляем Telegram Widget скрипт
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", "MitFooduzBot"); // Убедитесь, что имя бота правильно
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.onload = () => console.log("Telegram Widget скрипт загружен");
    script.onerror = () => console.error("Ошибка загрузки Telegram Widget скрипта");

    const widgetContainer = document.createElement("div");
    widgetContainer.id = "telegram-login";
    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.appendChild(widgetContainer);
      widgetContainer.appendChild(script);
      console.log("Telegram Widget добавлен в DOM");
    } else {
      console.error("Контейнер telegram-login-container не найден");
    }

    // Очистка при размонтировании компонента
    return () => {
      const widget = document.getElementById("telegram-login");
      if (widget) widget.remove();
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#414141] flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-center text-xl font-bold mb-6">Войти</h1>
        <div className="space-y-4">
          {/* Кнопки для социальных логинов */}
          <button className="w-full p-2 border border-gray-300 flex items-center justify-center">
            <Image
              src="/facebook-icon.svg"
              alt="Facebook"
              width={20}
              height={20}
              className="mr-2"
            />
            Продолжить через Facebook
          </button>
          <button className="w-full p-2 border border-gray-300 flex items-center justify-center">
            <Image
              src="/apple-icon.svg"
              alt="Apple"
              width={20}
              height={20}
              className="mr-2"
            />
            Продолжить через Apple
          </button>
          <button className="w-full p-2 border border-gray-300 flex items-center justify-center">
            <Image
              src="/google-icon.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Продолжить через Google
          </button>
          {/* Блок для Telegram Login Widget */}
          <div id="telegram-login-container" className="flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}

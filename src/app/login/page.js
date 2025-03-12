"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("Инициализация Telegram Login Widget...");
    window.onTelegramAuth = (user) => {
      console.log("Telegram Auth Data:", user);
      fetch("https://api.mit-foodcompany.uz/api/telegram-login", {
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

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", "MitFooduzBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.onload = () => console.log("Telegram Widget скрипт загружен");
    script.onerror = () => console.error("Ошибка загрузки Telegram Widget скрипта");

    const widgetContainer = document.createElement("div");
    widgetContainer.id = "telegram-login";
    widgetContainer.className = "w-full border border-gray-300 p-2 flex items-center justify-center";
    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.appendChild(widgetContainer);
      widgetContainer.appendChild(script);
      console.log("Telegram Widget добавлен в DOM");
    } else {
      console.error("Контейнер telegram-login-container не найден");
    }

    return () => {
      const widget = document.getElementById("telegram-login");
      if (widget) widget.remove();
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#414141] flex items-center justify-center">
      {/* Полный экран для мобильных с использованием h-screen */}
      <div className="bg-white w-full h-screen flex items-center justify-center sm:w-[40vw] sm:h-auto sm:rounded-lg sm:shadow-lg sm:mt-[-10vh] p-[5vw]">
        <div className="w-full max-w-[80%] sm:max-w-[90%]">
          <h1 className="text-center text-xl font-bold mb-[5%]">Войти</h1>
          <div className="flex flex-col items-center justify-center space-y-[2vh]">
            {/* Кнопка Facebook */}
            <button className="w-full py-[2%] border border-gray-300 flex items-center justify-center">
              <Image
                src="/facebook-icon.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-[2%]"
              />
              Продолжить через Facebook
            </button>
            {/* Кнопка Apple */}
            <button className="w-full py-[2%] border border-gray-300 flex items-center justify-center">
              <Image
                src="/apple-icon.svg"
                alt="Apple"
                width={20}
                height={20}
                className="mr-[2%]"
              />
              Продолжить через Apple
            </button>
            {/* Кнопка Google */}
            <button className="w-full py-[2%] border border-gray-300 flex items-center justify-center">
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-[2%]"
              />
              Продолжить через Google
            </button>
            {/* Контейнер для Telegram Login Widget */}
            <div id="telegram-login-container" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
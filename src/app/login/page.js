"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  // Функция для обработки Telegram авторизации
  const handleTelegramLogin = () => {
    const botUsername = "MitFooduzBot"; // Заменить на свой бот
    const authUrl = `https://oauth.telegram.org/auth?bot_id=${botUsername}&origin=${window.location.origin}&return_to=${window.location.origin}/api/telegram-callback`;
    
    // Открываем в новом окне
    window.open(authUrl, "_blank", "width=500,height=600");
  };

  // Google Sign-In
  useEffect(() => {
    console.log("Инициализация Google Sign-In...");
    const scriptGoogle = document.createElement("script");
    scriptGoogle.src = "https://accounts.google.com/gsi/client";
    scriptGoogle.async = true;
    scriptGoogle.onload = () => {
      console.log("Google Sign-In скрипт загружен");
      window.google.accounts.id.initialize({
        client_id: "741766418324-0mfil3m2drid8npi1mci0ona4m144mhf.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
        ux_mode: "popup",
        prompt: "select_account",
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    };
    document.body.appendChild(scriptGoogle);

    return () => {
      document.body.removeChild(scriptGoogle);
    };
  }, [router]);

  // Функция обработки Google авторизации
  const handleGoogleSignIn = (response) => {
    console.log("Google Auth Data:", response);
    fetch("/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Google авторизация успешна:", data);
          router.push("/profile");
        } else {
          console.error("Ошибка Google авторизации:", data.message);
          alert("Ошибка авторизации: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Ошибка при Google авторизации:", error);
        alert("Ошибка при авторизации через Google.");
      });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
      <div className="bg-white w-full h-screen flex items-center justify-center sm:w-[40vw] sm:h-auto sm:rounded-lg sm:shadow-lg sm:mt-[-10vh] p-[5vw]">
        <div className="w-full max-w-[80%] sm:max-w-[90%]">
          <h1 className="text-center text-xl font-bold mb-[5%]">Вход в систему</h1>
          <div className="flex flex-col items-center justify-center space-y-[2vh]">
            {/* Кнопка Facebook */}
            <button className="w-full py-[2%] border border-gray-300 flex items-center justify-center text-sm rounded-lg">
              <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} className="mr-[2%]" />
              Войти через Facebook
            </button>
            {/* Кнопка Apple */}
            <button className="w-full py-[2%] border border-gray-300 flex items-center justify-center text-sm rounded-lg">
              <Image src="/apple-icon.svg" alt="Apple" width={20} height={20} className="mr-[2%]" />
              Войти через Apple
            </button>
            {/* Кнопка Google */}
            <div className="w-full flex justify-center">
              <div id="google-signin-button"></div>
            </div>
            {/* Кастомная кнопка Telegram */}
            <button
              onClick={handleTelegramLogin}
              className="w-full py-[2%] bg-blue-500 text-white font-bold flex items-center justify-center rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              <Image src="/telegram-icon.svg" alt="Telegram" width={20} height={20} className="mr-[2%]" />
              Войти через Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState("email"); // "email" или "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Валидация номера телефона (простой пример)
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  // Отправка SMS-кода (заглушка)
  const handleSendCode = async () => {
    if (!validatePhone(phone)) {
      setError("Пожалуйста, введите корректный номер телефона");
      return;
    }

    setError("");
    try {
      console.log("Отправка SMS-кода на номер:", phone);
      setIsCodeSent(true);
    } catch (err) {
      setError("Ошибка при отправке SMS-кода. Попробуйте снова.");
    }
  };

  // Обработка входа
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loginMethod === "email") {
      if (!email || !password) {
        setError("Пожалуйста, заполните все поля");
        return;
      }

      try {
        console.log("Вход через email:", { email, password });
        router.push("/profile");
      } catch (err) {
        setError("Ошибка при входе. Проверьте данные и попробуйте снова.");
      }
    } else {
      if (!phone || !smsCode) {
        setError("Пожалуйста, введите номер телефона и SMS-код");
        return;
      }

      try {
        console.log("Вход через телефон:", { phone, smsCode });
        router.push("/profile");
      } catch (err) {
        setError("Ошибка при проверке SMS-кода. Попробуйте снова.");
      }
    }
  };

  return (
    // Внешний контейнер: на мобильных устройствах не применяем flex-центрирование,
    // чтобы inner-контейнер с h-screen занимал весь экран, а на sm и выше — центрируем.
    <div className="min-h-screen bg-[#414141] sm:flex sm:items-center sm:justify-center">
      {/* Inner-контейнер: на мобильных устройствах занимает весь экран, на больших — авто */}
      <div className="bg-white w-full h-screen sm:h-auto sm:max-w-md sm:rounded-lg sm:shadow-lg p-6">
        {/* Социальные кнопки */}
        <button className="w-full mb-4 p-2 border border-gray-300 flex items-center justify-center">
          <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} className="mr-2" />
          Продолжить через Facebook
        </button>
        <button className="w-full mb-4 p-2 border border-gray-300 flex items-center justify-center">
          <Image src="/apple-icon.svg" alt="Apple" width={20} height={20} className="mr-2" />
          Продолжить через Apple
        </button>
        <button className="w-full mb-4 p-2 border border-gray-300 flex items-center justify-center">
          <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
          Продолжить через Google
        </button>

        {/* Разделитель */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500">или</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Переключатель метода входа */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setLoginMethod("email")}
            className={`px-4 py-2 ${loginMethod === "email" ? "bg-gray-200" : "bg-transparent"} rounded-l-lg`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod("phone")}
            className={`px-4 py-2 ${loginMethod === "phone" ? "bg-gray-200" : "bg-transparent"} rounded-r-lg`}
          >
            Телефон
          </button>
        </div>

        {/* Форма авторизации */}
        <form onSubmit={handleSubmit}>
          {loginMethod === "email" ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Электронная почта</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">Пароль</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Введите номер телефона"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>

              {isCodeSent && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">SMS-код</label>
                  <input
                    type="text"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="Введите SMS-код"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
              )}

              {!isCodeSent && (
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Отправить SMS-код
                </button>
              )}
            </>
          )}

          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          <div className="mb-4 text-sm text-gray-500">Забыли пароль?</div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

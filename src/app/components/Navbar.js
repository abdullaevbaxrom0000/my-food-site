"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState("Ру");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Добавлено для проверки авторизации
  const router = useRouter();
  const langRef = useRef(null);

  const [hoverDirection, setHoverDirection] = useState({});
  const [isHovered, setIsHovered] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [spotlightVisible, setSpotlightVisible] = useState(false);
  const [isLangDropdownVisible, setIsLangDropdownVisible] = useState(false);

  // Проверка кликов вне выпадающего меню языка
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langRef]);

  // Проверка статуса авторизации при загрузке
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/check-auth", {
          method: "GET",
          credentials: "include", // Отправляем куки с запросом
        });
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const navItems = [
    { label: "Меню", href: "/menu" },
    { label: "Главная", href: "/" },
    { label: "УТП", href: "/utp" },
    { label: "Стратегия", href: "/strategy" },
    { label: "Миссия", href: "/mission" },
    { label: "Материалы", href: "/materials" },
    { label: "Язык", href: "#" },
  ];

  const handleMouseEnter = (label, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const direction = x < rect.width / 2 ? "left" : "right";
    setHoverDirection((prev) => ({ ...prev, [label]: direction }));
    setIsHovered((prev) => ({ ...prev, [label]: true }));
  };

  const handleMouseLeave = (label) => {
    setIsHovered((prev) => ({ ...prev, [label]: false }));
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => router.push("/login"), 500);
  };

  const handleProfile = () => {
    router.push("/profile"); // Переход на страницу профиля
  };

  const handleNavMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });
    setSpotlightVisible(true);
  };

  const handleNavMouseLeave = () => {
    setSpotlightVisible(false);
  };

  const handleLangChange = (lang, shortLang) => {
    setCurrentLang(shortLang);
    setIsLangDropdownVisible(false);
  };

  const desktopVariants = {
    initial: { y: "-100%" },
    animate: { y: 0 },
  };

  const desktopDropdownVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="fixed top-0 left-0 w-screen bg-white text-black z-[100] overflow-visible border-b border-gray-300">
      <motion.div
        className="flex items-center px-4 sm:px-10 h-[80px] sm:h-[100px] relative"
        variants={desktopVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={handleNavMouseMove}
        onMouseLeave={handleNavMouseLeave}
      >
        <AnimatePresence>
          {spotlightVisible && (
            <motion.div
              key="spotlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden sm:block"
              style={{
                position: "absolute",
                left: spotlightPos.x - 100,
                top: spotlightPos.y - 100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Мобильный логотип вместо текста "Mit" */}
          <div
            className="w-[79px] h-[75px] flex justify-center items-center sm:hidden"
            style={{ zIndex: 20 }}
          >
            <Image src="/logo1.svg" alt="Логотип" width={60} height={60} />
          </div>

          {/* Логотип и текст "Концепция" для десктопа */}
          <div className="hidden sm:flex items-center absolute left-1/2 transform -translate-x-1/2 sm:static sm:transform-none">
            <Image
              src="/logo2bar.svg"
              alt="Логотип"
              width={50}
              height={50}
              className="mr-4"
            />
            <div className="text-[12px] sm:text-[40px] font-semibold font-['Roboto'] tracking-wider"></div>
          </div>

          {/* Кнопка "гамбургер" для мобильных */}
          <button
            className="sm:hidden relative z-10 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Десктопное меню */}
        <div className="hidden sm:flex items-center space-x-1 ml-auto relative z-10">
          {navItems.map((item) =>
            item.label === "Язык" ? (
              <div key={item.label} ref={langRef} className="relative flex items-center">
                <button
                  onClick={() => setIsLangDropdownVisible(!isLangDropdownVisible)}
                  onMouseEnter={(e) => handleMouseEnter(item.label, e)}
                  onMouseLeave={() => handleMouseLeave(item.label)}
                  className="px-4 py-2 bg-transparent text-sm font-normal font-['Roboto'] flex items-center"
                >
                  {item.label}
                  <Image
                    src="/language_icon.svg"
                    alt="Иконка языка"
                    width={12}
                    height={12}
                    className="ml-2"
                  />
                  <span className="ml-1 text-xs font-medium text-gray-500">
                    {currentLang}
                  </span>
                </button>
                <AnimatePresence>
                  {isLangDropdownVisible && (
                    <motion.div
                      key="langDropdown"
                      variants={desktopDropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-20"
                    >
                      <ul className="py-2">
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                            onClick={() => handleLangChange("Русский", "Ру")}
                          >
                            Русский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                            onClick={() => handleLangChange("Английский", "En")}
                          >
                            Английский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                            onClick={() => handleLangChange("Узбекский", "Uz")}
                          >
                            Узбекский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                            onClick={() => handleLangChange("Турецкий", "Tr")}
                          >
                            Турецкий
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div key={item.label} className="relative flex items-center">
                <button
                  onMouseEnter={(e) => handleMouseEnter(item.label, e)}
                  onMouseLeave={() => handleMouseLeave(item.label)}
                  onClick={() => router.push(item.href)}
                  className="px-4 py-2 bg-transparent text-sm font-normal font-['Roboto'] relative"
                >
                  {item.label}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isHovered[item.label] ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      left: 0,
                      width: "100%",
                      height: "3px",
                      borderRadius: "20px",
                      background: "linear-gradient(to right, rgb(255, 164, 36), rgb(254, 220, 124))",
                      transformOrigin:
                        hoverDirection[item.label] === "left" ? "left" : "right",
                    }}
                  />
                </button>
              </div>
            )
          )}
          {!loading ? (
            <button
              onClick={isAuthenticated ? handleProfile : handleLogin} // Условный обработчик
              className="px-4 py-2 text-sm font-normal font-['Roboto'] bg-transparent relative z-10"
            >
              {isAuthenticated ? "Личный кабинет" : "Войти"}
            </button>
          ) : (
            <p className="mx-4 text-sm font-medium text-gray-700 relative z-10">
              Загрузка...
            </p>
          )}
        </div>
      </motion.div>

      {/* Мобильное меню на полный экран */}
      {isMobileMenuOpen && (
        <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-gradient-to-b from-[#FFA424] to-[#FEDC7C] shadow-lg z-20 sm:hidden overflow-y-auto">
          <div className="flex flex-col items-start space-y-4 p-4 pl-7">
            {navItems.map((item) =>
              item.label === "Язык" ? (
                <div key={item.label} ref={langRef} className="relative flex items-center">
                  <button
                    onClick={() => setIsLangDropdownVisible(!isLangDropdownVisible)}
                    className="px-2 py-2 bg-transparent text-xs font-normal font-['Roboto'] flex items-center"
                  >
                    {item.label}
                    <Image
                      src="/language_icon.svg"
                      alt="Иконка языка"
                      width={12}
                      height={12}
                      className="ml-1"
                    />
                    <span className="ml-1 text-xs font-medium text-gray-500">
                      {currentLang}
                    </span>
                  </button>
                  {isLangDropdownVisible && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-20 w-full">
                      <ul className="py-2">
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
                            onClick={() => handleLangChange("Русский", "Ру")}
                          >
                            Русский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
                            onClick={() => handleLangChange("Английский", "En")}
                          >
                            Английский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
                            onClick={() => handleLangChange("Узбекский", "Uz")}
                          >
                            Узбекский
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-xs"
                            onClick={() => handleLangChange("Турецкий", "Tr")}
                          >
                            Турецкий
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="px-2 py-2 bg-transparent text-sm font-normal font-['Roboto']"
                >
                  {item.label}
                </button>
              )
            )}
            {!loading ? (
              <button
                onClick={isAuthenticated ? handleProfile : handleLogin} // Условный обработчик
                className="px-2 py-2 text-xs font-normal font-['Roboto'] bg-transparent"
              >
                {isAuthenticated ? "Личный кабинет" : "Войти"} 
              </button>
            ) : (
              <p className="mx-4 text-xs font-medium text-gray-700">Загрузка...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
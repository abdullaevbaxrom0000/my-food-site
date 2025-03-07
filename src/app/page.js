"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [isBannerVisible, setIsBannerVisible] = useState(true); // Оставлю переменную, но она не используется
  const [showMit, setShowMit] = useState(false); // Для управления появлением "Mit"
  const [showFoodCompany, setShowFoodCompany] = useState(false); // Для управления появлением "The Food Company"

  useEffect(() => {
    // Показываем "Mit" сразу
    setShowMit(true);
    // Показываем "The Food Company" после завершения анимации "Mit"
    const timer = setTimeout(() => {
      setShowFoodCompany(true);
    }, 1500); // Задержка в 1.5 секунды после начала анимации "Mit"
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 10) {
            clearInterval(interval);
            setTimeout(() => router.push("/page2"), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loading, router]);

  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [spotlightVisible, setSpotlightVisible] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });
    setSpotlightVisible(true);
  };

  const handleMouseLeave = () => {
    setSpotlightVisible(false);
  };

  useEffect(() => {
    let timeout;
    const animateBanner = () => {
      setIsBannerVisible(true);
      timeout = setTimeout(() => {
        setIsBannerVisible(false);
        setTimeout(() => animateBanner(), 2000);
      }, 5000);
    };
    animateBanner();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-screen min-h-screen font-['Roboto'] overflow-y-auto">
      <Navbar />

      <div className="relative w-full min-h-screen flex flex-col items-center justify-center pt-[80px] sm:pt-[100px] pb-10">
        {/* Фоновая SVG */}
        <div className="absolute top-0 left-0 w-full -z-10">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1440 884"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto max-h-[400px] sm:max-h-[650px]"
          >
            <rect width="1442" height="650" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Контейнер для текста с относительным позиционированием */}
        <div className="relative w-full">
          {/* Текст "Mit" на верхней строке */}
          <AnimatePresence>
            {showMit && (
              <motion.div
                initial={{ x: "20%", opacity: 0 }} // Начало с правой стороны строки
                animate={{ x: "4%", opacity: 1 }} // Движение влево до позиции с отступом
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative top-1/4 text-[80px] sm:text-[100px] font-bold text-gray-800 ml-4"
              >
                Mit
              </motion.div>
            )}
          </AnimatePresence>

          {/* Текст "The Food Company" на нижней строке */}
          <AnimatePresence>
            {showFoodCompany && (
              <motion.div
                initial={{ x: "20%", opacity: 0 }} // Начало с правой стороны строки
                animate={{ x: "4%", opacity: 1 }} // Движение влево до позиции с отступом
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative top-1/2 text-[80px] sm:text-[100px] font-bold text-gray-800 ml-4"
              >
                The Food Company
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="relative w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {spotlightVisible && (
              <motion.div
                key="spotlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  left: spotlightPos.x - 50,
                  top: spotlightPos.y - 50,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(253,200,1,0.5) 0%, transparent 0%)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
                className="hidden sm:block" // Отключаем на мобильных
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
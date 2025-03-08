"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Компонент CategoryNav
function CategoryNav({ categories }) {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const navRef = useRef(null);

  const determineActiveCategory = () => {
    let candidate = "";
    categories.forEach((category) => {
      const header = document.getElementById(category.id);
      if (header) {
        const container = header.nextElementSibling;
        if (container) {
          const sectionTop = header.getBoundingClientRect().top;
          const sectionBottom = container.getBoundingClientRect().bottom;
          if (sectionTop <= 150 && sectionBottom >= 150) {
            candidate = category.id;
          }
        }
      }
    });
    if (!candidate) {
      let bestId = "";
      let bestDistance = Infinity;
      categories.forEach((category) => {
        const header = document.getElementById(category.id);
        if (header) {
          const container = header.nextElementSibling;
          if (container) {
            const sectionTop = header.getBoundingClientRect().top;
            const sectionBottom = container.getBoundingClientRect().bottom;
            const sectionCenter = (sectionTop + sectionBottom) / 2;
            const distance = Math.abs(sectionCenter - 150);
            if (distance < bestDistance) {
              bestDistance = distance;
              bestId = category.id;
            }
          }
        }
      });
      candidate = bestId;
    }
    setActiveCategory(candidate);
  };

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);
      determineActiveCategory();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categories]);

  useEffect(() => {
    if (navRef.current && activeCategory) {
      const activeElement = navRef.current.querySelector(
        `[href="#${activeCategory}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  }, [activeCategory]);

  return (
    <motion.div
      ref={navRef}
      className="fixed top-[5rem] left-0 w-full bg-white shadow py-2 px-1 h-[2.5rem] z-40 rounded-b-[0.375rem] flex items-center justify-center sm:top-[6.25rem] sm:py-3 sm:px-2 sm:h-[3rem]"
      initial={{ y: "-100%" }}
      animate={{ y: visible ? 0 : "-100%", x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide max-w-[100%] mx-auto touch-pan-x sm:space-x-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative inline-flex items-center flex-shrink-0"
          >
            <a
              href={`#${category.id}`}
              className="w-[6.25rem] inline-flex items-center justify-center text-[0.75rem] font-normal py-1 transition-all text-center relative flex-shrink-0 sm:w-[7.5rem] sm:text-[0.875rem] sm:py-2"
              style={{ color: "#000000" }}
            >
              {activeCategory === category.id && (
                <motion.div
                  layout
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#FCE17E" }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10">
                {category.title.toLowerCase()}
              </span>
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Menu() {
  // Основной стейт для корзины:
  const [orderItems, setOrderItems] = useState([]);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Список категорий:
  const categories = [
    {
      title: 'Бургеры "Кат"',
      id: "burgers",
      items: [
        {
          name: "Кат Бургер",
          price: "30 000 сум",
          img: "/b1.svg",
          description: "Сочный бургер с котлетой и свежими овощами.",
        },
        {
          name: "Спайси Кат",
          price: "28 000 сум",
          img: "/load.svg",
          description: "Острый бургер с пикантным соусом и специями.",
        },
        {
          name: "Двойной Кат",
          price: "30 500 сум",
          img: "/load.svg",
          description:
            "Бургер с двойной котлетой и сыром для любителей сытной еды.",
        },
        {
          name: "Гриль Кат",
          price: "34 000 сум",
          img: "/load.svg",
          description: "Бургер с копчёным вкусом и особым соусом.",
        },
        {
          name: "Сырный Кат",
          price: "31 500 сум",
          img: "/load.svg",
          description: "Нежный бургер с расплавленным сыром и свежими овощами.",
        },
        {
          name: "Зелёный Кат",
          price: "30 200 сум",
          img: "/load.svg",
          description: "Лёгкий бургер с зеленью и лёгким соусом.",
        },
      ],
    },
    {
      title: "Стики",
      id: "sticks",
      items: [
        {
          name: "Стик",
          price: "25 000 сум",
          img: "/Стик.svg",
          description: "Хрустящий стик с сырной начинкой.",
        },
        {
          name: "Чиз Стик",
          price: "35 000 сум",
          img: "/Чиз Стик.svg",
          description: "Сытный стик с двойной сырной начинкой.",
        },
        {
          name: "Пряный Стик",
          price: "28 500 сум",
          img: "/burger5.svg",
          description: "Стик с острыми специями и хрустящей корочкой.",
        },
        {
          name: "Делюкс Стик",
          price: "36 000 сум",
          img: "/burger5.svg",
          description: "Улучшенный стик с начинкой из сыра и овощей.",
        },
      ],
    },
    {
      title: "Комбо",
      id: "combos",
      items: [
        {
          name: "Комбо-Full",
          price: "25 000 сум",
          img: "/load.svg",
          description: "Хрустящий стик с сырной начинкой.",
        },
        {
          name: "Комбо-45",
          price: "35 000 сум",
          img: "/load.svg",
          description: "Сытный стик с двойной сырной начинкой.",
        },
        {
          name: "Стик Комбо",
          price: "28 500 сум",
          img: "/load.svg",
          description: "Стик с острыми специями и хрустящей корочкой.",
        },
        {
          name: "Комбо де-фри",
          price: "36 000 сум",
          img: "/combodefri.svg",
          description: "Улучшенный стик с начинкой из сыра и овощей.",
        },
      ],
    },
    {
      title: "Пиццы",
      id: "pizzas",
      items: [
        {
          name: "Пицца",
          price: "27 000 сум",
          img: "/pizza.svg",
          description: "Классическая пицца с томатами и сыром.",
        },
        {
          name: "Кусковая Пицца",
          price: "29 000 сум",
          img: "/ppizza.svg",
          description: "Порционная пицца с мясом и сыром.",
        },
        {
          name: "Пицца Маргарита",
          price: "27 800 сум",
          img: "/spizza.svg",
          description: "Нежная пицца с базиликом и свежим соусом.",
        },
        {
          name: "Веган Пицца",
          price: "31 500 сум",
          img: "/spizza.svg",
          description: "Свежее vegetarian предложение с овощами.",
        },
      ],
    },
    {
      title: "Ролы",
      id: "rolls",
      items: [
        {
          name: "Туни Ролл",
          price: "31 000 сум",
          img: "/load.svg",
          description: "Ролл с тунцом и авокадо.",
        },
        {
          name: "Лосось Ролл",
          price: "29 500 сум",
          img: "/load.svg",
          description: "Нежный ролл с лососем и крем-сыром.",
        },
        {
          name: "Креветка Ролл",
          price: "27 800 сум",
          img: "/load.svg",
          description: "Ролл с креветками и соусом терияки.",
        },
        {
          name: "Икра Ролл",
          price: "31 500 сум",
          img: "/load.svg",
          description: "Эксклюзивный ролл с икрой и свежими овощами.",
        },
        {
          name: "Огурец Ролл",
          price: "27 800 сум",
          img: "/load.svg",
          description: "Лёгкий ролл с огурцом и рисом.",
        },
        {
          name: "Спайси Ролл",
          price: "31 500 сум",
          img: "/load.svg",
          description: "Ролл с острым соусом и лососем.",
        },
      ],
    },
    {
      title: "Допы",
      id: "extras",
      items: [
        {
          name: "Фри",
          price: "26 000 сум",
          img: "/Фри.svg",
          description: "Хрустящий картофель фри.",
        },
        {
          name: "Суп",
          price: "33 000 сум",
          img: "/Суп.svg",
          description: "Питательный суп дня с овощами.",
        },
        {
          name: "Сырные палочки",
          price: "27 800 сум",
          img: "/load.svg",
          description: "Новая закуска с растопленным сыром.",
        },
        {
          name: "Луковые кольца",
          price: "31 500 сум",
          img: "/load.svg",
          description: "Свежее дополнение с хрустящей корочкой.",
        },
        {
          name: "Чесночный хлеб",
          price: "27 800 сум",
          img: "/load.svg",
          description: "Хрустящий гарнир с чесночным соусом.",
        },
        {
          name: "Овощной микс",
          price: "31 500 сум",
          img: "/load.svg",
          description: "Новинка с запечёнными овощами.",
        },
      ],
    },
    {
      title: "Напитки",
      id: "drinks",
      items: [
        {
          name: "Кола",
          price: "10 000 сум",
          img: "/coke.svg",
          description: "Классическая газировка.",
        },
        {
          name: "Лимонад",
          price: "12 000 сум",
          img: "/bottle.svg",
          description: "Освежающий лимонад с цитрусовым вкусом.",
        },
        {
          name: "Сок",
          price: "8 000 сум",
          img: "/bottle.svg",
          description: "Натуральный фруктовый сок.",
        },
        {
          name: "Вода",
          price: "5 000 сум",
          img: "/bottle.svg",
          description: "Чистая питьевая вода без газа.",
        },
        {
          name: "Кофе",
          price: "15 000 сум",
          img: "/bottle.svg",
          description: "Ароматный кофе с молоком.",
        },
        {
          name: "Чай",
          price: "7 000 сум",
          img: "/bottle.svg",
          description: "Травяной или чёрный чай на выбор.",
        },
      ],
    },
    {
      title: "Десерты",
      id: "desserts",
      items: [
        {
          name: "Мороженое",
          price: "12 000 сум",
          img: "/desert.svg",
          description: "Сливочное мороженое с ванилью.",
        },
        {
          name: "Пирожное",
          price: "15 000 сум",
          img: "/desert.svg",
          description: "Нежное пирожное с кремом и ягодами.",
        },
        {
          name: "Торт",
          price: "25 000 сум",
          img: "/desert.svg",
          description: "Шоколадный торт на заказ с глазурью.",
        },
      ],
    },
  ];

  // Состояния для «слот-машины»
  const prizes = ["Бесплатный бургер", "Скидка 50%", "Напиток в подарок", "Картофель фри в подарок"];
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotValues, setSlotValues] = useState([0, 0, 0]);
  const [reelStates, setReelStates] = useState([false, false, false]);
  const [prizeResult, setPrizeResult] = useState("");

  const donationStories = [
    { id: 1, img: "heart.svg", count: "x20" },
    { id: 2, img: "spizza.svg", count: "x7" },
    { id: 3, img: "bottle.svg", count: "x10" },
    { id: 4, img: "gam.svg", count: "x3" },
  ];

  // Модальное окно (первое) — детали одной карточки:
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Модалка списка блюд (чекбоксы)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  // Слайдер (SlotMachine / Donations)
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // -----------------------------------
  // Слот-машина — крутить
  // -----------------------------------
  const generateRandomSequence = () => {
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 10));
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrizeResult("");

    const isWin = Math.random() < 0.9;
    const randomNumber = Math.floor(Math.random() * 10);
    const finalValues = isWin
      ? Array(3).fill(randomNumber)
      : Array(3).fill().map(() => Math.floor(Math.random() * 10));

    const animatedValues = finalValues.map(() => generateRandomSequence());
    setSlotValues(animatedValues);

    setReelStates([true, false, false]);
    setTimeout(() => setReelStates([false, true, false]), 1000);
    setTimeout(() => setReelStates([false, false, true]), 2000);

    setTimeout(() => {
      setIsSpinning(false);
      setSlotValues(finalValues.map((value) => [value]));
      setReelStates([false, false, false]);

      if (finalValues.every((value) => value === finalValues[0])) {
        const rand = Math.floor(Math.random() * prizes.length);
        setPrizeResult(prizes[rand]);
      } else {
        setPrizeResult("Ничего не выиграл :(");
      }
    }, 3000);
  };

  // -----------------------------------
  // Логика первого модального окна
  // -----------------------------------
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleSelectItem = () => {
    if (selectedItem) {
      const updatedOrder = [...orderItems];
      const existingItemIndex = updatedOrder.findIndex(
        (i) => i.name === selectedItem.name
      );
      if (existingItemIndex !== -1) {
        updatedOrder[existingItemIndex].quantity += 1;
      } else {
        updatedOrder.push({ ...selectedItem, quantity: 1, fromMenu: false });
      }
      setOrderItems(updatedOrder);
    }
    setIsModalOpen(false);
    setIsOrderSummaryOpen(true);
  };

  // -----------------------------------
  // Модалка с чекбоксами «Меню»
  // -----------------------------------
  const handleMenuItemSelect = (item) => {
    const existingItemIndex = selectedMenuItems.findIndex(
      (selected) => selected.name === item.name
    );
    if (existingItemIndex > -1) {
      // Убираем из списка, если уже выбран
      const updatedItems = selectedMenuItems.filter(
        (selected) => selected.name !== item.name
      );
      setSelectedMenuItems(updatedItems);
    } else {
      // Иначе добавляем с fromMenu: true
      setSelectedMenuItems([...selectedMenuItems, { ...item, fromMenu: true }]);
    }
  };

  // При нажатии «Оплатить» в «меню» добавляем выбранное в корзину
  const handleMenuPay = () => {
    if (selectedMenuItems.length > 0) {
      const updatedOrder = [...orderItems];
      selectedMenuItems.forEach((newItem) => {
        const existingItemIndex = updatedOrder.findIndex(
          (i) => i.name === newItem.name
        );
        if (existingItemIndex !== -1) {
          // Если элемент уже есть, увеличиваем количество
          updatedOrder[existingItemIndex].quantity += newItem.quantity || 1;
        } else {
          // Если элемента нет, добавляем новый с fromMenu: true
          updatedOrder.push({ ...newItem, quantity: newItem.quantity || 1 });
        }
      });

      setOrderItems(updatedOrder);
      setIsOrderSummaryOpen(true);
      setIsMenuModalOpen(false);
      setSelectedMenuItems([]);
    }
  };

  // -----------------------------------
  // Свайпы по слайдеру
  // -----------------------------------
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartY === null && touchStartX === null) return;
    const touchMoveY = e.touches[0].clientY;
    const touchMoveX = e.touches[0].clientX;
    const deltaY = touchMoveY - touchStartY;
    const deltaX = touchMoveX - touchStartX;

    // Свайп вниз (закрываем окно)
    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 0) {
        if (isModalOpen) closeModal();
      }
      setTouchStartY(null);
      setTouchStartX(null);
    }
    // Горизонтальный свайп — переключение слайдов
    else if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && currentSlide === 1) {
        setCurrentSlide(0);
      } else if (deltaX < 0 && currentSlide === 0) {
        setCurrentSlide(1);
      }
      setTouchStartX(null);
      setTouchStartY(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
    setTouchStartX(null);
  };

  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (touchStartX === null) return;
    const mouseMoveX = e.clientX;
    const deltaX = mouseMoveX - touchStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && currentSlide === 1) {
        setCurrentSlide(0);
      } else if (deltaX < 0 && currentSlide === 0) {
        setCurrentSlide(1);
      }
      setTouchStartX(null);
    }
  };

  const handleMouseUp = () => {
    setTouchStartX(null);
  };

  // -----------------------------------
  // Иконка «сердце +», открывает ОДНО и то же окно (меню)
  // -----------------------------------
  const handleHeartPlusClick = () => {
    setIsMenuModalOpen(true);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsStoriesOpen(true);
  };

  // -----------------------------------
  // Скрывать прокрутку body при открытых модалках
  // -----------------------------------

  useEffect(() => {
    if (isStoriesOpen) {
      const timer = setTimeout(() => {
        setIsStoriesOpen(false);
        setSelectedStory(null);
      }, 5000); // 5 секунд
      return () => clearTimeout(timer);
    }
  }, [isStoriesOpen]);


  useEffect(() => {
    if (isModalOpen || isOrderSummaryOpen || isMenuModalOpen || isStoriesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isOrderSummaryOpen, isMenuModalOpen, isStoriesOpen]);

  

  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <CategoryNav categories={categories} />

      <div className="flex flex-col items-start justify-center pt-[10rem] space-y-0 mb-[4rem] px-[2vw] sm:pt-[12rem] sm:space-y-[2rem] sm:mb-[6rem]">
        {/* Слайдер с Slot Machine и Donations */}
        <div className="w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              ref={sliderRef}
              className="flex w-full"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Первый слайд: Слот-машина */}
              <div className="w-full flex-shrink-0 flex flex-col items-center justify-center">
                <p className="mb-[1rem] text-[1rem] font-semibold text-black text-center sm:mb-[1.5rem] sm:text-[1.25rem]">
                  Нажмите на "Spin" и получите свой комплемент!
                </p>
                <div className="flex flex-col items-center w-full">
                  <div className="flex justify-center items-center space-x-[0.5rem] mb-[1rem] relative sm:space-x-[1rem]">
                    {slotValues.map((values, index) => (
                      <motion.div
                        key={index}
                        className="relative w-[6rem] h-[8.1875rem] bg-gradient-to-b from-[#52d17c] to-[#22918b] rounded-[1rem] flex items-center justify-center text-[6rem] font-normal text-black overflow-hidden border border-black sm:w-[8.1875rem] sm:text-[4rem]"
                        initial={{ scale: 1 }}
                      >
                        <motion.div
                          className="absolute w-full h-full flex flex-col"
                          animate={{
                            y: reelStates[index]
                              ? [
                                  0,
                                  -100 *
                                    (Array.isArray(values)
                                      ? values.length - 1
                                      : 0),
                                  -100 *
                                    (Array.isArray(values)
                                      ? values.length -
                                        1 -
                                        (values.findIndex(
                                          (v) =>
                                            v === values[values.length - 1]
                                        ) || 0)
                                      : 0),
                                ]
                              : 0,
                            transition: {
                              y: {
                                duration: 1,
                                ease: "linear",
                                times: [0, 0.9, 1],
                              },
                            },
                          }}
                        >
                          {Array.isArray(values)
                            ? values.map((value, i) => (
                                <span
                                  key={i}
                                  className="h-[8.1875rem] flex items-center justify-center"
                                >
                                  {value}
                                </span>
                              ))
                            : (
                                <span className="h-[8.1875rem] flex items-center justify-center">
                                  {values}
                                </span>
                              )}
                        </motion.div>
                        {!reelStates[index] && (
                          <motion.div
                            className="absolute inset-0 bg-transparent border-0 border-black rounded-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={handleSpin}
                    className="w-[8rem] h-[2rem] bg-[#EFEEEE] text-black text-[1rem] font-semibold rounded-full hover:bg-opacity-80 transition-all flex items-center justify-center sm:w-[10rem] sm:h-[2.5rem] sm:text-[1.25rem]"
                    disabled={isSpinning}
                  >
                    {isSpinning ? "Крутится..." : "Spin"}
                  </button>

                  {prizeResult && (
                    <p className="mt-[1rem] text-[0.875rem] font-bold text-black sm:mt-[1.5rem] sm:text-[1rem]">
                      Ваш приз: {prizeResult}
                    </p>
                  )}
                  <div className="mb-[2rem] sm:mb-[4rem]" />
                </div>
              </div>

              {/* Второй слайд: Donations */}
              
              <div className="w-full flex-shrink-0 flex flex-col items-center justify-center bg-white">
  <div className="w-full flex flex-col items-center">
    <div className="flex items-center justify-between w-full px-[5%] text-black text-[1.25rem] font-semibold font-['Roboto'] mb-[1rem] sm:mb-[1.5rem]">
      <span>Donations on 28.02.2025</span>
      <button onClick={handleHeartPlusClick} className="ml-4">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.8638 26.1251C28.639 26.1251 28.4511 26.0496 28.3002 25.8986C28.1492 25.7477 28.0738 25.5593 28.0738 25.3334V21.3751H24.1154C23.8895 21.3751 23.7011 21.2996 23.5502 21.1486C23.3992 20.9977 23.3238 20.8093 23.3238 20.5834C23.3238 20.3575 23.3992 20.1691 23.5502 20.0181C23.7011 19.8672 23.8895 19.7917 24.1154 19.7917H28.0738V15.8334C28.0738 15.6086 28.1492 15.4201 28.3002 15.2681C28.4511 15.1161 28.6395 15.0407 28.8654 15.0417C29.0913 15.0428 29.2792 15.1182 29.4291 15.2681C29.579 15.418 29.655 15.6064 29.6571 15.8334V19.7917H33.6154C33.8403 19.7917 34.0281 19.8672 34.1791 20.0181C34.33 20.1691 34.406 20.3575 34.4071 20.5834C34.4081 20.8093 34.3321 20.9977 34.1791 21.1486C34.026 21.2996 33.8381 21.3751 33.6154 21.3751H29.6571V25.3334C29.6571 25.5593 29.5811 25.7477 29.4291 25.8986C29.2771 26.0496 29.0892 26.1251 28.8654 26.1251Z"
            fill="#FFA629"
          />
          <path
            d="M17.4163 30.5061C17.2095 30.5061 17.0073 30.4761 16.8099 30.4159C16.6136 30.3547 16.431 30.2396 16.2621 30.0707C14.0254 28.0208 12.0795 26.2011 10.4243 24.6114C8.76923 23.0217 7.40756 21.5666 6.33934 20.2461C5.27112 18.9256 4.4747 17.6854 3.95009 16.5253C3.42548 15.3653 3.16423 14.1973 3.16634 13.0214C3.16634 11.0074 3.85034 9.31797 5.21834 7.95314C6.58634 6.5883 8.27734 5.90642 10.2913 5.90747C11.6847 5.90747 12.9909 6.26214 14.2101 6.97147C15.4293 7.68081 16.498 8.71525 17.4163 10.0748C18.3347 8.71525 19.4034 7.68081 20.6226 6.97147C21.8428 6.26214 23.1491 5.90747 24.5413 5.90747C26.1637 5.90747 27.5792 6.36242 28.7878 7.27231C29.9965 8.18219 30.8182 9.35281 31.2531 10.7841C31.3608 11.124 31.289 11.4243 31.0378 11.6851C30.7865 11.9458 30.4672 12.0498 30.0798 11.997C29.8529 11.9558 29.6307 11.9252 29.4133 11.9051C29.1958 11.8851 28.9736 11.8751 28.7467 11.8751C26.4223 11.8751 24.4094 12.7179 22.7078 14.4036C21.0073 16.0894 20.1571 18.1493 20.1571 20.5834C20.1571 21.4891 20.2943 22.3604 20.5688 23.1975C20.8443 24.0345 21.2427 24.8114 21.7642 25.5281C21.9531 25.7836 22.0376 26.0818 22.0175 26.4227C21.9975 26.7637 21.8708 27.0487 21.6375 27.2777L18.5706 30.0802C18.4017 30.2491 18.2191 30.3621 18.0228 30.4191C17.8264 30.4761 17.6243 30.5051 17.4163 30.5061Z"
            fill="#414141"
          />
        </svg>
      </button>
    </div>

    {/* Кликабельные карточки */}
    <div className="grid grid-cols-4 gap-[2%] w-full px-[5%] mb-[1rem] sm:mb-[1.5rem]">
      {donationStories.map((story) => (
        <motion.div
          key={story.id}
          className="relative w-full h-[8.1875rem] bg-gradient-to-b from-[#FFA629] to-[#FFA629] rounded-[1rem] flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleStoryClick(story)}
        >
          <img
            className="w-[85%] h-[40%]"
            src={story.img}
            alt="Donation Item"
          />
          <div className="absolute w-[38.37%] h-[12.21%] left-[54.65%] top-[80.15%] text-center text-white text-[0.75rem] font-medium font-['Roboto']">
            {story.count}
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-4 gap-[2%] w-full px-[5%]">
      <div className="text-center text-[#2b2828] text-[0.75rem] font-normal">
        Всего Донаты
      </div>
      <div className="text-center text-[#2b2828] text-[0.75rem] font-normal">
        Пицца
      </div>
      <div className="text-center text-[#2b2828] text-[0.75rem] font-normal">
        Кола
      </div>
      <div className="text-center text-[#2b2828] text-[0.75rem] font-normal">
        Кат бургер
      </div>
    </div>
    <div className="mb-[2rem] sm:mb-[4rem]" />
  </div>
</div>

            </motion.div>

            {/* Точки для переключения слайдов */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === 0 ? "bg-[#414141]" : "bg-gray-300"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === 1 ? "bg-[#414141]" : "bg-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Секция с категориями и карточками */}
        <div className="w-full">
          {categories.map((category, idx) => (
            <div key={idx} className="w-full">
              <h2
                id={category.id}
                className="text-[1.5rem] font-semibold text-black mb-[2rem] scroll-mt-[8rem] sm:text-[1.75rem] sm:mb-[3rem] sm:scroll-mt-[10rem] md:text-[2rem]"
                style={idx === 0 ? { marginTop: "2rem" } : {}}
              >
                {category.title}
              </h2>

              <div className="grid grid-cols-1 gap-[1rem] w-full mx-auto sm:grid-cols-2 sm:gap-[1.5rem] md:grid-cols-3 lg:grid-cols-4 max-w-[90rem] mb-[2rem] sm:mb-[3rem]">
                {category.items.map((item, itemIndex) => {
                  const itemsWithNovinka = [
                    "Кат Бургер",
                    "Спайси Кат",
                    "Стик",
                    "Чиз Стик",
                    "Кусковая Пицца",
                    "Туни Ролл",
                    "Комбо де-фри",
                  ];
                  const hasNovinka = itemsWithNovinka.includes(item.name);

                  return (
                    <motion.div
                      key={itemIndex}
                      className="w-full max-w-[24.375rem] mx-auto cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleCardClick(item)}
                    >
                      <div className="relative w-full h-[19.375rem] sm:h-[20rem] md:h-[21rem]">
                        <div className="absolute w-full h-full left-0 top-0 bg-white border-b border-[#d9d9d9]" />
                        <img
                          className="absolute top-[3%] left-[18%] w-[64%] h-[56%] object-contain sm:h-[58%] md:h-[60%]"
                          src={item.img}
                          alt={item.name}
                        />

                        {hasNovinka && (
                          <div className="absolute w-[22%] h-[12%] top-[22%] right-[78%] text-center text-[#B00A0A] text-[1rem] font-extrabold font-salsa sm:text-[1rem] md:text-[1.125rem]">
                            Novinka
                          </div>
                        )}
                        <div className="absolute top-[63%] left-[18%] w-[65%] h-[1.5625rem] flex justify-center items-center sm:h-[1.75rem] md:h-[2rem]">
                          <span className="text-center text-[#2b2828] text-[1rem] font-semibold font-['Roboto'] truncate sm:text-[1.25rem] md:text-[1.5rem]">
                            {item.name}
                          </span>
                        </div>
                        <div className="absolute top-[75%] left-[34%] w-[32%] h-[1.5625rem] flex justify-center items-center sm:h-[1.5rem] md:h-[2rem]">
                          <span className="text-center text-[#2b2828] text-[0.875rem] font-normal font-['Roboto'] sm:text-[1rem] md:text-[1.125rem]">
                            250гр
                          </span>
                        </div>
                        <div className="absolute top-[87%] left-[34%] w-[32%] h-[1.875rem] bg-gradient-to-r from-[#FCE17E] to-[#FCE17E] rounded-[0.9375rem] flex justify-center items-center sm:h-[2rem] md:h-[2.25rem]">
                          <span className="text-center text-[#2b2828] text-[0.875rem] font-light font-['Roboto'] sm:text-[1rem] md:text-[1.125rem]">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с деталями одной карточки */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="bg-white relative flex flex-col items-center justify-center w-full h-full sm:max-w-lg sm:h-auto sm:p-8 sm:rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-[3%] right-[5%]"
                onClick={closeModal}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.25 15C26.25 8.78906 21.2109 3.75 15 3.75C8.78906 3.75 3.75 8.78906 3.75 15C3.75 21.2109 8.78906 26.25 15 26.25C21.2109 26.25 26.25 21.2109 26.25 15Z"
                    stroke="#414141"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M18.75 18.75L11.25 11.25M11.25 18.75L18.75 11.25"
                    stroke="#414141"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6">
                <img
                  src={selectedItem.img}
                  alt={selectedItem.name}
                  className="w-full max-w-xs h-56 object-contain mb-6 sm:h-72 md:h-80 mx-auto"
                />
                <h3 className="text-xl font-semibold text-[#2b2828] mb-3 text-center sm:text-2xl">
                  {selectedItem.name}
                </h3>
                <p className="text-gray-600 mb-4 text-center sm:text-lg">
                  {selectedItem.description}
                </p>
                <p className="text-[#2b2828] font-light mb-4 text-center sm:text-lg">
                  {selectedItem.price}
                </p>
                <button
                  className="w-full max-w-xs py-3 bg-[#FDC801] text-black font-semibold rounded-full hover:bg-opacity-80 transition-all sm:py-4 sm:text-lg"
                  onClick={handleSelectItem}
                >
                  Выбрать
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[140]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsMenuModalOpen(false)}
          >
            <motion.div
              className="
                bg-white relative w-full h-full
                sm:max-w-2xl sm:h-[80vh]
                rounded-t-1xl sm:rounded-3xl
                flex flex-col
              "
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsMenuModalOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold text-[#2b2828] mb-4 text-center mt-4">
                Меню
              </h2>

              <div className="flex-1 overflow-y-auto px-4 pb-32">
                {categories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h3 className="text-lg font-medium text-[#2b2828] mb-2">
                      {category.title}
                    </h3>
                    {category.items.map((item) => {
                      const selectedEntry = selectedMenuItems.find(
                        (selected) => selected.name === item.name
                      );
                      const itemQuantity = selectedEntry
                        ? selectedEntry.quantity || 1
                        : 1;

                      const handleQuantityChange = (change) => {
                        const newQuantity = Math.max(1, itemQuantity + change);
                        if (selectedEntry) {
                          const updatedItems = selectedMenuItems.map((sel) =>
                            sel.name === item.name
                              ? { ...sel, quantity: newQuantity }
                              : sel
                          );
                          setSelectedMenuItems(updatedItems);
                        } else {
                          setSelectedMenuItems([
                            ...selectedMenuItems,
                            { ...item, quantity: newQuantity, fromMenu: true },
                          ]);
                        }
                      };

                      return (
                        <div
                          key={item.name}
                          className="flex items-center justify-between py-2 border-b border-gray-200"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <input
                              type="checkbox"
                              checked={!!selectedEntry}
                              onChange={() => handleMenuItemSelect(item)}
                              className="w-5 h-5 text-[#FDC801] border-gray-300 rounded focus:ring-[#FDC801]"
                            />
                            <span className="text-[#2b2828]">{item.name}</span>
                          </div>
                          <span className="text-[#2b2828] font-light text-center w-24">
                            {item.price}
                          </span>
                          <div className="flex items-center justify-between w-24 bg-white border border-gray-300 rounded-lg p-1">
                            <button
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => handleQuantityChange(-1)}
                            >
                              <svg
                                width="16"
                                height="4"
                                viewBox="0 0 20 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M0 2H20" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </button>
                            <span className="text-lg font-medium mx-2">
                              {itemQuantity}
                            </span>
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleQuantityChange(1)}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 0V20M0 10H20" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="
                sticky bottom-0
                left-0 w-full
                bg-white p-4
                border-t border-gray-200
              ">
                <button
                  className={`w-full max-w-xs mx-auto block py-3 rounded-full font-semibold transition-all ${
                    selectedMenuItems.length > 0
                      ? "bg-[#28a745] text-white hover:bg-opacity-80"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleMenuPay}
                  disabled={selectedMenuItems.length === 0}
                >
                  Оплатить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно "Ваш заказ" */}
      <AnimatePresence>
        {isOrderSummaryOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[130]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsOrderSummaryOpen(false)}
          >
            <motion.div
              className="bg-white relative w-full h-full sm:max-w-2xl sm:h-[80vh] overflow-y-auto p-6 rounded-t-1xl sm:rounded-3xl"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsOrderSummaryOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-semibold text-[#2b2828] mb-6 text-center">
                Ваш заказ
              </h2>

              <div className="space-y-4">
                {orderItems.length > 0 ? (
                  orderItems.map((item, index) => {
                    const handleQuantityChange = (change) => {
                      const newQuantity = Math.max(1, item.quantity + change);
                      const updatedItems = orderItems.map((i, idx) =>
                        idx === index ? { ...i, quantity: newQuantity } : i
                      );
                      setOrderItems(updatedItems);
                    };

                    const handleRemoveItem = () => {
                      const updatedItems = orderItems.filter(
                        (_, idx) => idx !== index
                      );
                      setOrderItems(updatedItems);
                      if (updatedItems.length === 0) {
                        setIsOrderSummaryOpen(false);
                      }
                    };

                    const itemTotal =
                      parseInt(item.price.replace(/\D/g, "")) * item.quantity;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-200"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <span className="text-[#2b2828] flex items-center">
                            {item.name}
                            {item.fromMenu && (
                              <span className="ml-2">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 38 38"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M28.8638 26.1251C28.639 26.1251 28.4511 26.0496 28.3002 25.8986C28.1492 25.7477 28.0738 25.5593 28.0738 25.3334V21.3751H24.1154C23.8895 21.3751 23.7011 21.2996 23.5502 21.1486C23.3992 20.9977 23.3238 20.8093 23.3238 20.5834C23.3238 20.3575 23.3992 20.1691 23.5502 20.0181C23.7011 19.8672 23.8895 19.7917 24.1154 19.7917H28.0738V15.8334C28.0738 15.6086 28.1492 15.4201 28.3002 15.2681C28.4511 15.1161 28.6395 15.0407 28.8654 15.0417C29.0913 15.0428 29.2792 15.1182 29.4291 15.2681C29.579 15.418 29.655 15.6064 29.6571 15.8334V19.7917H33.6154C33.8403 19.7917 34.0281 19.8672 34.1791 20.0181C34.33 20.1691 34.406 20.3575 34.4071 20.5834C34.4081 20.8093 34.3321 20.9977 34.1791 21.1486C34.026 21.2996 33.8381 21.3751 33.6154 21.3751H29.6571V25.3334C29.6571 25.5593 29.5811 25.7477 29.4291 25.8986C29.2771 26.0496 29.0892 26.1251 28.8654 26.1251Z"
                                    fill="#FF0000"
                                  />
                                  <path
                                    d="M17.4163 30.5061C17.2095 30.5061 17.0073 30.4761 16.8099 30.4159C16.6136 30.3547 16.431 30.2396 16.2621 30.0707C14.0254 28.0208 12.0795 26.2011 10.4243 24.6114C8.76923 23.0217 7.40756 21.5666 6.33934 20.2461C5.27112 18.9256 4.4747 17.6854 3.95009 16.5253C3.42548 15.3653 3.16423 14.1973 3.16634 13.0214C3.16634 11.0074 3.85034 9.31797 5.21834 7.95314C6.58634 6.5883 8.27734 5.90642 10.2913 5.90747C11.6847 5.90747 12.9909 6.26214 14.2101 6.97147C15.4293 7.68081 16.498 8.71525 17.4163 10.0748C18.3347 8.71525 19.4034 7.68081 20.6226 6.97147C21.8428 6.26214 23.1491 5.90747 24.5413 5.90747C26.1637 5.90747 27.5792 6.36242 28.7878 7.27231C29.9965 8.18219 30.8182 9.35281 31.2531 10.7841C31.3608 11.124 31.289 11.4243 31.0378 11.6851C30.7865 11.9458 30.4672 12.0498 30.0798 11.997C29.8529 11.9558 29.6307 11.9252 29.4133 11.9051C29.1958 11.8851 28.9736 11.8751 28.7467 11.8751C26.4223 11.8751 24.4094 12.7179 22.7078 14.4036C21.0073 16.0894 20.1571 18.1493 20.1571 20.5834C20.1571 21.4891 20.2943 22.3604 20.5688 23.1975C20.8443 24.0345 21.2427 24.8114 21.7642 25.5281C21.9531 25.7836 22.0376 26.0818 22.0175 26.4227C21.9975 26.7637 21.8708 27.0487 21.6375 27.2777L18.5706 30.0802C18.4017 30.2491 18.2191 30.3621 18.0228 30.4191C17.8264 30.4761 17.6243 30.5051 17.4163 30.5061Z"
                                    fill="#FF0000"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="text-[#2b2828] font-light text-center w-24">
                          {itemTotal.toLocaleString()} сум
                        </span>
                        <div className="flex items-center justify-between w-24 bg-white border border-gray-300 rounded-lg p-1">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleQuantityChange(-1)}
                          >
                            <svg
                              width="16"
                              height="4"
                              viewBox="0 0 20 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 2H20" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </button>
                          <span className="text-lg font-medium mx-2">
                            {item.quantity}
                          </span>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleQuantityChange(1)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0V20M0 10H20"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          className="ml-4 text-red-500 hover:text-red-700"
                          onClick={handleRemoveItem}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-600">Ваш заказ пуст</p>
                )}
              </div>

              {orderItems.length > 0 && (
                <div className="mt-6">
                  <p className="text-lg font-semibold text-[#2b2828] text-center">
                    Итоговая сумма:{" "}
                    {orderItems
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseInt(item.price.replace(/\D/g, "")) *
                            item.quantity,
                        0
                      )
                      .toLocaleString()}{" "}
                    сум
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <button
                  className="w-1/2 max-w-xs py-3 bg-[#FDC801] text-black font-semibold rounded-full hover:bg-opacity-80 transition-all mr-2"
                  onClick={() => {
                    setIsOrderSummaryOpen(false);
                  }}
                >
                  Меню
                </button>

                <button
                  className="w-1/2 max-w-xs py-3 bg-[#28a745] text-white font-semibold rounded-full hover:bg-opacity-80 transition-all ml-2"
                  onClick={() => {
                    alert(
                      `Ваш заказ на сумму ${orderItems
                        .reduce(
                          (sum, item) =>
                            sum +
                            parseInt(item.price.replace(/\D/g, "")) *
                              item.quantity,
                          0
                        )
                        .toLocaleString()} сум отправлен. (Пример)`
                    );
                    setOrderItems([]);
                    setIsOrderSummaryOpen(false);
                  }}
                  disabled={orderItems.length === 0}
                >
                  Оплатить
                </button>
              </div>

              <div className="mt-4 flex justify-center">
                <button onClick={handleHeartPlusClick} className="flex items-center">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.8638 26.1251C28.639 26.1251 28.4511 26.0496 28.3002 25.8986C28.1492 25.7477 28.0738 25.5593 28.0738 25.3334V21.3751H24.1154C23.8895 21.3751 23.7011 21.2996 23.5502 21.1486C23.3992 20.9977 23.3238 20.8093 23.3238 20.5834C23.3238 20.3575 23.3992 20.1691 23.5502 20.0181C23.7011 19.8672 23.8895 19.7917 24.1154 19.7917H28.0738V15.8334C28.0738 15.6086 28.1492 15.4201 28.3002 15.2681C28.4511 15.1161 28.6395 15.0407 28.8654 15.0417C29.0913 15.0428 29.2792 15.1182 29.4291 15.2681C29.579 15.418 29.655 15.6064 29.6571 15.8334V19.7917H33.6154C33.8403 19.7917 34.0281 19.8672 34.1791 20.0181C34.33 20.1691 34.406 20.3575 34.4071 20.5834C34.4081 20.8093 34.3321 20.9977 34.1791 21.1486C34.026 21.2996 33.8381 21.3751 33.6154 21.3751H29.6571V25.3334C29.6571 25.5593 29.5811 25.7477 29.4291 25.8986C29.2771 26.0496 29.0892 26.1251 28.8654 26.1251Z"
                      fill="#FFA629"
                    />
                    <path
                      d="M17.4163 30.5061C17.2095 30.5061 17.0073 30.4761 16.8099 30.4159C16.6136 30.3547 16.431 30.2396 16.2621 30.0707C14.0254 28.0208 12.0795 26.2011 10.4243 24.6114C8.76923 23.0217 7.40756 21.5666 6.33934 20.2461C5.27112 18.9256 4.4747 17.6854 3.95009 16.5253C3.42548 15.3653 3.16423 14.1973 3.16634 13.0214C3.16634 11.0074 3.85034 9.31797 5.21834 7.95314C6.58634 6.5883 8.27734 5.90642 10.2913 5.90747C11.6847 5.90747 12.9909 6.26214 14.2101 6.97147C15.4293 7.68081 16.498 8.71525 17.4163 10.0748C18.3347 8.71525 19.4034 7.68081 20.6226 6.97147C21.8428 6.26214 23.1491 5.90747 24.5413 5.90747C26.1637 5.90747 27.5792 6.36242 28.7878 7.27231C29.9965 8.18219 30.8182 9.35281 31.2531 10.7841C31.3608 11.124 31.289 11.4243 31.0378 11.6851C30.7865 11.9458 30.4672 12.0498 30.0798 11.997C29.8529 11.9558 29.6307 11.9252 29.4133 11.9051C29.1958 11.8851 28.9736 11.8751 28.7467 11.8751C26.4223 11.8751 24.4094 12.7179 22.7078 14.4036C21.0073 16.0894 20.1571 18.1493 20.1571 20.5834C20.1571 21.4891 20.2943 22.3604 20.5688 23.1975C20.8443 24.0345 21.2427 24.8114 21.7642 25.5281C21.9531 25.7836 22.0376 26.0818 22.0175 26.4227C21.9975 26.7637 21.8708 27.0487 21.6375 27.2777L18.5706 30.0802C18.4017 30.2491 18.2191 30.3621 18.0228 30.4191C17.8264 30.4761 17.6243 30.5051 17.4163 30.5061Z"
                      fill="#414141"
                    />
                  </svg>
                  <span className="ml-2 text-[#2b2828]">Открыть в Donations</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {isStoriesOpen && selectedStory && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[150]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => setIsStoriesOpen(false)}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Прогресс-бар */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

        {/* Крестик для закрытия */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsStoriesOpen(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Изображение */}
        <img
          className="w-full h-full object-contain max-w-[80%] max-h-[80%]"
          src={selectedStory.img}
          alt="Story"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <Footer />
    </div>
  );
}
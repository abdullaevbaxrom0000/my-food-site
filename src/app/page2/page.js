"use client";
import { useRouter } from "next/navigation";

export default function Page2() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-[#FDC801] pt-10 pb-40">

      {/* Список кнопок */}
      <div className="mt-4 w-full max-w-lg space-y-4">
        {[
          "Миссия",
          "УТП",
          "Бренд",
          "Меню",
          "Материалы",
          "Концепт наружной части конструкции",
          "Концепт внутренней части конструкции",
          "Условия масштабирования",
          "Финансовая модель",
          "Формула стратегии",
          "Стратегия выхода в рынок",
        ].map((text, index) => (
          <div
            key={index}
            className="w-full bg-[#FDC801] rounded-[10px] flex items-center justify-center text-neutral-900 text-lg font-medium px-6 py-3 cursor-pointer hover:bg-[#E5B700] transition"
            onClick={() => text === "Миссия" && router.push("/mission")}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Логотип и иконка меню */}
      <div className="w-full flex justify-between items-center px-8 py-4 fixed top-0">
        <div className="text-black text-4xl font-semibold">Mit</div>
        <div>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 1H3C2.47 1 1.96 1.21 1.59 1.59C1.21 1.96 1 2.47 1 3V15C1 15.53 1.21 16.04 1.59 16.41C1.96 16.79 2.47 17 3 17H15C15.53 17 16.04 16.79 16.41 16.41C16.79 16.04 17 15.53 17 15V3C17 2.47 16.79 1.96 16.41 1.59C16.04 1.21 15.53 1 15 1ZM15 25H3C2.47 25 1.96 25.21 1.59 25.59C1.21 25.96 1 26.47 1 27V39C1 39.53 1.21 40.04 1.59 40.41C1.96 40.79 2.47 41 3 41H15C15.53 41 16.04 40.79 16.41 40.41C16.79 40.04 17 39.53 17 39V27C17 26.47 16.79 25.96 16.41 25.59C16.04 25.21 15.53 25 15 25ZM39 1H27C26.47 1 25.96 1.21 25.59 1.59C25.21 1.96 25 2.47 25 3V15C25 15.53 25.21 16.04 25.59 16.41C25.96 16.79 26.47 17 27 17H39C39.53 17 40.04 16.79 40.41 16.41C40.79 16.04 41 15.53 41 15V3C41 2.47 40.79 1.96 40.41 1.59C40.04 1.21 39.53 1 39 1Z"
              fill="black"
              stroke="black"
              strokeLinejoin="round"
            />
            <path d="M25 25H41M33 33H41M25 41H41" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}








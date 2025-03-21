import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Четыре колонки с текстом */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* О нас */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-['Roboto'] mb-3 sm:mb-4">О Нас</h2>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm leading-5 sm:leading-6">
              <li>Контент с инфо-1</li>
              <li>Контент с инфо-2</li>
              <li>Контент с инфо-3</li>
              <li>Контент с инфо-4</li>
              <li>Контент с инфо-5</li>
              <li>Контент с инфо-6</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-['Roboto'] mb-3 sm:mb-4">Сервисы копманий</h2>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm leading-5 sm:leading-6">
              <li>Клиентоориентированный продукт</li>
              <li>Высокосоростной интернет</li>
              <li>Возможность заказы 24/7</li>
              <li>Адаптивный сайт без надобности App</li>
              <li>Слот машына для любителей призов и игр</li>
              <li>Донатировать всегда из любой точке мира</li>
              <li></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-['Roboto'] mb-3 sm:mb-4">Маркетинг</h2>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm leading-5 sm:leading-6">
              <li>Контент с инфо-7</li>
              <li>Контент с инфо-8</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-['Roboto'] mb-3 sm:mb-4">Контент с инфо-9</h2>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm leading-5 sm:leading-6">
              <li>Наши кантакты</li>
              <li>Открыть Гифт карты</li>
              <li>Сделать Донаты</li>
              <li>Для соискателей</li>
              <li>Сбор отзывов</li>
              <li>Контент с инфо-10</li>
            </ul>
          </div>
        </div>

        {/* Раздел с соцсетями и кнопками App Store / Google Play */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          {/* Соцсети */}
          <div className="flex space-x-3 sm:space-x-4">
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
            <Image src="/youtube.svg" alt="YouTube" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
            <Image src="/instagram.svg" alt="Instagram" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
            <Image src="/telegram.svg" alt="Telegram" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
            <Image src="/tiktok.svg" alt="TikTok" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
          </div>

          {/* Кнопки App Store / Google Play */}
          <div className="flex space-x-2 sm:space-x-4">
            <Image src="/appstore.svg" alt="App Store" width={100} height={30} className="sm:w-[120px] sm:h-[40px]" />
            <Image src="/googleplay.svg" alt="Google Play" width={100} height={30} className="sm:w-[120px] sm:h-[40px]" />
          </div>
        </div>

        {/* Копирайт и правовая информация */}
        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-sm text-black">
          2024 - 2025 Mitfoodcompany. Правовая информация
        </div>
      </div>
    </footer>
  );
}

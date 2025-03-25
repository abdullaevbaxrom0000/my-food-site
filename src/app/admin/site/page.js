"use client";
import { useState } from "react";


export default function SitePage() {
  const [activeTab, setActiveTab] = useState("menu");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false); // <-- ДОБАВЛЯЕМ ЭТО  


  const menuData = [
    {
      id: 1,
      name: "Кат Бургер",
      category: "Бургеры 'Кат'",
      price: "30 000 UZS",
      description: "Сочный бургер с котлетой.",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Управление сайтом</h1>

      {/* Вкладки */}
      <div className="flex flex-wrap space-x-2 mb-6">
        <button onClick={() => setActiveTab("menu")} className={`${activeTab === "menu" ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}>
          Меню
        </button>
        <button onClick={() => setActiveTab("page1")} className={`${activeTab === "page1" ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}>
          Главная
        </button>
        <button onClick={() => setActiveTab("page2")} className={`${activeTab === "page2" ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}>
          О нас
        </button>
        <button onClick={() => setActiveTab("page3")} className={`${activeTab === "page3" ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}>
          Контакты
        </button>
        <button onClick={() => setActiveTab("page4")} className={`${activeTab === "page4" ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}>
          Доставка
        </button>
      </div>

      {/* Вкладка Меню */}
      {activeTab === "menu" && (
        <div>

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
  <div className="flex flex-wrap space-x-2 mb-4">
    <button onClick={() => setAddModalOpen(true)} className="bg-[#414141] text-white px-2 text-sm py-1 rounded-sm hover:bg-blue-700 transition-colors">
      Добавить блюдо
    </button>
    <button onClick={() => setAddCategoryModalOpen(true)} className="bg-[#414141] text-white px-2 text-sm py-1 rounded-sm hover:bg-yellow-600 transition-colors">
      Добавить категорию
    </button>
  </div>
</div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Фото</th>
                  <th className="px-4 py-2 text-left text-gray-600">Название</th>
                  <th className="px-4 py-2 text-left text-gray-600">Категория</th>
                  <th className="px-4 py-2 text-left text-gray-600">Цена</th>
                  <th className="px-4 py-2 text-left text-gray-600">Описание</th>
                  <th className="px-4 py-2 text-left text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody>
                {menuData.map((dish) => (
                  <tr key={dish.id} className="border-b">
                    <td className="px-4 py-2">
                      <img src={dish.image} alt={dish.name} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2 text-gray-800">{dish.name}</td>
                    <td className="px-4 py-2 text-gray-600">{dish.category}</td>
                    <td className="px-4 py-2 text-gray-800">{dish.price}</td>
                    <td className="px-4 py-2 text-gray-600">{dish.description}</td>
                    <td className="px-4 py-2">
                      <button className="bg-[#1333EA] text-white text-xs px-2 py-1 rounded hover:bg-blue-700 mr-2 transition-colors">Редактировать</button>
                      <button className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors">Удалить</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Вкладки страниц */}
      {activeTab !== "menu" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Контент "{activeTab === "page1" ? "Главная" : activeTab === "page2" ? "О нас" : activeTab === "page3" ? "Контакты" : "Доставка"}"
          </h3>
          <textarea className="w-full p-2 border rounded mb-4" rows="5" placeholder="Текст страницы..."></textarea>
          <button className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">Сохранить</button>
        </div>
      )}

      {/* Модалка добавления блюда */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Добавить блюдо</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Название</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Категория</label>
                <select className="w-full p-2 border rounded">
                  <option>Бургеры "Кат"</option>
                  <option>Стики</option>
                  <option>Комбо</option>
                  <option>Пиццы</option>
                  <option>Ролы</option>
                  <option>Допы</option>
                  <option>Напитки</option>
                  <option>Десерты</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Цена (UZS)</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Описание</label>
                <textarea className="w-full p-2 border rounded" rows="3"></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setAddModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Отмена</button>
                <button type="submit" className="bg-[#1333EA] text-white px-4 py-2 rounded hover:bg-blue-700">Добавить</button>
              </div>
            </form>
          </div>
        </div>
          
      )}
      
      {isAddCategoryModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Добавить категорию</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Название категории</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={() => setAddCategoryModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Отмена</button>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Добавить</button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>
  );
}

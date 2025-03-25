"use client";
import { useState } from "react";

export default function WarehousePage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const ingredients = [
    { id: 1, name: "Булочка", quantity: 100, unit: "шт." },
    { id: 2, name: "Котлета", quantity: 50, unit: "шт." },
    { id: 3, name: "Сыр", quantity: 20, unit: "кг" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Склад</h1>

      {/* Кнопка добавить */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Добавить продукт
        </button>
      </div>

      {/* Таблица склада */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Список ингредиентов</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Название</th>
                <th className="px-4 py-2 text-left text-gray-600">Количество</th>
                <th className="px-4 py-2 text-left text-gray-600">Ед. изм.</th>
                <th className="px-4 py-2 text-left text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                  <td className="px-4 py-2 text-gray-800">{item.unit}</td>
                  <td className="px-4 py-2">
                    <button className="bg-[#1333EA] text-white px-2 py-1 rounded hover:bg-blue-700 mr-2 transition-colors">
                      Редактировать
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors">
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модалка добавления ингредиента */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Добавить продукт</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Название</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Количество</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Единица измерения</label>
                <select className="w-full p-2 border rounded">
                  <option>шт.</option>
                  <option>кг</option>
                  <option>л</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-[#1333EA] text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

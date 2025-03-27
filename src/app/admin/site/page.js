"use client";
import { useState, useEffect } from "react";

export default function SitePage() {
  const [activeTab, setActiveTab] = useState("menu");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editDishData, setEditDishData] = useState(null);


  const fetchMenu = async () => {
    try {
      const res = await fetch("https://api.mit-foodcompany.uz/api/menu");
      const data = await res.json();
      setMenuData(data.categories);
    } catch (error) {
      console.error("Ошибка при загрузке меню:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryMap = {
      "Бургеры \"Кат\"": "burgers",
      "Стики": "sticks",
      "Комбо": "combos",
      "Пиццы": "pizzas",
      "Ролы": "rolls",
      "Допы": "extras",
      "Напитки": "drinks",
      "Десерты": "desserts",
    };

    const newDish = {
      name: e.target.name.value,
      category: categoryMap[e.target.category.value],
      price: parseFloat(e.target.price.value),
      description: e.target.description.value,
      image_url: e.target.image_url.value,
    };

    try {
      const response = await fetch("https://api.mit-foodcompany.uz/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении блюда");
      }

      alert("Блюдо успешно добавлено!");
      setAddModalOpen(false);
      fetchMenu(); // Обновим список блюд после добавления
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при добавлении блюда.");
    }
  };


  const handleEditSubmit = async () => {
    try {
      
      const rawPrice = editDishData.price.toString();
      const cleanPrice = parseInt(rawPrice.replace(/[^\d]/g, ''), 10);

      
      const response = await fetch(`/api/menu/${editDishData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: editDishData.name,
          price: cleanPrice,
          ...(editDishData.img?.trim() && { image: editDishData.img.trim() }),
          description: editDishData.description,
          category: editDishData.category
        })
      });
  
      if (!response.ok) throw new Error("Ошибка при обновлении");
  
      const updatedDish = await response.json();
  
      // Обновим данные на экране
      const updatedCategories = menuData.map((cat) => {

        if (cat.id !== editDishData.category) return cat;
        return {
          ...cat,
          items: cat.items.map((item) =>
            item.id === updatedDish.id
              ? { ...updatedDish, price: `${Number(updatedDish.price).toLocaleString()} сум` }
              : item
          )
        };
      });
  
      setMenuData(updatedCategories);

      setEditModalOpen(false);
      setEditDishData(null);
    } catch (error) {
      console.error("Ошибка при отправке PUT-запроса:", error);
      alert("Не удалось сохранить изменения");
    }
  };
  


  const handleDelete = async (dishId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить это блюдо?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`/api/menu/${dishId}`, {
        method: "DELETE"
      });
  
      if (!response.ok) throw new Error("Ошибка при удалении");
  
      // Удалим блюдо из состояния без обновления страницы
      const updated = menuData.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.id !== dishId)
      }));
  
      setMenuData(updated);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить блюдо");
    }
  };
  




  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Управление сайтом</h1>

      {/* Вкладки */}
      <div className="flex flex-wrap space-x-2 mb-6">
        {[
          { id: "menu", label: "Меню" },
          { id: "page1", label: "Главная" },
          { id: "page2", label: "О нас" },
          { id: "page3", label: "Контакты" },
          { id: "page4", label: "Доставка" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? "bg-[#1333EA] text-white" : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-xl hover:bg-blue-700 mb-2`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "menu" && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex flex-wrap space-x-2 mb-4">
              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-[#414141] text-white px-2 text-sm py-1 rounded-sm hover:bg-blue-700 transition-colors"
              >
                Добавить блюдо
              </button>
              <button
                onClick={() => setAddCategoryModalOpen(true)}
                className="bg-[#414141] text-white px-2 text-sm py-1 rounded-sm hover:bg-yellow-600 transition-colors"
              >
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
                {menuData.flatMap((category) =>
                  category.items.map((dish, index) => (
                    <tr key={`${category.id}-${index}`} className="border-b">
                      <td className="px-4 py-2">
                        <img
                          src={dish.img}
                          alt={dish.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-800">{dish.name}</td>
                      <td className="px-4 py-2 text-gray-600">{category.title}</td>
                      <td className="px-4 py-2 text-gray-800">{dish.price}</td>
                      <td className="px-4 py-2 text-gray-600">{dish.description}</td>
                      <td className="px-4 py-2">
                      <button
                       onClick={() => {
                         setEditDishData({ ...dish, category: category.id });
                         setEditModalOpen(true);
                             }}
                            className="bg-[#1333EA] text-white text-xs px-2 py-1 rounded hover:bg-blue-700 mr-2 transition-colors"
                           >
                           Редактировать
                            </button>

                            <button
  onClick={() => handleDelete(dish.id)}
  className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
>
  Удалить
</button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== "menu" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Контент "{
              activeTab === "page1"
                ? "Главная"
                : activeTab === "page2"
                ? "О нас"
                : activeTab === "page3"
                ? "Контакты"
                : "Доставка"
            }"
          </h3>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="5"
            placeholder="Текст страницы..."
          ></textarea>
          <button className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
            Сохранить
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Добавить блюдо</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Название Блюдо</label>
                <input name="name" type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Категория</label>
                <select name="category" className="w-full p-2 border rounded">
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
                <input name="price" type="number" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Описание</label>
                <textarea name="description" className="w-full p-2 border rounded" rows="3"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ссылка на изображение</label>
                <input name="image_url" type="text" className="w-full p-2 border rounded" />
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


{isEditModalOpen && editDishData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
      <h2 className="text-xl font-bold mb-4">Редактировать блюдо</h2>

      <input
        type="text"
        placeholder="Название"
        value={editDishData.name}
        onChange={(e) => setEditDishData({ ...editDishData, name: e.target.value })}
        className="border rounded p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Цена"
        value={editDishData.price}
        onChange={(e) => setEditDishData({ ...editDishData, price: e.target.value })}
        className="border rounded p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Изображение"
        value={editDishData.img}
        onChange={(e) => setEditDishData({ ...editDishData, img: e.target.value })}
        className="border rounded p-2 w-full mb-2"
      />

      <textarea
        placeholder="Описание"
        value={editDishData.description}
        onChange={(e) => setEditDishData({ ...editDishData, description: e.target.value })}
        className="border rounded p-2 w-full mb-2"
      />

      <select
        value={editDishData.category}
        onChange={(e) => setEditDishData({ ...editDishData, category: e.target.value })}
        className="border rounded p-2 w-full mb-2"
      >
        {menuData.map((cat) => (
  <option key={cat.id} value={cat.id}>{cat.title}</option>
))}

      </select>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setEditModalOpen(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Отмена
        </button>
        <button
          onClick={handleEditSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сохранить
        </button>
      </div>
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
                <button
                  type="button"
                  onClick={() => setAddCategoryModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
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

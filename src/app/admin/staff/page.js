"use client";
import { useState } from "react";

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState("schedule");

  // Модалки
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);

  // Формы
  const [employeeName, setEmployeeName] = useState("");
  const [employeeDept, setEmployeeDept] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [deptName, setDeptName] = useState("");
  const [positionName, setPositionName] = useState("");

  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log("Сотрудник:", employeeName, employeeDept, employeePosition);
    setEmployeeName("");
    setEmployeeDept("");
    setEmployeePosition("");
    setIsAddEmployeeOpen(false);
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    console.log("Отдел:", deptName);
    setDeptName("");
    setIsAddDeptOpen(false);
  };

  const handleAddPosition = (e) => {
    e.preventDefault();
    console.log("Должность:", positionName);
    setPositionName("");
    setIsAddPositionOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-white">
      {/* Заголовок и кнопки */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Персонал</h1>
        <div className="flex flex-wrap gap-2">
  <button
    onClick={() => setIsAddEmployeeOpen(true)}
    className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
  >
    + Cотрудника
  </button>
  <button
    onClick={() => setIsAddPositionOpen(true)}
    className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
  >
    + должность
  </button>
  <button
    onClick={() => setIsAddDeptOpen(true)}
    className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
  >
    + отдел
  </button>
</div>

      </div>

      {/* Вкладки */}
      <div className="flex space-x-2 mb-4">
        {[
          { key: "schedule", label: "График сотрудников" },
          { key: "vacancies", label: "Вакансии" },
          { key: "staffing", label: "Штатка" },
          { key: "files", label: "Личные дела" },
          { key: "oter", label: "что то нужное" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-[#414141] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Содержимое вкладок */}
      <div className="bg-gray-100 p-4 rounded-xl shadow flex-1">
        {activeTab === "schedule" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              График сотрудников
            </h2>
            <p className="text-gray-600">
              Здесь будет календарь или расписание смен сотрудников.
            </p>
          </div>
        )}

        {activeTab === "vacancies" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Вакансии
            </h2>
            <p className="text-gray-600">
              Список открытых вакансий, их статус, количество откликов.
            </p>
          </div>
        )}

        {activeTab === "staffing" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Штатка
            </h2>
            <p className="text-gray-600">
              Структура подразделений и актуальное штатное расписание.
            </p>
          </div>
        )}

        {activeTab === "files" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Личные дела сотрудников
            </h2>
            <p className="text-gray-600">
              Информация по сотрудникам: контракты, резюме, приказы, данные.
            </p>
          </div>
        )}
      </div>

      {/* Модалка Добавить сотрудника */}
      {isAddEmployeeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Добавить сотрудника
            </h2>
            <form onSubmit={handleAddEmployee}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">ФИО сотрудника</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Отдел</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={employeeDept}
                  onChange={(e) => setEmployeeDept(e.target.value)}
                  placeholder="Например: Отдел продаж"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Позиция (должность)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={employeePosition}
                  onChange={(e) => setEmployeePosition(e.target.value)}
                  placeholder="Например: Менеджер"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeOpen(false)}
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

      {/* Модалка Добавить отдел */}
      {isAddDeptOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Добавить отдел
            </h2>
            <form onSubmit={handleAddDept}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Название отдела</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddDeptOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модалка Добавить должность */}
      {isAddPositionOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Добавить должность
            </h2>
            <form onSubmit={handleAddPosition}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Название должности</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddPositionOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
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

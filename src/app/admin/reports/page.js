"use client";
import { useState } from "react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("orders");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Пример данных для заказов (заглушка)
  const ordersData = [
    { id: 1, date: "2024-03-01", orderNumber: "001", amount: "150 000 UZS", status: "Выполнен" },
    { id: 2, date: "2024-03-02", orderNumber: "002", amount: "95 000 UZS", status: "Отменён" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Отчёты</h1>

      {/* Блок фильтров */}
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Фильтр отчётов</h2>
        <div className="flex flex-wrap items-center space-x-4 mb-4">
          
          {/* Выбор типа отчёта */}
          <div>
            <label className="block text-gray-700 mb-1">Тип отчёта</label>
            
            <select
  value={reportType}
  onChange={(e) => setReportType(e.target.value)}
  className="p-2 border rounded min-w-[300px]"
>
  <option value="orders">Отчёт по заказам клиентов </option>
  <option value="income">Отчёт по доходам</option>
  <option value="payments">Оплаты</option>
  <option value="cashback">Кэшбэк клиентов за квартал</option>
  <option value="correction">Мсправление</option>
  <option value="shift">Смена</option>
  <option value="cashier">Отчёт по кассирам</option>
  <option value="other">Прочие</option>
</select>



          </div>

          {/* Даты */}
          <div>
            <label className="block text-gray-700 mb-1">С даты</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">По дату</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <button className="bg-[#1333EA] text-white px-4 py-2 rounded-xl hover:bg-blue-700 mt-6">
            Показать
          </button>
        </div>
      </div>

      {/* Содержимое отчёта */}
      <div className="bg-white rounded-xl p-6 shadow">
        {reportType === "orders" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Список заказов</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Номер заказа</th>
                    <th className="px-4 py-2 text-left text-gray-600">Дата</th>
                    <th className="px-4 py-2 text-left text-gray-600">Сумма</th>
                    <th className="px-4 py-2 text-left text-gray-600">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-2 text-gray-800">{order.orderNumber}</td>
                      <td className="px-4 py-2 text-gray-600">{order.date}</td>
                      <td className="px-4 py-2 text-gray-800">{order.amount}</td>
                      <td className="px-4 py-2 text-gray-600">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportType === "income" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Доходы</h2>
            <p>Здесь будет таблица доходов.</p>
          </div>
        )}

        {reportType === "payments" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Оплаты</h2>
            <p>Таблица оплат (наличные, безналичные).</p>
          </div>
        )}

        {reportType === "cashback" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Кэшбэк</h2>
            <p>Отчёт по кэшбэку.</p>
          </div>
        )}
      </div>
    </div>
  );
}

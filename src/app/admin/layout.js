import Link from "next/link";

export const metadata = {
  title: "Админ-панель | Mit Food Company",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col justify-between shadow-md">
        <div>
          <div className="flex flex-col items-center mb-8">
            <img src="/logo.svg" alt="Лого" className="w-16 h-16 rounded-full mb-2" />
            <span className="font-semibold text-lg text-gray-800">Админ-панель</span>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/admin/site" className="text-gray-700 hover:text-blue-700">Сайт</Link>
            <Link href="/admin/reports" className="text-gray-700 hover:text-blue-700">Отчёты</Link>
            <Link href="/admin/warehouse" className="text-gray-700 hover:text-blue-700">Склад</Link>
            <Link href="/admin/staff" className="text-gray-700 hover:text-blue-700">Персонал</Link>
          </nav>
        </div>
        <button className="mt-4 py-2 bg-[#1333EA] text-white rounded hover:bg-blue-700">
          Выйти
        </button>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}

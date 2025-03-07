"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function strategy() {
  return (
    <div className="relative w-screen min-h-screen font-['Roboto']">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-60 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">(Стратегия)</h1>
        <p className="text-lg max-w-3xl text-gray-700">
          Здесь будет информация о нашей Стратегий.
        </p>
      </main>
      <Footer />
    </div>
  );
}

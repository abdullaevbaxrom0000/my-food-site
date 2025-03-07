"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function construction() {
  return (
    <div className="relative w-screen min-h-screen font-['Roboto']">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-60 px-6 text-center">
        <h1 className="text-2xl font-regular mb-6">(Экстреиор/Интериор)</h1>
        <p className="text-lg max-w-3xl text-gray-700">
          Здесь будет изображения о внешней и внутренней части конструкуций.
        </p>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function PingComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://api.mit-foodcompany.uz/ping")
        .then(res => {
          if (res.ok) {
            console.log("Пинг успешный");
          }
        })
        .catch(err => {
          console.error("Ошибка пинга сервера:", err);
        });
    }, 300000); // каждые 5 минут (300000 мс)

    return () => clearInterval(interval);
  }, []);

  return null; // ничего не рендерим
}

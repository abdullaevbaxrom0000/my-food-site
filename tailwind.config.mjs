/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FDC801",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Ключ "roboto" – это название Tailwind-класса (font-roboto).
        // Можете добавить нужные fallback-шрифты, например Arial, sans-serif.
        roboto: ["Roboto"],
        salsa: ["Salsa", "cursive"],

        // Если хотите дополнительно использовать Poppins или Salsa:
        // poppins: ["Poppins", "sans-serif"],
        // salsa: ["Salsa", "cursive"],

        // Однако, если вам нужен  *один* шрифт, 
        // лучше оставить только Roboto.
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        hijau: "#00FFC6",
        biru: "#30AADD",
        hijau2: "#43919B",
        hijau3: "#247881",
        biru2: "#6D67E4",
      },
    },
    fontFamily: {
      manrope: ["Manrope"],
      aller: ["Aller"],
      fonarto: ["Fonarto"],
      coolvetica: ["Coolvetica"],
      express: ["Expressway"],
      exo: ["Exo"],
      biryani: ["Biryani"],
    },
  },
  plugins: [],
};

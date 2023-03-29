/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./build/**/*.{html, ts}",
    "./pages/**/*.{html,js, ts}",
    "./components/*/.{html,ts}",
    "./components/**/*.{html, ts}",
  ],
  theme: {
    extend: {
      colors: {
        hijau: "#00FFC6",
        biru: "#30AADD",
        hijau2: "#43919B",
        hijau3: "#247881",
        hijau4: "#439A97",
        biru2: "#6D67E4",
        biru3: "#4B56D2",
      },
    },
    fontFamily: {
      manrope: ["Manrope"],
      dosis: ["Dosis"],
      quicksand: ["Quicksand"],
      aller: ["Aller"],
      fonarto: ["Fonarto"],
      coolvetica: ["Coolvetica"],
      express: ["Expressway"],
      exo: ["Exo"],
      biryani: ["Biryani"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
  enabled: process.env.NODE_ENV === "production",
};

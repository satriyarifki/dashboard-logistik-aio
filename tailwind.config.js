/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        hijau: "#2FBD85",
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
      quicksand: ["Quicksand"],
      aller: ["Aller"],
      alkatra: ["Alkatra"],
      fasthand: ["Fasthand"],
      fonarto: ["Fonarto"],
      coolvetica: ["Coolvetica"],
      express: ["Expressway"],
      exo: ["Exo"],
      biryani: ["Biryani"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};

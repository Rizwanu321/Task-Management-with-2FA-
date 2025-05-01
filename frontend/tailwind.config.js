module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "modal-in": {
          "0%": { opacity: 0, transform: "translate(0, -10px) scale(0.95)" },
          "100%": { opacity: 1, transform: "translate(0, 0) scale(1)" },
        },
      },
      animation: {
        "modal-in": "modal-in 0.2s ease-out forwards",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
};

import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        "background-2": "hsl(var(--background-2))",
        "background-3": "hsl(var(--background-3))",
        "background-4": "hsla(var(--background-4) , <alpha-value>)",
        "background-5": "hsla(var(--background-5))",
        border: "hsl(var(--border))",
        "border-2": "hsl(var(--border-2))",
        "border-3": "hsl(var(--border-3))",
        color: "hsl(var(--color))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",

        slateBlue: "rgb(30,41,59)", 
        deepSpace: "rgb(2,6,23)", 
        coolGray: "rgb(71,85,105)", 
      },
    },
  },
  plugins: [require("daisyui")],
};

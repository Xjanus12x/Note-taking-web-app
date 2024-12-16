/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slateBlue: "rgb(30,41,59)",
        deepSpace: "rgb(2,6,23)",
        coolGray: "rgb(71,85,105)", 
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: (color) => ({
        primary: color.colors.slate,
        secondary: color.colors.emerald,
        error: color.colors.red,
        success: color.colors.green,
        warning: color.colors.yellow,
        info: color.colors.blue,
        gray: color.colors.gray,
      }),
    },
  },
  plugins: [],
};

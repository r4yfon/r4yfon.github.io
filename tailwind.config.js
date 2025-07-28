/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // px-4
          sm: "1.5rem", // sm:px-6
          lg: "2rem", // lg:px-8
        },
      },
    },
  },
  plugins: [],
};

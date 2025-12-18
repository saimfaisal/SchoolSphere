/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#f59e0b",
        muted: "#f3f4f6"
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          950: "#0B0F14",
          900: "#0F141B",
          800: "#151C25",
          700: "#1D2531",
          600: "#2A3341",
        },
        gold: {
          50: "#FBF3DC",
          100: "#F4E3B0",
          200: "#EAD08A",
          300: "#DEB966",
          400: "#C9A24D",
          500: "#B0873A",
          600: "#8E6B2A",
        },
        rise: "#5FCF80",
        fall: "#E86B6B",
        emphasize: "#DEB966",
        thoughtful: "#6BA8E8",
      },
      boxShadow: {
        stage: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(222,185,102,0.08)",
      },
    },
  },
  plugins: [],
};

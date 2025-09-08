import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        /* === Version sombre premium === */
        ".bg-premium-dark": {
          "position": "relative",
          "min-height": "100vh",
          "background": "linear-gradient(to bottom right, #0f172a, #1e1b4b, #0f172a)",
        },
        ".bg-premium-dark::before": {
          "content": '""',
          "position": "absolute",
          "inset": "0",
          "z-index": "-1",
          "background-image": "url('/abstract-bg.png')",
          "background-size": "cover",
          "background-position": "center",
          "opacity": "0.15",   /* discrète */
        },

        /* === Version claire premium === */
        ".bg-premium-light": {
          "position": "relative",
          "min-height": "100vh",
          "background": "linear-gradient(to bottom right, #ffffff, #f9fafb, #e5e7eb)",
        },
        ".bg-premium-light::before": {
          "content": '""',
          "position": "absolute",
          "inset": "0",
          "z-index": "-1",
          "background-image": "url('/abstract-bg.png')",
          "background-size": "cover",
          "background-position": "center",
          "opacity": "0.25",   /* plus visible */
        },
      });
    })
  ],
};

export default config;
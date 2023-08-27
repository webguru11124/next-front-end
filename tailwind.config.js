/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

import plugin from "tailwindcss/plugin";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "80px",
      sm: "480px",
      md: "968px",
      lg: "116px",
      xl: "1440px",
    },
    colors: {
      "blue-primary": "#0A5DAB",
      blue: "#0A5DAB",
      "blue-main": "#032D60",
      "blue-light": "#E5F8FF",
      white: "#ffffff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "text-color": "#404040",
      "gray-white": "#F5F6F8",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-bg": "#F5F5F5",
      "light-color": "#57575A",
      "light-bg": "#F0F0F0",
      red: "#FF5647",
      "gray-max-light": "#F0F0F0",
      "gray-light": "#d3dce6",
      "gray-lighter": "#7E7E7E",
      "gray-border": "#e2e2e2",
      "gray-placeholder": "#9CA3AF",
      "blue-lighter": "#EEF2FF",
      "light-border": "#D2D2D2",
      "lighter-border": "#EDEDED",
      black: "#404040",
      "white-darker": "#7E7E7E",
      "green-text": "#00E431",
      "green-light": "#D9FFE5",
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 550,
      bold: 600,
      extrabold: 800,
      black: 900,
    },
    borderRadius: {
      sm: "6px",
      md: "12px",
      full: "999px",
    },
    fontSize: {
      sm: "8px",
      lg: [
        "0.9rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "300",
        },
      ],
      "2lg": [
        "0.9rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "300",
        },
      ],
      xl: [
        "1.1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        },
      ],
      "2xl": [
        "1.2rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "1.3rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
      "4xl": [
        "24px",
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      boxShadow: {
        "3xl": "0 4px 10px 0px rgba(0, 0, 0, 0.20)",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      width: {
        header: "271px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // require('daisyui'),
    plugin(function ({ addVariant }) {
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.md'))",
      ); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
};

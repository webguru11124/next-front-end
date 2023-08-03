/** @type {import('tailwindcss').Config} */

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
      "red": "#FF5647",
      "gray-max-light": "#F0F0F0",
      "gray-light": "#d3dce6",
      "gray-lighter": "#7E7E7E",
      "gray-border": "#e2e2e2",
      "gray-placeholder": "#9CA3AF",
      "blue-lighter": "#EEF2FF"
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 500,
      bold: 600,
      extrabold: 800,
      black: 900,
    },
    borderRadius: {
      md: "12px",
      full: "999px"
    },
    width: {
      header: "271px"
    },
    fontSize: {
      sm: "12px",
      lg: [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "300",
        },
      ],
      xl: [
        "1.3rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "400",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
      "4xl": [
        "32px",
        {
          lineHeight: "2.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.md'))"
      ); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
};

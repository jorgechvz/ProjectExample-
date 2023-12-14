import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "persian-green": {
        "50": "#effefb",
        "100": "#c7fff2",
        "200": "#90ffe6",
        "300": "#51f7d8",
        "400": "#1de4c5",
        "500": "#04c8ad",
        "600": "#00a390",
        "700": "#058073",
        "800": "#0a655c",
        "900": "#0d544d",
        "950": "#003331",
      },
      "black-bean": {
        "50": "#f1effa",
        "100": "#d9dcf2",
        "200": "#b5bfe3",
        "300": "#879fcf",
        "400": "#5581b4",
        "500": "#316f96",
        "600": "#216478",
        "700": "#1b595f",
        "800": "#174f4b",
      },
      "blue-charcoal": {
        "900": "#00357a",
        "950": "#000814",
      },
      "bright-red": {
        "50": "#fff0f0",
        "100": "#ffdddd",
        "200": "#ffc1c1",
        "300": "#ff9797",
        "400": "#ff5b5b",
        "500": "#ff2828",
        "600": "#fa0808",
        "700": "#d30202",
        "800": "#ac0606",
        "900": "#8f0d0d",
        "950": "#4f0000",
      },
    },
    fontsWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
      "6xl": "64px",
    },
    extend: {
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      border: {
        sm: "1px",
        md: "2px",
        lg: "4px",
        xl: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "10px 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/forms"), nextui()],
  },
};
export default config;

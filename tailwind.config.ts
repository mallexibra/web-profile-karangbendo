import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#449E85",
        second: "#faf7f7",
        gray: "#F6F6F6",
        warning: "#FBB42C",
        danger: "#CA3737"
      }
    },
  },
  plugins: [],
};
export default config;

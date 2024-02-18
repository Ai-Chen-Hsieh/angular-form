/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto'", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'mobile-sidebar-bg': "url('/assets/images/bg-sidebar-mobile.svg')",
        'desktop-sidebar-bg': "url('/assets/images/bg-sidebar-desktop.svg')",
      },
      colors: {
        'card-title-color': '#00224f',
        'card-description': '#b5b5bc',
        'btn-primary': '#03295a',
        'btn-secondary': '#9a9aa2',
        'step-active': '#bfe1fe',
        'step-active-text': '#07274c',
        'select-card-border-active': '#847fb8',
        'select-card-border': '#ecedef',
        'primary': '#082e65',
        'secondary': '#a3a3af',
        'primary-blue': '#413ae3'
      }
    },
  },
  plugins: [],
};

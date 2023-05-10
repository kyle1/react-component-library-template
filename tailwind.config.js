// Dark theme design
// https://m2.material.io/design/color/dark-theme.html#ui-application

// Colors & CSS variables with Tailwind
// https://tailwindcss.com/docs/customizing-colors

// Build styles with:
// npx tailwindcss -i ./src/styles/tailwind.css -o ./dist/tailwind.css --watch

const Color = require("color");

const lighten = (clr, val) =>
  Color(clr).mix(Color("white"), val).rgb().string();

const darken = (clr, val) => 
  Color(clr).mix(Color("black"), val).rgb().string();

  const generateContrasts = (variant, palette) => ({
    [variant]: palette,
    [`on-${variant}`]: Object.keys(palette).reduce(
      (enhancedPalette, shade) => ({
        ...enhancedPalette,
        [shade]: Color(palette[shade]).isLight() ? "#000000" : "#ffffff",
      }),
      {}
    ),
  });

function alpha(variableName) {
	// some tailwind magic to allow us to specify opacity with CSS variables (eg: bg-app/80)
	// https://tailwindcss.com/docs/customizing-colors#using-css-variables
	return `hsla(var(${variableName}), <alpha-value>)`;
}

// Custom blue:   #0D7BC5 color contrast w/ white foreground: 4.5
// Twitch purple: #9147FF
// Twitter blue:  #1D9BF0 
const palette = {
    primary: "#0D7BC5",
    disabled: "#dadada",
    success: "#2D8619", // color contrast w/ white foreground: 4.62
    warning: "#fdd230",
    error: "#C53046", // color contrast w/ white foreground: 5.4
    info: "#0284c7",
};

const paletteKeyValuePairs = Object.keys(palette).reduce(
  (colors, variant) => ({
    ...colors,
    ...generateContrasts(variant, {
      DEFAULT: palette[variant],
      50: lighten(palette[variant], 0.45),
      100: lighten(palette[variant], 0.4),
      200: lighten(palette[variant], 0.3),
      300: lighten(palette[variant], 0.2),
      400: lighten(palette[variant], 0.1),
      450: lighten(palette[variant], 0.01),
      500: palette[variant],
      550: darken(palette[variant], 0.01),
      600: darken(palette[variant], 0.1),
      700: darken(palette[variant], 0.2),
      800: darken(palette[variant], 0.3),
      900: darken(palette[variant], 0.4),
    }),
  }),
  {}
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...paletteKeyValuePairs,
          //TODO: How can things like background & border be giving different
          //colors in light mode and dark mode without declaring two separate
          //variables. Are CSS variables the only method?
          // background: "#000000",
          // backgroundLight: "#ffffff",
          background: {
            light: "#FFFFFF",
            DEFAULT: "#000000"
          },
          // border: "#292d38",
          // borderLight: "#ebeef5",
          border: {
            light: "#ebeef5",
            DEFAULT: "#292d38"
          }
      },
      width: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
      },
      height: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem'
      },
      minWidth: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6': '1.5rem',
        '6.5': '1.625rem',
        '7': '1.75rem',
        '7.5': '1.875rem',
        '8': '2rem',
        '8.5': '2.125rem',
        '9': '2.25rem',
        '9.5': '2.375rem',
        '10': '2.5rem',
        '12': '3rem'
      }
    },
  },
  plugins: [],
  //https://dev.to/alexandprivate/react-component-library-with-tailwindcss-in-3-mins-3pgb
  // purge: {
  //   enabled: process.env.NODE_ENV === 'publish',
  //   content: ['./src/**/*.{js,jsx,ts,tsx}']
  // },
}


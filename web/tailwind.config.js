module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
      screens: {
        "3xl": "2500px",
      },
      fontSize: {
        "5xl": "3.5rem",
        "6xl": "5rem",
        "7xl": "7rem",
        "8xl": "10rem",
        "9xl": "15rem",
        "10xl": "20rem",
        "11xl": "30rem",
        "12xl": "40rem",
        "13xl": "50rem",
        mega: "70rem",
      },
      fontFamily: {
        heading: ['"Press Start 2P"', "sans-serif"],
        inlineCode: ['"Fira Sans"', "sans-serif"],
      },
      backgroundImage: (theme) => ({
        noise: "url('/images/noise.png')",
      }),
      colors: {
        "white-alpha-10": "rgba(255, 255, 255, 0.1)",
        "white-alpha-20": "rgba(255, 255, 255, 0.2)",
        "white-alpha-30": "rgba(255, 255, 255, 0.3)",
        "white-alpha-40": "rgba(255, 255, 255, 0.4)",
        "white-alpha-50": "rgba(255, 255, 255, 0.5)",
        "white-alpha-60": "rgba(255, 255, 255, 0.6)",
        "white-alpha-70": "rgba(255, 255, 255, 0.7)",
        "white-alpha-80": "rgba(255, 255, 255, 0.8)",
        "white-alpha-90": "rgba(255, 255, 255, 0.9)",
        "black-alpha-10": "rgba(0,0,0, 0.1)",
        "black-alpha-20": "rgba(0,0,0, 0.2)",
        "black-alpha-30": "rgba(0,0,0, 0.3)",
        "black-alpha-40": "rgba(0,0,0, 0.4)",
        "black-alpha-50": "rgba(0,0,0, 0.5)",
        "black-alpha-60": "rgba(0,0,0, 0.6)",
        "black-alpha-70": "rgba(0,0,0, 0.7)",
        "black-alpha-80": "rgba(0,0,0, 0.8)",
        "black-alpha-90": "rgba(0,0,0, 0.9)",
        "blue-alpha-10": "rgba(67, 138, 255, 0.1)",
        "blue-alpha-20": "rgba(67, 138, 255, 0.2)",
        "blue-alpha-30": "rgba(67, 138, 255, 0.3)",
        "blue-alpha-40": "rgba(67, 138, 255, 0.4)",
        "blue-alpha-50": "rgba(67, 138, 255, 0.5)",
        "blue-alpha-60": "rgba(67, 138, 255, 0.6)",
        "blue-alpha-70": "rgba(67, 138, 255, 0.7)",
        "blue-alpha-80": "rgba(67, 138, 255, 0.8)",
        "blue-alpha-90": "rgba(67, 138, 255, 0.9)",
      },
      transitionProperty: {
        cursor: "opacity, background, transform, box-shadow",
      },
      boxShadow: {
        // glow: '0px 5px 40px -10px rgba(0, 0, 0, 0.25)',
        glow: "0 14px 30px 1px, 0 4px 12px, 0 1px 7px",
        card: "0 3px 30px 1px, 0 2px 8px, 0 1px 7px",
        avatar: "0px 0px 20px -5px rgba(0, 0, 0, 0.25)",
        glass:
          "inset 29.2667px -29.2667px 29.2667px rgba(100, 127, 171, 0.096), inset -29.2667px 29.2667px 29.2667px rgba(255, 255, 255, 0.096)",
        retro: "5px 5px 0px rgba(0, 0, 0, 1)",
        "retro-hover": "5px 5px 0px rgba(20, 20, 30, 1)",
        "retro-active": "5px 5px 0px rgba(30, 30, 70, 1)",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};

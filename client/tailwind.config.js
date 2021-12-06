module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      dark: "#2F5D62",
      semidark: "#5E8B7E",
      semilight: "#A7C4BC",
      light: "#DFEEEA",
      white: "#FFF",
      black: "#000000",
      purple: "#4C0070",
      gray: "#e5e7eb"
    },
    extend: {
      backgroundImage: {
        'landingImg': "url('assets/image-landing.jpg')",
        'landingImg2': "url('assets/landing-img.jpg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
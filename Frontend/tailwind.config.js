export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all relevant files in the src directory
  ],
  theme: {
    extend: {
      screens: {
        'md-custom': '700px', // Custom breakpoint for 700px and above
      },
      backgroundImage: {
        "gradient-primary-3":
          "linear-gradient(135deg, #CF9FF9 0%, #FDA19B 50%, #FFDAC2 100%)",
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        slideUp: "slideUp 1s ease-in-out forwards",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
};

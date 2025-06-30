export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"], // body text
                heading: ["var(--font-poppins)", "sans-serif"], // headings
                glitch: ["var(--font-rubik-glitch)", "cursive"], // logo
            },
        },
    },
    plugins: [],
    darkMode: false,
    content: [
        "./src/**/*.{njk,md,html}",
        "./src/**/*.svg",
        "./_includes/**/*.{html,njk}",
    ],
};

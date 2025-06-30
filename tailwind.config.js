export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"], // body text
                heading: ["var(--font-poppins)", "sans-serif"], // headings
                glitch: ["var(--font-rubik-glitch)", "cursive"], // logo
            },
            colors: {
                black: "var(--black)",
                hero: "var(--hero)",
                muted: "var(--muted)",
                primary: "var(--primary)",
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
    safelist: [
        "hover:text-primary",
        "focus-visible:ring-primary",
        "text-muted",
        "text-primary",
    ],
};

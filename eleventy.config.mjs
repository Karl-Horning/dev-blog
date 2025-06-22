export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src", {
        filter: [
            "404.html",
            "**/*.css",
            "!**/*tailwind-input.css",
            "**/*.js",
            "**/*.json",
            "!**/*.11ty.js",
            "!**/*.11tydata.js",
        ],
    });

    eleventyConfig.addPassthroughCopy("src/img");

    eleventyConfig.setServerPassthroughCopyBehavior("copy");

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
        },
    };
}

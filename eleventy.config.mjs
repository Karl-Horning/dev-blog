import slugify from "slugify";

export default function (eleventyConfig) {
    // Filters
    eleventyConfig.addFilter("slug", (str) =>
        slugify(str, {
            lower: true,
            replacement: "-",
            remove: /[*+~.()'"!:@]/g,
        })
    );

    // Collections
    eleventyConfig.addCollection("post", function (collectionApi) {
        return collectionApi
            .getFilteredByTag("post")
            .sort((a, b) => b.date - a.date);
    });

    eleventyConfig.addCollection("tagList", function (collectionApi) {
        const tagSet = new Set();
        collectionApi.getAll().forEach((item) => {
            if ("tags" in item.data) {
                let tags = Array.isArray(item.data.tags)
                    ? item.data.tags
                    : [item.data.tags];
                tags.filter(
                    (tag) => !["all", "nav", "post"].includes(tag)
                ).forEach((tag) => tagSet.add(tag));
            }
        });
        return [...tagSet].sort();
    });

    // Passthrough copy
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.setServerPassthroughCopyBehavior("copy");

    return {
        pathPrefix: "/dev-blog/",
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
        },
    };
}

import slugify from "slugify";

export default function (eleventyConfig) {
    eleventyConfig.addFilter("slug", (str) =>
        slugify(str, {
            lower: true,
            replacement: "-",
            remove: /[*+~.()'"!:@]/g,
        })
    );

    eleventyConfig.addCollection("post", function (collectionApi) {
        return collectionApi.getFilteredByTag("post").sort((a, b) => {
            return b.date - a.date;
        });
    });

    eleventyConfig.addCollection("tagList", function (collectionApi) {
        const tagSet = new Set();
        collectionApi.getAll().forEach((item) => {
            if ("tags" in item.data) {
                let tags = item.data.tags;

                if (typeof tags === "string") {
                    tags = [tags];
                }

                tags.filter((tag) => !["all", "nav", "post"].includes(tag)) // filter out unwanted tags
                    .forEach((tag) => tagSet.add(tag));
            }
        });

        return [...tagSet].sort();
    });

    return {
        pathPrefix: "/test-blog/",
        dir: {
            input: "src",
            output: "dist",
        },
    };
}

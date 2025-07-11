import slugify from "slugify";
import markdownIt from "markdown-it";
import markdownItTaskLists from "markdown-it-task-lists";

/**
 * Configure Eleventy with custom filters, collections, and settings.
 *
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig - The Eleventy configuration API
 * @returns {import("@11ty/eleventy/src/UserConfig").ConfigOptions} - The Eleventy configuration object
 */
export default function (eleventyConfig) {
    /**
     * Add a `slug` filter to convert a string into a URL-friendly slug.
     * Removes special characters and converts to lowercase.
     */
    eleventyConfig.addFilter("slug", (str) =>
        slugify(str, {
            lower: true,
            replacement: "-",
            remove: /[*+~.()'"!:@]/g,
        })
    );

    /**
     * Create a `post` collection, filtered by the `post` tag and sorted by date (newest first).
     */
    eleventyConfig.addCollection("post", function (collectionApi) {
        return collectionApi
            .getFilteredByTag("post")
            .sort((a, b) => b.date - a.date);
    });

    /**
     * Create a sorted list of unique tag names used across the site, excluding system tags.
     *
     * Used for generating a simple tag list (e.g., in a sidebar).
     */
    eleventyConfig.addCollection("tagList", function (collectionApi) {
        const tagSet = new Set();

        collectionApi.getAll().forEach((item) => {
            if ("tags" in item.data) {
                const tags = Array.isArray(item.data.tags)
                    ? item.data.tags
                    : [item.data.tags];

                tags.filter(
                    (tag) => !["all", "nav", "post"].includes(tag)
                ).forEach((tag) => tagSet.add(tag));
            }
        });

        return [...tagSet].sort();
    });

    /**
     * Create a tag map collection where each tag points to an array of its associated posts.
     * Excludes system tags (`all`, `nav`, and `post`).
     *
     * Useful for displaying tag counts or posts grouped by tag.
     */
    eleventyConfig.addCollection("tagMap", function (collectionApi) {
        const tagMap = new Map();

        collectionApi.getAll().forEach((item) => {
            if ("tags" in item.data) {
                const tags = Array.isArray(item.data.tags)
                    ? item.data.tags
                    : [item.data.tags];

                tags.filter(
                    (tag) => !["all", "nav", "post"].includes(tag)
                ).forEach((tag) => {
                    if (!tagMap.has(tag)) {
                        tagMap.set(tag, []);
                    }
                    tagMap.get(tag).push(item);
                });
            }
        });

        return Object.fromEntries(tagMap);
    });

    /**
     * Ensure certain static assets are copied through to the output folder without processing.
     */
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/scripts");
    eleventyConfig.setServerPassthroughCopyBehavior("copy");

    /**
     * markdownIt options
     */
    const options = {
        html: true,
        breaks: true,
        linkify: true,
    };

    const mdLib = markdownIt(options).use(markdownItTaskLists);
    eleventyConfig.setLibrary("md", mdLib);

    /**
     * Return Eleventy configuration object with custom input/output directories and path prefix.
     */
    return {
        pathPrefix: "/dev-blog/",
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
        },
    };
}

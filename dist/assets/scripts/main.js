/**
 * Toggles the mobile menu visibility and aria-expanded attribute
 * for screen readers when the hamburger menu button is clicked.
 */

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconHamburger = document.getElementById("icon-hamburger");
const iconClose = document.getElementById("icon-close");

menuBtn.addEventListener("click", () => {
    // Check current expanded state
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";

    // Toggle the aria-expanded attribute for accessibility
    menuBtn.setAttribute("aria-expanded", String(!isExpanded));

    // Toggle slide animation using max-height
    if (isExpanded) {
        mobileMenu.classList.remove("max-h-screen");
        mobileMenu.classList.add("max-h-0");
    } else {
        mobileMenu.classList.remove("max-h-0");
        mobileMenu.classList.add("max-h-screen");
    }

    // Toggle icon visibility
    iconHamburger.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
});

/**
 * Calculates estimated reading time for a block of text.
 *
 * @param {string} text - The input text to calculate reading time for.
 * @returns {string} Estimated reading time in the format "X min read".
 */
const calculateReadingTime = (text) => {
    const wordsPerMinute = 150; // Firefox average reading speed
    const words = text.trim().split(/\s+/).length; // Count words
    const minutes = Math.ceil(words / wordsPerMinute); // Round up to full minutes
    return `${minutes} min read`;
};

/**
 * Finds the main content and reading time display element,
 * calculates the reading time, and updates the display.
 */
const updateReadingTime = () => {
    const mainContent = document.querySelector("main");
    const readingTimeEl = document.getElementById("reading-time");

    if (mainContent && readingTimeEl) {
        const text = mainContent.innerText || "";
        const readingTime = calculateReadingTime(text);
        readingTimeEl.textContent = readingTime;
    }
};

// Wait for the DOM to be fully loaded before running reading time logic
document.addEventListener("DOMContentLoaded", updateReadingTime);

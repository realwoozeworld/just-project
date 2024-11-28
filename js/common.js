document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    // Handle navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = link.getAttribute("href");
            if (target && target.endsWith(".html")) {
                // Force a full page reload
                window.location.href = target;
            }
        });
    });

    console.log("Page initialized successfully.");
});

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const heroSection = document.querySelector(".hero");

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Get target page from the data attribute
      const page = link.getAttribute("data-page");

      // Clear main content and handle hero visibility
      mainContent.innerHTML = ""; // Clear previous content
      if (page === "home") {
        heroSection.style.display = "block";
        mainContent.innerHTML = `
          <h2>Home Page Content</h2>
          <p>Welcome to the Home Page!</p>
        `;
      } else {
        heroSection.style.display = "none"; // Hide hero section for non-home pages
        if (page === "store") {
          mainContent.innerHTML = `
            <h2>Store Page</h2>
            <p>Explore our amazing products here.</p>
          `;
        } else if (page === "cart") {
          mainContent.innerHTML = `
            <h2>Cart Page</h2>
            <p>Your cart is empty. Start shopping now!</p>
          `;
        } else if (page === "contact") {
          mainContent.innerHTML = `
            <h2>Contact Page</h2>
            <p>Feel free to reach out to us anytime.</p>
          `;
        }
      }

      // Update active link styling
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formResponse = document.getElementById("form-response");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate fields
    if (!name || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    // Simulate form submission
    formResponse.style.display = "block";
    formResponse.textContent = `Thank you, ${name}! Your message has been received.`;

    // Clear the form
    contactForm.reset();

    // Hide response message after 5 seconds
    setTimeout(() => {
      formResponse.style.display = "none";
    }, 5000);
  });
});

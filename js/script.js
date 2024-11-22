document.addEventListener("DOMContentLoaded", () => {
  // Handle Navigation Links
  const navLinks = document.querySelectorAll(".nav-links a");
  const mainContent = document.getElementById("main-content");
  const heroSection = document.querySelector(".hero");

  if (mainContent && heroSection) {
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Get the target page from the href attribute
        const page = link.getAttribute("href");

        // Clear previous content and hide the hero section for non-home pages
        mainContent.innerHTML = ""; // Clear the content
        heroSection.style.display = page === "index.html" ? "block" : "none";

        // Load content dynamically based on the target page
        if (page === "index.html") {
          mainContent.innerHTML = `
            <h2>Welcome to Our Home Page!</h2>
            <p>Discover amazing things here.</p>
          `;
        } else if (page === "store.html") {
          mainContent.innerHTML = `
            <h2>Store</h2>
            <p>Explore our amazing products and deals.</p>
          `;
        } else if (page === "cart.html") {
          mainContent.innerHTML = `
            <h2>Your Cart</h2>
            <p>It looks like your cart is empty. Start shopping!</p>
          `;
        } else if (page === "contact.html") {
          mainContent.innerHTML = `
            <h2>Contact Us</h2>
            <p>Feel free to reach out to us anytime. Use the form below to send us a message.</p>
            <form id="contact-form">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required>
              </div>
              <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject" placeholder="Subject">
              </div>
              <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
            <div id="form-response" style="display: none;"></div>
          `;
          handleContactForm(); // Attach the form functionality dynamically
        }

        // Update active link styling
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // Handle Contact Form Submission
  const handleContactForm = () => {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");

    if (contactForm) {
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
    }
  };

  // If the page is loaded directly on contact.html, initialize the form handler
  handleContactForm();
});

document.addEventListener("DOMContentLoaded", () => {
  // All the code that runs when the document is fully loaded
  displayProducts();
  setupCart();
});
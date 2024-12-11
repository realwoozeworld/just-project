document.addEventListener("DOMContentLoaded", () => {
  // Navigation and Dynamic Content Loading
  const navLinks = document.querySelectorAll(".nav-links a");
  const mainContent = document.getElementById("main-content");
  const heroSection = document.querySelector(".hero");

  const pageContent = {
    "index.html": `
      <h2>Welcome to Our Home Page!</h2>
      <p>Discover amazing things here.</p>
    `,
    "store.html": `
      <h2>Store</h2>
      <p>Explore our amazing products and deals.</p>
    `,
    "cart.html": `
      <h2>Your Cart</h2>
      <p>It looks like your cart is empty. Start shopping!</p>
    `,
    "contact.html": `
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
    `,
  };

  const loadPageContent = (page) => {
    if (mainContent) {
      mainContent.innerHTML = pageContent[page] || "<h2>Page Not Found</h2>";
      heroSection.style.display = page === "index.html" ? "block" : "none";

      // Dynamically attach form handler if on the contact page
      if (page === "contact.html") handleContactForm();
    }
  };

  // Attach navigation event listeners
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href");

      // Load the page content and update active link
      loadPageContent(page);
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Contact Form Handling
  const handleContactForm = () => {
    const contactForm = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");

    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
          alert("Please fill out all required fields.");
          return;
        }

        formResponse.style.display = "block";
        formResponse.textContent = `Thank you, ${name}! Your message has been received.`;
        contactForm.reset();

        setTimeout(() => {
          formResponse.style.display = "none";
        }, 5000);
      });
    }
  };

  // Load initial page content based on the default navigation state
  const activeLink = document.querySelector(".nav-links a.active");
  const initialPage = activeLink ? activeLink.getAttribute("href") : "index.html";
  loadPageContent(initialPage);
});

// JavaScript to toggle the navigation menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle 'active' class when the hamburger icon is clicked
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Store Filter 
document.getElementById('filter-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Get filter values
  const category = document.getElementById('category').value;
  const minPrice = document.getElementById('min-price').value;
  const maxPrice = document.getElementById('max-price').value;
  const ratings = document.getElementById('ratings').value;

  // Apply filters (update products dynamically)
  const products = document.querySelectorAll('.product-card');
  products.forEach((product) => {
      const productCategory = product.dataset.category;
      const productPrice = parseFloat(product.dataset.price);
      const productRatings = parseInt(product.dataset.ratings);

      let isVisible = true;

      if (category && productCategory !== category) isVisible = false;
      if (minPrice && productPrice < minPrice) isVisible = false;
      if (maxPrice && productPrice > maxPrice) isVisible = false;
      if (ratings && productRatings < ratings) isVisible = false;

      product.style.display = isVisible ? 'block' : 'none';
  });
});


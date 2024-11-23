document.addEventListener("DOMContentLoaded", () => {
  // Handle Active Tab Management
  const navLinks = document.querySelectorAll(".nav-links a");

  // Load the active tab from localStorage
  const activeTab = localStorage.getItem("activeTab");
  if (activeTab) {
      navLinks.forEach((link) => {
          if (link.href === activeTab) {
              link.classList.add("active");
          } else {
              link.classList.remove("active");
          }
      });
  }

  // Save the active tab when a link is clicked
  navLinks.forEach((link) => {
      link.addEventListener("click", () => {
          localStorage.setItem("activeTab", link.href);
      });
  });

  // Cart Logic
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  function displayCartItems() {
      cartContainer.innerHTML = ""; // Clear existing items

      if (cart.length === 0) {
          cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
          cartTotal.innerHTML = "";
          checkoutBtn.disabled = true; // Disable checkout if cart is empty
          return;
      }

      let total = 0;
      cart.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerHTML = `
              <h3>${item.name}</h3>
              <p>Price: $${item.price.toFixed(2)}</p>
              <p>Quantity: ${item.quantity}</p>
              <button class="remove-item" data-product-id="${item.id}">Remove</button>
          `;
          cartContainer.appendChild(cartItem);

          total += item.price * item.quantity;
      });

      cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
      checkoutBtn.disabled = cart.length === 0;

      // Attach event listeners to remove items from the cart
      const removeButtons = document.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
              const productId = e.target.getAttribute("data-product-id");
              removeFromCart(productId);
          });
      });
  }

  function removeFromCart(productId) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      displayCartItems(); // Re-display the updated cart
  }

  // Checkout button functionality
  checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
          alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
          return;
      }

      // Redirect to checkout page
      alert("Proceeding to checkout...");
      window.location.href = "checkout.html"; // Redirect to checkout page
  });

  displayCartItems();
});

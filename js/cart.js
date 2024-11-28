document.addEventListener("DOMContentLoaded", () => {
    // Handle Active Tab Management
    const navLinks = document.querySelectorAll(".nav-links a");
  
    // Load and set active tab from localStorage
    const activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.href === activeTab);
      });
    }
  
    // Save active tab on click
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
  
    // Helper: Save and refresh cart
    const saveCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    };
  
    // Helper: Calculate total price
    const calculateTotal = () =>
      cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
    // Display cart items
    function displayCartItems() {
      if (!cartContainer || !cartTotal || !checkoutBtn) return; // Ensure DOM elements exist
  
      cartContainer.innerHTML = ""; // Clear existing items
      if (cart.length === 0) {
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
        cartTotal.innerHTML = "";
        checkoutBtn.disabled = true; // Disable checkout if cart is empty
        return;
      }
  
      let total = calculateTotal();
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
      });
  
      cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
      checkoutBtn.disabled = cart.length === 0;
    }
  
    // Remove item from cart
    function removeFromCart(productId) {
      const id = parseInt(productId, 10);
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
      }
    }
  
    // Delegate remove-item click events to cart container
    if (cartContainer) {
      cartContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
          const productId = e.target.getAttribute("data-product-id");
          removeFromCart(productId);
        }
      });
    }
  
    // Checkout button functionality
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          alert(
            "Your cart is empty. Please add items to your cart before proceeding to checkout."
          );
          return;
        }
  
        alert("Proceeding to checkout...");
        window.location.href = "checkout.html";
      });
    }
  
    // Initial display of cart items
    displayCartItems();
  });
  
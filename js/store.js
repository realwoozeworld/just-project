document.addEventListener("DOMContentLoaded", () => {
    // Array of products
    const products = [
      { id: 1, name: "Product 1", price: 29.99, image: "https://via.placeholder.com/200", description: "A great product for everyday use." },
      { id: 2, name: "Product 2", price: 39.99, image: "https://via.placeholder.com/200", description: "Perfect for those who need something reliable." },
      { id: 3, name: "Product 3", price: 49.99, image: "https://via.placeholder.com/200", description: "Ideal for tech enthusiasts." }
    ];
  
    // Function to display products
    function displayProducts() {
      const productContainer = document.getElementById("product-container");
      productContainer.innerHTML = ''; // Clear any previous content
  
      products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
  
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        `;
  
        productContainer.appendChild(productCard);
      });
  
      // Add event listeners for 'Add to Cart' buttons
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-product-id");
          addToCart(productId);
        });
      });
    }
  
    // Function to add a product to the cart
    function addToCart(productId) {
      const product = products.find(p => p.id == productId);
      if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(p => p.id === product.id);
  
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          product.quantity = 1;
          cart.push(product);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
      }
    }
  
    // Display products when the page loads
    displayProducts();
  });
  
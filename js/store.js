document.addEventListener("DOMContentLoaded", () => {
  // Array of products
  const products = [
    {
      id: 1,
      name: "Smart Light Switch",
      price: 29.99,
      image: "https://i5.walmartimages.com/seo/Smart-Dimmer-Switch-for-Wireless-Light-Control-with-Dimmable-1-3-Gang-Functionality_3b9ba060-c57b-415e-8bc2-42036406cf0e.250170d4e80a4e6c25fabb3921af30ee.jpeg",
      description: "A great product for everyday use.",
    },
    {
      id: 2,
      name: "Security Camera",
      price: 39.99,
      image: "https://th.bing.com/th/id/OIP.HtlGsQyzUk19HkG4bIJ18wHaFD?w=1024&h=698&rs=1&pid=ImgDetMain",
      description: "Perfect for those who need something reliable.",
    },
    {
      id: 3,
      name: "Smart Digital Door Lock",
      price: 49.99,
      image: "https://th.bing.com/th/id/OIP.uQ3aD3yRga_4vOwVhjFH7wHaIy?w=1247&h=1480&rs=1&pid=ImgDetMain",
      description: "Ideal for tech enthusiasts.",
    },

    {
      id: 4,
      name: "Doorbell",
      category: "Electronics",
      price: 25.99,
      image: "https://th.bing.com/th/id/R.a8a033f3c8baa4426a635e45060a7765?rik=AHW5ADslJShGxw&pid=ImgRaw&r=0",
      description: "Ideal for your own safety",
    }
  ];

  /**
   * Display products on the page.
   */
  function displayProducts() {
    const productContainer = document.getElementById("product-container");

    if (!productContainer) {
      console.error("Product container element not found.");
      return;
    }

    productContainer.innerHTML = ""; // Clear previous content

    // Loop through products and create product cards
    products.forEach((product) => {
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

    // Add click event listeners to 'Add to Cart' buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        addToCart(productId);
      });
    });
  }

  /**
   * Add a product to the cart.
   * @param {string} productId - ID of the product to add.
   */
  function addToCart(productId) {
    const product = products.find((p) => p.id == productId);

    if (product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Provide visual feedback to the user
      alert(`${product.name} has been added to your cart!`);
      updateCartCounter(cart);
    } else {
      console.error("Product not found.");
    }
  }

  /**
   * Update cart counter on the page.
   * @param {Array} cart - The current cart items.
   */
  function updateCartCounter(cart) {
    const cartCounter = document.getElementById("cart-counter");
    if (cartCounter) {
      cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
  }

  // Display products when the page loads
  displayProducts();

  // Initialize cart counter on load
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCounter(initialCart);
});

document.getElementById("filter-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get filter values
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("min-price").value;
  const maxPrice = document.getElementById("max-price").value;
  const ratings = document.getElementById("ratings").value;

  // Get all products
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    // Get product attributes
    const productCategory = product.getAttribute("data-category");
    const productPrice = parseFloat(product.getAttribute("data-price"));
    const productRating = parseFloat(product.getAttribute("data-rating"));

    // Filter conditions
    const categoryMatch = !category || productCategory === category;
    const priceMatch =
      (!minPrice || productPrice >= parseFloat(minPrice)) &&
      (!maxPrice || productPrice <= parseFloat(maxPrice));
    const ratingMatch = !ratings || productRating >= parseFloat(ratings);

    // Show or hide products based on filter match
    if (categoryMatch && priceMatch && ratingMatch) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

const noResults = document.getElementById("no-results");
const visibleProducts = Array.from(products).some((product) => product.style.display === "block");

if (!visibleProducts) {
  noResults.style.display = "block";
} else {
  noResults.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  if (searchQuery) {
    const products = Array.from(document.querySelectorAll(".product-card"));

    products.forEach((product) => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      product.style.display = productName.includes(searchQuery) ? "block" : "none";
    });
  }
});
0
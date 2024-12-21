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
// Function to handle search form submission
function handleSearch(event) {
    event.preventDefault();  // Prevent the form from refreshing the page
    const query = document.getElementById("search").value.trim().toLowerCase();
  
    if (!query) {
      alert("Please enter a search term.");
      return;
    }
  
    // Redirect to the store page with the search query
    window.location.href = `store.html?search=${encodeURIComponent(query)}`;
  }
  
  // Function to toggle the visibility of the search bar
  function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    
    // Toggle search bar visibility
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
      searchBar.style.display = 'flex';
    } else {
      searchBar.style.display = 'none';
    }
  }
  
  function handleSearch(event) {
    event.preventDefault(); // Prevent form submission
    const query = document.getElementById("search-input").value.trim().toLowerCase(); // Get the search term

    // Check if the query is empty
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    // Navigate to store page with the search query in the URL
    window.location.href = `store.html?search=${encodeURIComponent(query)}`;
}

function toggleSearchBar() {
  const searchBar = document.getElementById('searchBar');
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'flex';
  } else {
    searchBar.style.display = 'none';
  }
}

function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('search').value.trim().toLowerCase();
  
  if (!query) {
    alert('Please enter a search term.');
    return;
  }
  
  // Redirect to store page with search query as a parameter
  window.location.href = `store.html?search=${encodeURIComponent(query)}`;
}

// Attach event listener for the Search button
document.querySelector('.search-bar button[type="submit"]').addEventListener('click', handleSearch);

document.addEventListener('DOMContentLoaded', function () {
  const userNickname = document.getElementById('userNickname');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutLink = document.getElementById('logoutLink');
  
  // Simulate fetching the user's nickname
  const nickname = localStorage.getItem('nickname') || 'Guest'; 
  userNickname.textContent = nickname;

  // Toggle dropdown visibility
  window.toggleDropdown = function () {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  };

  // Logout functionality
  logoutLink.addEventListener('click', function () {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nickname');
    window.location.href = 'login.html';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (event) {
    if (!document.getElementById('userMenu').contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
});

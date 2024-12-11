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
    var searchBar = document.getElementById('searchBar');
    
    // If the search bar is currently hidden, show it
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'flex';
    } else {
        searchBar.style.display = 'none';
    }
}
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
  
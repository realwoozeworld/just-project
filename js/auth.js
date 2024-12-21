// Register a new user
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert("User already exists. Please login.");
    } else {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    }
  });
  
  // Log in an existing user
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      alert(`Welcome, ${user.username}!`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "profile.html";
    } else {
      alert("Invalid email or password.");
    }
  });
  
  // Log out the current user
  document.getElementById("logoutButton")?.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });

  // Protect profile page and load user data
window.onload = function () {
    if (document.body.id === "profilePage") {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Please log in to access this page.");
        window.location.href = "login.html";
      } else {
        // Update profile details
        document.getElementById("welcomeMessage").textContent = currentUser.username;
        document.getElementById("profileUsername").textContent = currentUser.username;
        document.getElementById("profileEmail").textContent = currentUser.email;
      }
    }
  };
  
  document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear user data from local storage or session storage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  
    // Optionally clear other user data if stored
    localStorage.removeItem('userDetails');
    sessionStorage.removeItem('userDetails');
  
    // Redirect to the login page
    window.location.href = 'login.html';
  });
  
  // Hide logout button and show login button if user is not authenticated
  document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
  
    if (authToken) {
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  });
  
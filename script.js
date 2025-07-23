function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("autismSupportUsername", username);

    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
    document.getElementById("dashboard-message").textContent = 'Dashboard';
    document.getElementById("welcome-message").textContent =
      `Welcome, ${username}! Enjoy these fun and supportive games designed to help with focus and sensory development.`;
    document.getElementById("profile-section").classList.remove("hidden");

    // Optional: Load user-specific info (static for now)
    document.getElementById("user-info").innerHTML =
      "Age: 4<br>Favorite Color: Red<br>Likes: Writing, Drawing";

    // Profile picture stays as hardcoded for now
  } else {
    alert("Please enter both a username and password.");
  }
}

function showGames() {
  fetch("games.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("games-container").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading games:", error);
      document.getElementById("games-container").innerHTML =
        "<p style='color:red;'>Failed to load games. Please try again.</p>";
    });
  }

  // Auto-login if user is stored in localStorage
window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("autismSupportUsername");
  if (username) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
    document.getElementById("dashboard-message").textContent = 'Dashboard';
    document.getElementById("welcome-message").textContent =
      `Welcome, ${username}! Enjoy these fun and supportive games designed to help with focus and sensory development.`;

    const profileSection = document.getElementById("profile-section");
    if (profileSection) {
      profileSection.classList.remove("hidden");
      profileSection.classList.add("fade-in");
      }
    }
  });
// Logout function to clear user data
  function logout() {
  localStorage.removeItem("autismSupportUsername");
  location.reload(); // return to login screen
  }
// Login function with server validation
async function login() {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-message");

  if (!email || !password) {
    alert("Please enter both a username and password.");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || "Login failed. Try again.";
      return;
    }

    // Login success — show home screen
    showHomeScreen(data.user);
  } catch (err) {
    console.error("Login error:", err);
    errorMsg.textContent = "Something went wrong. Please try again.";
  }
}

// Show home screen using user session data
function showHomeScreen(user) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("home-screen").classList.remove("hidden");

  document.getElementById("dashboard-message").textContent = 'Dashboard';
  document.getElementById("welcome-message").textContent =
    `Welcome, ${user.parentName || user.email}! Enjoy these fun and supportive games designed to help with focus and sensory development.`;

  const profileSection = document.getElementById("profile-section");
  if (profileSection) {
    profileSection.classList.remove("hidden");
    profileSection.classList.add("fade-in");
  }

  // Populate sample user info
  document.getElementById("user-info").innerHTML =
    `Child: ${user.childName || "N/A"}<br>Email: ${user.email}<br>Signed up: ${new Date(user.createdAt).toLocaleDateString()}`;
}

// Show games (your code unchanged)
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

// Auto-login check on page load (check server session)
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/me");
    const data = await res.json();

    if (data.user) {
      showHomeScreen(data.user);
    }
  } catch (err) {
    console.warn("Not logged in yet.");
  }
});

// Logout function using server session clear
async function logout() {
  await fetch("/api/logout", { method: "POST" });
  location.reload(); // reset to login screen
}

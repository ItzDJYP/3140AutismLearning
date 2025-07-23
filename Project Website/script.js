function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
    document.getElementById("welcome-message").textContent =
      `Welcome, ${username}! Enjoy these fun and supportive games designed to help with focus and sensory development.`;
  } else {
    alert("Please enter both a username and password.");
  }
}

function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Example: hardcoded credentials
  const validUsername = "admin";
  const validPassword = "1234";

  if (username === validUsername && password === validPassword) {
    alert("Login successful!");
    // Redirect or proceed
    return true;
  } else {
    errorMessage.textContent = "Invalid username or password.";
    return false;
  }
}

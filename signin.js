const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
let arr = [];

loginForm.addEventListener("submit", handleLoginSubmit);

async function handleLoginSubmit(e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    setMessage("Please fill in all the required fields.", "red");
    return;
  }

  // Hardcoded admin credentials
  const adminEmail = "mugishaelvis456@gmail.com";
  const adminPassword = "123";

  if (email === adminEmail && password === adminPassword) {
    // Admin login successful
    console.log("Admin login");

    // You can perform admin-specific actions here, if needed

    // Proceed to dashboard page
    setMessage("Admin login successful. Redirecting to dashboard...", "green");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 3000);
  } else {
    // Regular user login
    console.log("Regular user login");

    // You can perform regular user actions here, if needed

    // Display login failure message
    setMessage("Invalid email or password. Please try again.", "red");
  }

  // Clear form fields
  loginForm.reset();
}

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  messageDiv.style.fontSize = "20px";
}

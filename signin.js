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
 

  try {
    const response = await fetch(
      "https://my-brand-bn-ytew.onrender.com/api/v1/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    if (data.status === true) {
      // Login successful
      console.log("Login successful");

      // You can perform user-specific actions here, if needed

      // Proceed to dashboard page
      setMessage("Login successful. Redirecting to dashboard...", "green");
      setTimeout(() => {
        window.location.href = "message.html";
      }, 3000);
    } else {
      // Login failed
      console.log("Login failed");

      // Display login failure message
      setMessage("Invalid email or password. Please try again.", "red");
    }
  } catch (error) {
    console.error("Error:", error.message);
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

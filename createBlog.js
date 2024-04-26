const blogForm = document.getElementById("blogForm");
const messageDiv = document.getElementById("message");
let arr = [];

blogForm.addEventListener("submit", handleCreateBlogSubmit);

async function handleCreateBlogSubmit(e) {
  e.preventDefault();

  const name = blogForm.blogName.value;
  const description = blogForm.blogDescription.value;
  const pic = blogForm.blogImage.files[0];

  if (!name || !description || !pic) {
    setMessage("Please fill in all the required fields.", "red");
    return;
  }
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    console.log("Data being sent:", { name, description, pic });

    const response = await fetch(
      "http://localhost:3000/api/v1/blog/createBlog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          pic,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("failed to Create a blog");
    }

    const data = await response.json();

    if (data.status === true) {
      // Login successful
      console.log("create Blog  successful");

      // You can perform user-specific actions here, if needed

      // Proceed to dashboard page
      setMessage("create Blog  successful", "green");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 3000);
    } else {
      // Login failed
      console.log("failed to Create a blog");

      // Display login failure message
      setMessage("failed to Create a blog. Please try again.", "red");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setMessage("failed to Create a blog. Please try again.", "red");
  }

  // Clear form fields
  blogForm.reset();
}

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  messageDiv.style.fontSize = "20px";
}

const blogForm = document.getElementById("blogForm");
const messageDiv = document.getElementById("message");

blogForm.addEventListener("submit", handleCreateBlogSubmit);

async function handleCreateBlogSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("blogName").value;
  const description = document.getElementById("blogDescription").value;
  const images = document.getElementById("blogImage").files[0];

  if (!name || !description || !images) {
    setMessage("Please fill in all the required fields.", "red");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("images", images);

    console.log(formData);

    const response = await fetch(
      "http://localhost:3000/api/v1/blog/createBlog",
      {
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create a blog");
    }

    const data = await response.json();

    if (data.status === true) {
      console.log("Create Blog successful");
      setMessage("Create Blog successful", "green");
      setTimeout(() => {
        setMessage("", "");
      }, 3000);
    } else {
      console.log("Failed to create a blog");
      setMessage("Failed to create a blog. Please try again.", "red");
    }
  } catch (error) {
    console.error("Error:", error.message);
    setMessage("Failed to create a blog. Please try again.", "red");
  }

  // Clear form fields
  blogForm.reset();
}

function setMessage(message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  messageDiv.style.fontSize = "20px";
}

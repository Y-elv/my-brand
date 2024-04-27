const blogForm = document.getElementById("blogForm");
function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  fetch("https://my-brand-bn-ytew.onrender.com/api/v1/blog/getAllBlog", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to fetch tasks");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data.message);
      displayTasks(data.message);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchTasks();

function displayTasks(messages) {
  const tasksContainer = document.querySelector(".blog-conents");
  // Clear previous tasks if any
  tasksContainer.innerHTML = "";

  messages.forEach((message) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("message");
    taskElement.innerHTML = `
                <div class="left-blog">
                  
    
                    <label for="${message.id}"><img class="blog-pic" src="${message.images}" alt="Image" /></label>
                    <p class="blog-name">${message.name}</p>
                     <p class="blog-description">${message.description}</p>
                     <div class="blog-icons">
                     <i class="fa-solid fa-pen-to-square"data-task-id="${message.id}"></i>
                      <i class="fa-solid fa-trash"data-task-id="${message.id}"></i>
                     </div>
                      
                </div>
               
                
            `;
    tasksContainer.appendChild(taskElement);

    const updateIcon = taskElement.querySelector(".fa-pen-to-square");
    updateIcon.addEventListener("click", () => {
      redirectToUpdatePage(message._id);
    });

    const deleteIcon = taskElement.querySelector(".fa-trash");
    deleteIcon.addEventListener("click", () => {
      deleteTask(message._id);
    });

    function redirectToUpdatePage(blogId) {
      console.log("Blog ID:", blogId);
      // Redirect to the update page with the blog ID as a query parameter
      window.location.href = `updateBlog.html?blogId=${blogId}`;
    }
  });
}

function deleteTask(messageId) {
  const token = localStorage.getItem("token");

  fetch(
    `https://my-brand-bn-ytew.onrender.com/api/v1/blog/deleteBlog/${messageId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `${token}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Refresh the task list after successful deletion
      fetchTasks();
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
}

function updateTask(blogId, updatedData) {
  const token = localStorage.getItem("token");

  fetch(
    `https://my-brand-bn-ytew.onrender.com/api/v1/blog/updateBlog/${blogId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      if (data.status === true) {
        console.log("Update Blog successful");
        setMessage("Update Blog successful", "green");
        setTimeout(() => {
          setMessage("", "");
        }, 3000);
        // Reset the form after successful update
      } else {
        console.log("Failed to Update a blog");
        setMessage("Failed to Update a blog. Please try again.", "red");
      }
      // Refresh the task list after successful update (if needed)
      fetchTasks();
    })
    .catch((error) => {
      console.log("Error:", error.message);
      setMessage("Failed to Update a blog. Please try again.", "red");
    });
  blogForm.reset();
}

document
  .getElementById("blogForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch updated data from form fields
    const updatedName = document.getElementById("blogName").value;
    const updatedDescription = document.getElementById("blogDescription").value;
    const updatedImages = document.getElementById("blogImage").files[0];

    // Fetch blog ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("blogId");

    // Prepare updated data object
    const updatedData = {
      name: updatedName,
      description: updatedDescription,
      images: updatedImages,
      // Add other fields as needed
    };

    // Call updateTask function with blog ID and updated data
    updateTask(blogId, updatedData);
  });
function setMessage(message, color) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  messageDiv.style.fontSize = "20px";
}

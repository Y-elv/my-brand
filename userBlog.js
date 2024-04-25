function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  fetch("http://localhost:3000/api/v1/blog/getAllBlog", {
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
  const tasksContainer = document.querySelector(".blog-user-conents");
  // Clear previous tasks if any
  tasksContainer.innerHTML = "";

  messages.forEach((message) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("message");
    taskElement.innerHTML = `
                <div class="left-blog">
                  
    
                    <label for="${message.id}"><img class="blog-pic" src="${message.pic}" alt="Image" /></label>
                    <p class="blog-name">${message.name}</p>
                     <p class="blog-description">${message.description}</p>
                     <div class="blog-icons">
                    
                    
                     </div>
                      
                </div>
               
                
            `;
    tasksContainer.appendChild(taskElement);

    const deleteIcon = taskElement.querySelector(".fa-trash");
    deleteIcon.addEventListener("click", () => {
      deleteTask(message._id);
    });
  });
}

function deleteTask(messageId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:3000/api/v1/blog/deleteBlog/${messageId}`, {
    method: "DELETE",
    headers: {
      authorization: `${token}`,
    },
  })
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

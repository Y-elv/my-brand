function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  fetch("http://localhost:3000/api/v1/comment/getAllComment", {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to fetch tasks");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayTasks(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchTasks();

function displayTasks(messages) {
  const tasksContainer = document.querySelector(".comments-contents");
  // Clear previous tasks if any
  tasksContainer.innerHTML = "";

  messages.forEach((message) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("message");
    taskElement.innerHTML = `
                <div class="left">
                  
    
                    <label for="${message.id}">${message.blogId}</label>
                     <p>${message.name}</p>
                     <p>${message.text}</p>
                      <i class="fa-solid fa-trash"data-task-id="${message._id}"></i>
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

  fetch(
    `http://localhost:3000/api/v1/comment/deleteComment/${messageId}`,
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
      console.log("Error:", error);
    });
}

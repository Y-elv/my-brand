function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  fetch("https://my-brand-bn-ytew.onrender.com/api/v1/getAll", {
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
      console.log(data.messages);
      displayTasks(data.messages);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

fetchTasks();

function displayTasks(messages) {
  const tasksContainer = document.querySelector(".message-contents");
  // Clear previous tasks if any
  tasksContainer.innerHTML = "";

  messages.forEach((message,index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("message");
    taskElement.innerHTML = `
                <div class="left">
                  
                      <p>${index + 1}</p> 
                    <label for="${message.id}">${message.name}</label>
                  
                     <p>${message.message}</p>
                      <i class="fa-solid fa-trash"data-task-id="${
                        message.id
                      }"></i>
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

  fetch(`https://my-brand-bn-ytew.onrender.com/api/v1/delete/${messageId}`, {
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
      console.log("Error:", error);
    });
}

function fetchTasks() {
  

  

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
  const tasksContainer = document.querySelector(".blog-user-conents");

  tasksContainer.innerHTML = "";

  messages.forEach((message) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("message");
    taskElement.innerHTML = `
            <div class="left-blog">
                <label for="${message.id}"><img class="blog-pic" src="${message.images}" alt="Image" /></label>
                <p class="blog-name">${message.name}</p>
                <p class="blog-description">${message.description}</p>
            </div> 
            <div class="blog-comments">
                <p class="add-comment" data-blog-id="${message._id}" onclick="handleAddCommentClick('${message._id}')">Add a comment</p>
                <div class="comment-input" id="commentInput_${message._id}" style="display: none;">
                    <input type="hidden" id="blogId_${message._id}" value="${message._id}">
                    <input type="text" id="nameText_${message._id}" placeholder="Your Name">
                    <input type="text" id="commentText_${message._id}" placeholder="Type your comment here">
                    <button onclick="submitComment('${message._id}')">Submit</button>
                </div>
                <div class="fetched-comments" id="fetchedComments_${message._id}"></div>
            </div>`;
    tasksContainer.appendChild(taskElement);

    // Fetch and display comments for each blog post
    fetchComments(message._id);
  });
}

function fetchComments(blogId) {
  fetch(
    `https://my-brand-bn-ytew.onrender.com/api/v1/comment/getComment/${blogId}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json();
    })
    .then((comments) => {
      console.log("comments", comments);
      const commentsContainer = document.getElementById(
        `fetchedComments_${blogId}`
      );
      commentsContainer.innerHTML = "";
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <p><strong>${comment.name}</strong>: ${comment.text}</p>`;
        commentsContainer.appendChild(commentElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
}

function handleAddCommentClick(blogId) {
  const commentInput = document.getElementById(`commentInput_${blogId}`);
  if (commentInput.style.display === "none") {
    const allCommentInputs = document.querySelectorAll(".comment-input");
    allCommentInputs.forEach((input) => (input.style.display = "none"));

    commentInput.style.display = "block";
  } else {
    commentInput.style.display = "none";
  }
}

function submitComment(blogId) {
  const nameText = document.getElementById(`nameText_${blogId}`).value;
  const commentText = document.getElementById(`commentText_${blogId}`).value;
  const blogIdValue = document.getElementById(`blogId_${blogId}`).value;

  console.log("Name:", nameText);
  console.log("Comment Text:", commentText);
  console.log("Blog ID:", blogIdValue);

  const commentData = {
    name: nameText,
    text: commentText,
    blogId: blogIdValue,
  };

  fetch(
    `https://my-brand-bn-ytew.onrender.com/api/v1/comment/createComment/${blogId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      console.log("Comment submitted successfully");
      alert(`your comment is sent`);
      fetchTasks();
    })
    .catch((error) => {
      console.error("Error submitting comment:", error);
    });

  document.getElementById(`nameText_${blogId}`).value = "";
  document.getElementById(`commentText_${blogId}`).value = "";

  document.getElementById(`commentInput_${blogId}`).style.display = "none";
}

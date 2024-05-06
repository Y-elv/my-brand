// Function to fetch comments count
function fetchCommentsCount(token) {
  fetch("https://my-brand-bn-ytew.onrender.com/api/v1/comment/getAllComment", {
    method: "GET", // Specify GET method
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Log the fetched data to console
      console.log("Comments data:", data);
      if (typeof data === "object") {
        const count = Object.keys(data).length;
        console.log("Data has", count, "properties");
        // Update the messages count element
        const messagesCountElement = document.querySelector(".comments-count");
        messagesCountElement.textContent = count;
      } else {
        console.log("Data is not an object");
      }
    })
    .catch((error) => console.error("Error fetching comments count:", error));
}

// Call fetchCommentsCount with token when the page loads
window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  fetchCommentsCount(token);
});

// Function to fetch blogs count
function fetchBlogsCount() {
  fetch("https://my-brand-bn-ytew.onrender.com/api/v1/blog/getAllBlog", {
    method: "GET", // Specify GET method
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("blogs", data);
      // Log the fetched data to console
      if (typeof data === "object") {
        const count = data.message.length;
        console.log("Data has", count, "properties");
        // Update the messages count element
        const messagesCountElement = document.querySelector(".blogs-count");
        messagesCountElement.textContent = count;
      } else {
        console.log("Data is not an object");
      }
    })
    .catch((error) => console.error("Error fetching blogs count:", error));
}

// Call fetchBlogsCount when the page loads
window.addEventListener("load", fetchBlogsCount);

// Function to fetch messages count
function fetchMessagesCount(token) {
  fetch("https://my-brand-bn-ytew.onrender.com/api/v1/getAll", {
    method: "GET", // Specify GET method
    headers: {
      authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Log the fetched data to console
      console.log("Messages data:", data.messages.length);

      if (typeof data === "object") {
        const count = data.messages.length;
        console.log("Data has", count, "properties");
        // Update the messages count element
        const messagesCountElement = document.querySelector(".messages-count");
        messagesCountElement.textContent = count;
      } else {
        console.log("Data is not an object");
      }
    })
    .catch((error) => console.error("Error fetching messages count:", error));
}

// Call fetchMessagesCount with token when the page loads
window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  fetchMessagesCount(token);
});

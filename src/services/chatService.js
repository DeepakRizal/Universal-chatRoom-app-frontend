const API_URL = "https://universal-chatroom-app-backend.onrender.com";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchMessages = async () => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data = await response.json();
  return data;
};

export const postMessage = async (message) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("Failed to post message");
  }

  const data = await response.json();
  return data;
};

export const deleteMessage = async (messageId) => {
  console.log(messageId);
  const response = await fetch(`${API_URL}/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using token-based authentication
    },
  });
  console.log(response.ok);

  if (!response.ok) {
    console.log("this is running");
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.message || "Error deleting message");
  }

  return await response.json();
};

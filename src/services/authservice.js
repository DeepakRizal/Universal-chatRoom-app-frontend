const API_URL = "https://universal-chatroom-app-backend.onrender.com";

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await response.json();

  return data;
};

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  const data = await response.json();
  return data;
};

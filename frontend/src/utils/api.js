import { getToken } from "./auth";

const API_BASE_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to login");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const generateOTP = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/generate-otp`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate OTP");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid OTP");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const verifyAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    return await response.json();
  } catch (error) {
    return { authenticated: false };
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch tasks");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create task");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update task");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete task");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

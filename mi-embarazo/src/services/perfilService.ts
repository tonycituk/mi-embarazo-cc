import { API_BASE_URL, getHeaders, handleResponse } from './apiConfig';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export const fetchProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/by_id`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error en perfilService:", error);
    throw error;
  }
};

export const verifyPassword = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/verify_password`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error en perfilService:", error);
    throw error;
  }
};

export const updateProfile = async (userData: UserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userData._id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error en perfilService:", error);
    throw error;
  }
};

import { API_BASE_URL, getHeaders, handleResponse } from './apiConfig';
import { setCookie } from 'cookies-next';

export interface LoginResponse {
  access_token: string;
  user_email: string;
  user_id: string;
  user_phone: string;
  user_name: string;
  role: string;
}

export interface LoginError {
  detail: string;
}

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: getHeaders("application/x-www-form-urlencoded"),
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    const data = await handleResponse<LoginResponse>(response);

    // Store access token in local storage
    localStorage.setItem('access_token', data.access_token);

    // Store access token in cookies
    setCookie('access_token', data.access_token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      // sameSite: 'none',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return data;
  } catch (error) {
    console.error("Error in loginService:", error);
    throw error;
  }
};

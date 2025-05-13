const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const getHeaders = (contentType: string = "application/json") => ({
  "Accept": "application/json",
  "Content-Type": contentType,
  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
});

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "An error occurred");
  }
  return response.json();
};

export { API_BASE_URL, getHeaders, handleResponse };

import { API_BASE_URL, getHeaders, handleResponse } from "./apiConfig";

export interface DashboardCounts {
  doctors: number;
  patients: number;
  appointments: number;
}

export const fetchDashboardCounts = async (): Promise<DashboardCounts> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/counts`, {
      method: "GET",
      headers: getHeaders(),
    }); 
    const data = await handleResponse(response);
    return data as DashboardCounts; // Aseguramos que la respuesta sea del tipo esperado
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw new Error("No se pudo obtener el conteo del dashboard");
  }
};

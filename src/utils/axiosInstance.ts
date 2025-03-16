import axios from "axios";
import { toast } from "react-toastify";

const isDevelopment = process.env.NODE_ENV === "development";

const apiClient = isDevelopment
  ? axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`,
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: process.env.NEXT_PUBLIC_API_USERNAME || "",
        password: process.env.NEXT_PUBLIC_API_PASSWORD || "",
      },
    })
  : axios.create({
      baseURL: "/admin",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

// Global error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Extracting error message
    const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";

    // Show error notification
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    return Promise.reject(error); // Ensure promise chain is not broken
  }
);

export default apiClient;

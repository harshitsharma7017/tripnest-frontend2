import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`
// Public axios instance
const publicAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authenticated axios instance
const authAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every protected request
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // ✅ This matches your backend
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global 401 handler
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Exported API methods
const API = {
  // 🔓 Public
  login: (data) => publicAxios.post("/auth/login", data),
  register: (data) => publicAxios.post("/auth/register", data),

  // 🔐 Protected (authenticated requests)
  getProfile: () => authAxios.get("/user/me"),
  bookTrip: (tripId, data) => authAxios.post(`/trips/${tripId}/book`, data),
  getBookings: () => authAxios.get("/bookings"),

  // ✈️ Flight APIs
  getAllFlights: () => authAxios.get("/flight"),
  getFlightById: (id) => authAxios.get(`/flight/${id}`),
  searchFlights: (params) => authAxios.get("/flight/search", { params }),

  getAllBuses: () => authAxios.get("/bus"),
  getBusById: (id) => authAxios.get(`/bus/${id}`),
  searchBuses: (params) => authAxios.get("/bus/search", { params }),

  getAllTrains: () => authAxios.get("/train"),
  getTrainById: (id) => authAxios.get(`/train/${id}`),
  searchTrains: (params) => authAxios.get("/train/search", { params }),

  getAllCities: () => authAxios.get("/cities"),

  getHotelByCity: (params) => authAxios.get("/hotels", {params}),

  getAllAttractions: () => authAxios.get("/attractions"),
  searchAttractions: (params) => authAxios.get("/attractions/city", { params }),
  sendChatMessage: (message) => authAxios.post("/chatbot/message", {message}),
  searchTripPackages: (params) => authAxios.get("/trips", {params})
};

export default API;

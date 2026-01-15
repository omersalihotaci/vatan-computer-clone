import axios from "axios";

export const http = axios.create({
    baseURL: "https://vatan-computer-clone.onrender.com",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/auth?tab=login";
        }
        return Promise.reject(error);
    }
);  

export default http;    

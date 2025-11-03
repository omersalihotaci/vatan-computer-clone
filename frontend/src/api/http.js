import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    },
});

export default http;    

/* 
ilerde jwtden sonra bu formata çevirmelisin  


import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000, // 10s timeout (istek kitlenmesin)
  headers: {
    "Content-Type": "application/json",
  },
});

// ✨ Request Interceptor → otomatik JWT ekleme
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // veya cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✨ Response Interceptor → ApiResponse<T> içinden sadece data döndür
http.interceptors.response.use(
  (response) => response.data.data, // backend: {success,data,message} → sadece data
  (error) => {
    // Global hata yönetimi (401, 403, 500 vs)
    if (error.response?.status === 401) {
      console.warn("⚠ Yetkisiz istek — oturum süresi doldu");
      // örn: logout(), redirect, toast vs.
    }
    return Promise.reject(error);
  }
);

export default http;

*/
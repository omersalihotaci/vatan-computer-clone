import http from "./http";

export const AuthApi = {
    login: async (payload) => {
        const res = await http.post("/auth/login", payload);
        return res.data.data; 
    },

    register: async (payload) => {
        const res = await http.post("/auth/register", payload);
        return res.data.data; 
    },
};

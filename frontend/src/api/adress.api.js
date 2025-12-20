import http from "./http";

export const AdressApi = {
    fetchAddresses: async () => {
        const res = await http.get("/addresses");
        return res.data.data;
    },

    addAddress: async (payload) => {
        const res = await http.post("/addresses", payload);
        return res.data.data;
    },
    deleteAddress: async (id) => {
        await http.delete(`/addresses/${id}`);
    },
};
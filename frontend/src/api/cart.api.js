import http from "./http";

export const cartApi = {
    addToCart: async (variantId, quantity) => {
        const res = await http.post("/cart/items", { variantId, quantity });
        return res.data.data;
    },
    getMyCart: async () => {
        const res = await http.get("/cart");
        return res.data.data;
    },
};
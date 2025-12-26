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
    deleteCartItem: async (itemId) => {
        const res = await http.delete(`/cart/${itemId}`);
        return res.data.data;
    },
    deleteCart: async () => {
        const res = await http.delete("/cart");
        return res.data.data;
    },  
};
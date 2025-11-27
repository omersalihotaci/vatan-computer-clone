import http from "./http";

export const ProductApi = {
    fetchFeaturedProducts: async () => {
        const res = await http.get("/products/featured");
        return res.data.data;
    },
    fetchProductsByCategory: async (categoryId) => {
        const res = await http.get(`/products/category/${categoryId}`);
        return res.data.data;
    }
};

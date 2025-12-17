import http from "./http";

export const ProductApi = {
    fetchFeaturedProducts: async () => {
        const res = await http.get("/products/featured");
        return res.data.data;
    },
    fetchProductsByCategory: async (categoryId) => {
        const res = await http.get(`/products/category/${categoryId}`);
        return res.data.data;
    },
    fetchBestSellerProducts: async () => {
        const res = await http.get("/products/bestSellers");
        return res.data.data;
    },
    fetchProductById: async (productId) => {
        const res = await http.get(`/products/${productId}`);
        return res.data.data;
    }
    
};

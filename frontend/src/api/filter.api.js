import http from "./http";

export const FilterApi = {
    fetchPriceInterval: async (categoryId) => {
        const res = await http.get(`/categories/${categoryId}/filters/price`);
        return res.data.data;
    },
    fetchBrandsByCategory: async (categoryId) => {
        const res = await http.get(`/categories/${categoryId}/filters/brands`);
        return res.data.data;
    },
    fetchProductsByFilters: async (categoryId,filters) => {
        const res = await http.get(`/categories/${categoryId}/filters/products`,{ params: filters });
        return res.data.data;
    }
    
};

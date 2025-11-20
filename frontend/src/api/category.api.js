import http from "./http";

export const CategoryApi = {
    fetchCategoryTree: async () => {
        const res = await http.get("/categories");
        return res.data.data;
    },
};

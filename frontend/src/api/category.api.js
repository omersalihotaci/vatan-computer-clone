import http from "./http";

export const CategoryApi = {
    getMainCategories: async () => {
        const res = await http.get("/categories/main");
        return res.data.data;
    },
};

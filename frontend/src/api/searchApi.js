import http from "../api/http";

export const searchApi = {
    search: async (query, filters) => {
        const params = new URLSearchParams();

        if (query) params.append("q", query);

        filters?.brands?.forEach((b) => params.append("brands", b));

        filters?.priceRanges?.forEach((r) => params.append("priceRanges", r));

        if (filters?.minPrice != null)
            params.append("minPrice", filters.minPrice);

        if (filters?.maxPrice != null)
            params.append("maxPrice", filters.maxPrice);

        const res = await http.get(`/search?${params.toString()}`);
        return res.data.data;
    },
};

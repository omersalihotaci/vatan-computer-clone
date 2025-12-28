import { useQuery } from "@tanstack/react-query";
import { FilterApi } from "../api/filter.api";
import { searchApi } from "../api/searchApi";

export const usePriceInterval = (categoryId) =>
    useQuery({
        queryKey: ["categories", categoryId, "filters", "price"],
        queryFn: () => FilterApi.fetchPriceInterval(categoryId),
        enabled: !!categoryId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
export const useBrandsByCategory = (categoryId) =>
    useQuery({
        queryKey: ["categories", categoryId, "filters", "brands"],
        queryFn: () => FilterApi.fetchBrandsByCategory(categoryId),
        enabled: !!categoryId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
export const useFilteredProductsByCategory = (categoryId, filters) =>
    useQuery({
        queryKey: [
            "categories",
            categoryId,
            "products",
            filters.brands,
            filters.priceRanges,
            filters.minPrice,
            filters.maxPrice,
        ],
        queryFn: () => FilterApi.fetchProductsByFilters(categoryId, filters),
        enabled: !!categoryId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });

 export const useFilteredProductsBySearch = (query, filters, options = {}) => {
     return useQuery({
         queryKey: [
             "search",
             query,
             filters.brands,
             filters.priceRanges,
             filters.minPrice,
             filters.maxPrice,
         ],
         queryFn: () => searchApi.search(query, filters),
         enabled: options.enabled ?? true,
         keepPreviousData: true,
     });
 };


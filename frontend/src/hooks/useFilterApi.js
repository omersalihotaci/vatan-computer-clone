import { useQuery } from "@tanstack/react-query";
import { FilterApi } from "../api/filter.api";

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
export const useFilteredProducts = (categoryId,filters) =>
    useQuery({
        queryKey: ["categories", categoryId, filters, "products"],
        queryFn: () => FilterApi.fetchProductsByFilters(categoryId, filters),
        enabled: !!categoryId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });

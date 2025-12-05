import { useQuery } from "@tanstack/react-query";
import {ProductApi}  from "../api/product.api"

export const useFeaturedProducts = () =>
    useQuery({
        queryKey: ["products", "featured"],
        queryFn: ProductApi.fetchFeaturedProducts,
        staleTime: 1000 * 60 * 5, 
        retry: 1, 
        refetchOnWindowFocus: false, 
    });
export const useProductsByCategory = (categoryId) =>
    useQuery({
        queryKey: ["products", "category", categoryId],
        queryFn: () => ProductApi.fetchProductsByCategory(categoryId),
        staleTime: 1000 * 60 * 5, 
        retry: 1, 
        refetchOnWindowFocus: false, 
    });
    export const useBestSellerProducts = () =>
        useQuery({
            queryKey: ["products", "bestSellers"],
            queryFn: ProductApi.fetchBestSellerProducts,
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
        });
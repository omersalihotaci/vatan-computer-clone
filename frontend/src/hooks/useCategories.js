import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "../api/category.api";

export const useCategoryTree = () =>
    useQuery({
        queryKey: ["categories", "tree"],
        queryFn: CategoryApi.fetchCategoryTree,
        staleTime: 1000 * 60 * 5, // 5 dk boyunca veriyi taze kabul et
        retry: 1, // hata olursa 1 kez yeniden dene
        refetchOnWindowFocus: false, // sekmeye dönünce tekrar fetch etme
    });

export const useCategoryById = (categoryId) =>
    useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => CategoryApi.fetchCategoryById(categoryId),
        enabled: !!categoryId, // categoryId varsa çalış
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    });
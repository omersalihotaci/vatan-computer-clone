import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "../api/category.api";

export const useMainCategories = () =>
    useQuery({
        queryKey: ["categories", "main"],
        queryFn: CategoryApi.getMainCategories,
        staleTime: 1000 * 60 * 5, // 5 dk boyunca veriyi taze kabul et
        retry: 1, // hata olursa 1 kez yeniden dene
        refetchOnWindowFocus: false, // sekmeye dönünce tekrar fetch etme
    });

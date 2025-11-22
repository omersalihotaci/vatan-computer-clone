import { useQuery } from "@tanstack/react-query";
import { SliderApi } from "../api/slider.api";

export const useSlider = () =>
    useQuery({
        queryKey: ["sliders", "main"],
        queryFn: SliderApi.fetchSlider,
        staleTime: 1000 * 60 * 5, // 5 dk boyunca veriyi taze kabul et
        retry: 1, // hata olursa 1 kez yeniden dene
        refetchOnWindowFocus: false, // sekmeye dönünce tekrar fetch etme
    });

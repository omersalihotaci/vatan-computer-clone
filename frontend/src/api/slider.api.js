import http from "./http";

export const SliderApi = {
    fetchSlider: async () => {
        const res = await http.get("/sliders");
        return res.data.data;
    },
};
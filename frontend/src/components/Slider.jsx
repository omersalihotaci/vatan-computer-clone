// src/components/HeroSlider.tsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useSlider } from "../hooks/useSlider";

export default function HeroSlider() {
    const { data: sliders, isLoading, error } = useSlider();

    if (isLoading) return <p>Slider yükleniyor...</p>;
    if (error) return <p>Slider alınırken hata oluştu!</p>;

    return (
        <div className="w-full max-w-[1200px] mx-auto px-6 mt-6">
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="rounded-xl shadow-lg"
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider.id}>
                        {/* DESKTOP IMAGE — lg ve üstünde görünür */}
                        <img
                            src={slider.desktopUrl}
                            alt={slider.title}
                            className="hidden lg:block w-full h-auto rounded-xl object-contain"
                        />

                        {/* MOBILE IMAGE — lg altında görünür */}
                        <img
                            src={slider.mobileUrl}
                            alt={slider.title}
                            className="block lg:hidden w-full h-auto rounded-xl object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

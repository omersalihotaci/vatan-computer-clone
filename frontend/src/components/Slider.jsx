

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useSlider } from "../hooks/useSlider";
import { Link } from "react-router-dom";

export default function Slider() {
    const { data: sliders, isLoading, error } = useSlider();

    
    if (isLoading) {
        return (
            <div className="w-full max-w-[1200px] mx-auto px-6 mt-6">
                <div className="w-full h-[210px] lg:h-[380px] bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }
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
                        <Link to={`/product/${slider.productId}`} className="block">
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
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

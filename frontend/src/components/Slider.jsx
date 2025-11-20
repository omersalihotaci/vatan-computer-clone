import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Autoplay } from "swiper/modules";

 function Slider() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="w-full max-w-[1400px] mx-auto py-4">
            {/* ✅ Büyük ana slider */}
            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                loop={true}
                autoplay={{ delay: 3500 }}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="rounded-lg overflow-hidden"
            >
                {images.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src}
                            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ✅ Thumbnail slider (küçük kareler) */}
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                slidesPerView={5}
                spaceBetween={10}
                watchSlidesProgress
                className="mt-4"
            >
                {images.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src}
                            className="w-full h-16 object-cover border rounded cursor-pointer hover:opacity-80 transition"
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export default Slider;
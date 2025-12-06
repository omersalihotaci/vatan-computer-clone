import React from 'react'
import { useBestSellerProducts } from '../../hooks/useProducts';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';
import BestSellerProductCard from './BestSellerProductCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function BestSellerProducts() {
    const { data: products} = useBestSellerProducts();

  return (
      <div className="w-full max-w-[1200px] mx-auto mt-10 px-6 relative mb-10">
          <h1 className="text-xl mb-6 font-semibold">Çok Satanlar</h1>

          <div className="flex absolute top-3 right-6 gap-2 ">
              <button
                  className="
                  
            swiper-button-prev-custom
            p-2 
            rounded-full 
            border border-gray-300 
            text-gray-700 
            bg-white
            hover:bg-gray-200
            transition
            flex items-center justify-center
        "
              >
                  <IoIosArrowBack size={18} />
              </button>

              <button
                  className="
                  swiper-button-next-custom
            p-2 
            rounded-full 
            border border-gray-300 
            text-gray-700 
            bg-white
            hover:bg-gray-200 
            transition
            flex items-center justify-center
        "
              >
                  <IoIosArrowForward size={18} />
              </button>
          </div>

          <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={5}
              slidesPerGroup={5} // ← Tüm satırı kaydırır
              navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
              }}
              pagination={{
                  clickable: true,
              }}
              breakpoints={{
                  320: { slidesPerView: 2, slidesPerGroup: 2 },
                  640: { slidesPerView: 3, slidesPerGroup: 3 },
                  1024: { slidesPerView: 4, slidesPerGroup: 4 },
                  1280: { slidesPerView: 5, slidesPerGroup: 5 },
              }}
              style={{
                  "--swiper-pagination-bottom": "0px", // Noktaları en dibe yapıştırır
                  "--swiper-theme-color": "#000", // (Opsiyonel) Nokta rengini değiştirmek istersen
              }}
              className="pb-14!"
            
          >
              {products &&
                  products.map((product) => (
                      <SwiperSlide key={product.id}>
                          <BestSellerProductCard product={product} />
                      </SwiperSlide>
                  ))}
          </Swiper>
      </div>
  );
}

export default BestSellerProducts
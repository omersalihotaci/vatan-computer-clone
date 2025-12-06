import React from 'react'
import FeaturedProductCard from "./FeaturedProductCard";
import { useFeaturedProducts } from '../../hooks/useProducts';


function FeaturedProducts() {
const { data: products } = useFeaturedProducts();

    return (
        <div className="w-full max-w-[1200px]  mx-auto mt-10 px-6">
            <h1 className=" text-xl mb-6 text-center md:text-start text-primary md:text-black font-bold md:font-normal">Öne Çıkan Ürünler</h1>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-8 justify-items-center">
                {products &&
                    products.map((product) => ( 
                            <FeaturedProductCard product={product} key={product.id} /> 
                    ))}
            </div>
        </div>
    );
}

export default FeaturedProducts
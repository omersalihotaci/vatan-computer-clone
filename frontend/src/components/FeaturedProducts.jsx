import React from 'react'
import FeaturedProductCard from "./FeaturedProductCard";
import { useFeaturedProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
const { data: products } = useFeaturedProducts();

    return (
        <div className="w-full max-w-[1200px]  mx-auto mt-10 px-4">
            <h1 className=" text-xl mb-6 text-center md:text-start text-primary md:text-black font-bold md:font-normal">Öne Çıkan Ürünler</h1>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-8">
                {products &&
                    products.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                            <FeaturedProductCard product={product} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default FeaturedProducts
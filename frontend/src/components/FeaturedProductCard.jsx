import React from 'react'
function FeaturedProductCard({ product }) {
    return (
        <div className=" bg-white rounded-lg border border-gray-300 overflow-hidden   flex flex-col cursor-pointer max-w-[280px]">
            <div className="w-full h-32 md:h-40 lg:h-[280px] flex items-center justify-center overflow-hidden">
                <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={`${product.brand} ${product.shortTitle}`}
                    className="object-contain scale-75 max-h-full  "
                />
            </div>

            <div className="p-5 flex flex-col grow ">
                <h2 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 h-10">
                    {product.shortTitle}
                </h2>

                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-900">
                        1234
                    </span>
                    <span className="text-sm text-blue-900 font-medium">₺</span>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProductCard
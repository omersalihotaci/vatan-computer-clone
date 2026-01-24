
const SIZE_PRESETS = {
    large: {
        wrapper:
            "w-[160px] xs:w-[220px] sm:w-[280px] md:w-[220px] lg:w-[240px] xl:w-[280px]",
        img: "h-32 md:h-40 lg:h-[280px]",
        title: "text-sm min-h-[40px] ",
        padding: "p-5",
    },
    medium: {
        wrapper: "w-full",
        img: "h-40 md:h-48 lg:h-56",
        title: "text-sm min-h-[44px]",
        padding: "p-4",
    },
    small: {
        wrapper: "max-w-[280px]",
        img: "h-24 md:h-28 lg:h-46",
        title: "text-xs min-h-[36px]",
        padding: "p-1",
    },
};

export default function BaseProductCard({ product, size = "medium" }) {
    const preset = SIZE_PRESETS[size];
    
    return (
        <div
            className={`bg-white  rounded-lg border border-gray-300 overflow-hidden flex flex-col cursor-pointer ${preset.wrapper}`}
        >
            <div
                className={`w-full flex items-center justify-center  ${preset.img}`}
            >
                <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={`${product.brand} ${product.shortTitle}`}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className={`${preset.padding} flex flex-col grow`}>
                <h2
                    className={`${preset.title} font-medium text-gray-900 mb-3 line-clamp-2 `}
                >
                    {product.shortTitle}
                </h2>

                <div className="mt-auto flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-900">
                        {product.selectedVariant?.price ?? 1224}
                    </span>
                    <span className="text-sm text-blue-900 font-medium">₺</span>
                </div>
            </div>
        </div>
    );
}

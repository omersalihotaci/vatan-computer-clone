import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToCart } from "../../hooks/useCartApi";

export default function ProductInfo({
    product,
    selectedVariant,
    onVariantChange,
}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const addToCartMutation = useAddToCart();

    const handleAddToCart = () => {
         if (!user) {
             showLoginToast();
             return;
         }

        addToCartMutation.mutate({
            variantId: selectedVariant.id,
            quantity: 1,
        });
    };


    const showLoginToast = () => {
        toast.info(
            <span className="text-sm leading-snug">
                Sepete eklemek için{" "}
                <span
                    onClick={() => navigate("/auth?tab=login")}
                    className="text-blue-600  font-semibold cursor-pointer"
                >
                    giriş yapmalısınız
                </span>
            </span>,
            {
                autoClose: 4000,
                closeOnClick: false,
            }
        );
    };


    if (!product || !selectedVariant) return null;

    const attributeKeys = Array.from(
        new Set(
            product.variants.flatMap((v) => Object.keys(v.attributes || {}))
        )
    );

    const attributeOptions = {};
    attributeKeys.forEach((key) => {
        attributeOptions[key] = Array.from(
            new Set(
                product.variants.map((v) => v.attributes?.[key]).filter(Boolean)
            )
        );
    });

    const selectedAttributes = selectedVariant.attributes || {};

    const handleAttributeSelect = (key, value) => {
        const newAttributes = {
            ...selectedAttributes,
            [key]: value,
        };

        const matched =
            product.variants.find((v) =>
                Object.entries(newAttributes).every(
                    ([k, val]) => v.attributes?.[k] === val
                )
            ) || product.variants.find((v) => v.attributes?.[key] === value);

        if (matched) onVariantChange(matched);
    };

    return (
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
            <div>
                <h1 className="text-xl font-semibold">{product.title}</h1>
                <p className="text-sm text-gray-500">
                    {product.brand} • {product.categoryName}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Ürün Kodu (SKU):{" "}
                    <span className="font-medium">{selectedVariant.sku}</span>
                </p>
            </div>
            <div className="text-3xl font-bold">
                {selectedVariant.price.toLocaleString("tr-TR")} TL
            </div>
            {attributeKeys.map((key) => (
                <div key={key} className="space-y-2">
                    <div className="font-semibold capitalize">{key}</div>
                    <div className="flex flex-wrap gap-2">
                        {attributeOptions[key].map((value) => (
                            <button
                                key={value}
                                onClick={() =>
                                    handleAttributeSelect(key, value)
                                }
                                className={`px-3 py-2 rounded border ${
                                    selectedAttributes[key] === value
                                        ? "border-black"
                                        : "border-gray-200"
                                }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button
                disabled={selectedVariant.stock === 0}
                onClick={handleAddToCart}
                className="w-1/2 h-14 rounded-lg bg-blue-900 text-white font-semibold disabled:opacity-50 "
            >
                {selectedVariant.stock === 0 ? "Stokta yok" : "Sepete Ekle"}
            </button>
        </div>
    );
}

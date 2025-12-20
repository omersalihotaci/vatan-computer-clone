import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { useProductById } from "../../hooks/useProducts";

export default function ProductDetailPage() {
    const { id } = useParams();
    const location = useLocation();
    console.log("LOCATION STATE:", location.state);
    const preSelectedVariantId = location.state?.selectedVariantId;
    const { data: product, isLoading, isError } = useProductById(id);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        if (!product?.variants?.length) return;

        const matched = product.variants.find(
            (v) => v.id === preSelectedVariantId
        );

        setSelectedVariant(matched || product.variants[0]);
    }, [product, preSelectedVariantId]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto py-20 text-center">
                <p className="text-lg">Yükleniyor...</p>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="max-w-7xl mx-auto py-20 text-center text-red-600">
                Ürün bulunamadı
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ProductGallery
                    images={product.images} />
                <ProductInfo
                    product={product}
                    selectedVariant={selectedVariant}
                    onVariantChange={setSelectedVariant}
                />
            </div>
        </div>
    );
}

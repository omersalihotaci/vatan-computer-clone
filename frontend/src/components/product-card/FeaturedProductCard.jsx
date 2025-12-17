import BaseProductCard from "./BaseProductCard";
import { Link } from "react-router-dom";

export default function FeaturedProductCard({ product }) {
    return (
        <Link
            to={`/product/${product.id}`}
            key={product.id}
            state={{ selectedVariantId: product.selectedVariant.id }}
        >
            <BaseProductCard product={product} size="large" />
        </Link>
    );
}

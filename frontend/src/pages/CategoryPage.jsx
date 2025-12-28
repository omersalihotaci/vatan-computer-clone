import { useParams } from "react-router-dom";
import { useFilterState } from "../hooks/useFilterState";
import { useFilteredProductsByCategory } from "../hooks/useFilterApi";
import ProductsLayout from "../components/products/ProductsLayout";

function CategoryPage() {
    const { categoryId } = useParams();
    const filterState = useFilterState();

    const { data: products, isLoading } = useFilteredProductsByCategory(
        categoryId,
        {
            priceRanges: filterState.selectedPriceRanges,
            brands: filterState.brands,
            minPrice: filterState.price.min,
            maxPrice: filterState.price.max,
        }
    );

    if (isLoading) {
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    return (
        <ProductsLayout
            mode="CATEGORY"
            categoryId={categoryId}
            filterState={filterState}
            products={products}
        />
    );
}

export default CategoryPage;

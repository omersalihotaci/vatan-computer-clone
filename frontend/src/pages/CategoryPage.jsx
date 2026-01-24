import { useParams } from "react-router-dom";
import { useFilterState } from "../hooks/useFilterState";
import { useFilteredProductsByCategory } from "../hooks/useFilterApi";
import ProductsLayout from "../components/products/ProductsLayout";
import { useCategoryById } from "../hooks/useCategories";

function CategoryPage() {
    const { categoryId } = useParams();
    const filterState = useFilterState();

    const { data: products, productsLoading } = useFilteredProductsByCategory(
        categoryId,
        {
            priceRanges: filterState.selectedPriceRanges,
            brands: filterState.brands,
            minPrice: filterState.price.min,
            maxPrice: filterState.price.max,
        },
    );
    const { data: category, isLoading: categoryLoading } =
        useCategoryById(categoryId); 

    if (productsLoading || categoryLoading) {
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    return (
        <ProductsLayout
            mode="CATEGORY"
            categoryId={categoryId}
            categoryName={category.name}
            filterState={filterState}
            products={products}
        />
    );
}

export default CategoryPage;

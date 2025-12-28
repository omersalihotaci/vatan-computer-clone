import { useSearchParams } from "react-router-dom";
import { useFilterState } from "../hooks/useFilterState";
import { useFilteredProductsBySearch } from "../hooks/useFilterApi";
import ProductsLayout from "../components/products/ProductsLayout";
import { useEffect } from "react";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const filterState = useFilterState();
    const { setBrandsDirectly } = filterState;

    const { data, isLoading } = useFilteredProductsBySearch(
        query,
        {
            priceRanges: filterState.selectedPriceRanges,
            brands: filterState.brands,
            minPrice: filterState.price.min,
            maxPrice: filterState.price.max,
        },
        {
            enabled: !!query,
        }
    );

    useEffect(() => {
        if (data?.context?.preselectedBrands?.length) {
            setBrandsDirectly(data.context.preselectedBrands);
        }
    }, [data, setBrandsDirectly]);

    if (!query) {
        return <div className="text-center mt-10">Arama terimi giriniz</div>;
    }

    if (isLoading) {
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    return (
        <ProductsLayout
            mode="SEARCH"
            categoryId={null}
            filterState={filterState}
            products={data?.products}
            searchContext={data?.context}
        />
    );
}

export default SearchPage;

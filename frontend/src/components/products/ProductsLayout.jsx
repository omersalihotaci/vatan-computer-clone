import FilterBar from "../categoryPage/FilterBar";
import ProductGrid from "./ProductGrid";


function ProductsLayout({ categoryId, filterState, products,mode,searchContext }) {
    return (
        <div className="flex w-full max-w-[1200px] mx-auto mt-10 px-6 gap-6">
            <div className="hidden lg:block w-80 sticky top-3 h-screen overflow-y-auto">
                <FilterBar
                    categoryId={categoryId} filterState={filterState} mode={mode} searchContext={searchContext} />
            </div>

            <div className="flex-1">
                <ProductGrid products={products} />
            </div>
        </div>
    );
}

export default ProductsLayout;

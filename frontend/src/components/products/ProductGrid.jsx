import FilterProductCard from "../product-card/FilterProductCard";

function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return <div>No products found</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {products.map((product) => (
                <FilterProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductGrid;

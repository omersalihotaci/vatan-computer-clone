import React from 'react'
import { useFilteredProductsByCategory } from "../../hooks/useFilterApi";
import FilterProductCard from '../product-card/FilterProductCard';

function ProductListByCategory({categoryId, filterState}) {
  const { data: products } = useFilteredProductsByCategory(categoryId, {
      priceRanges: filterState.selectedPriceRanges,
      brands: filterState.brands,
      minPrice: filterState.price.min,
      maxPrice: filterState.price.max,
      // attributes: filterState.attributesSelectedOptions,
  });
  
  return (
    <div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((product) => (
            <FilterProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  )
}

export default ProductListByCategory
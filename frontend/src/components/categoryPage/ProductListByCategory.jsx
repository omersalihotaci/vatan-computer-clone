import React from 'react'
import { useFilteredProducts } from '../../hooks/useFilterApi';

function ProductListByCategory({categoryId, filterState}) {
  const { data: products } = useFilteredProducts(categoryId, {
      priceRanges: filterState.selectedPriceRanges,
      brands: filterState.brands,
      minPrice: filterState.price.min,
      maxPrice: filterState.price.max,
      // attributes: filterState.attributesSelectedOptions,
  });
  console.log(products);
  
  return (
    <div>ProductListByCategory</div>
  )
}

export default ProductListByCategory
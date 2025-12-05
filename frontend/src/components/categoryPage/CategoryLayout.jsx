import React from 'react'
import FilterBar from './FilterBar'
import ProductListByCategory from './ProductListByCategory'
import { useFilterState } from '../../hooks/useFilterState';
import { useParams } from 'react-router-dom';

function CategoryLayout() {
  const { categoryId } = useParams();
  const filterState = useFilterState();
  
  return (
      <div>
      <FilterBar categoryId={categoryId} filterState={filterState} />
      <ProductListByCategory categoryId={categoryId} filterState={filterState} />
    </div>
  )
}

export default CategoryLayout
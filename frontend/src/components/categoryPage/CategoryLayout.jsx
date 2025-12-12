import React from 'react'
import FilterBar from './FilterBar'
import ProductListByCategory from './ProductListByCategory'
import { useFilterState } from '../../hooks/useFilterState';
import { useParams } from 'react-router-dom';

function CategoryLayout() {
  const { categoryId } = useParams();
  const filterState = useFilterState();
  
  return (
      <div className="flex w-full max-w-[1200px]  mx-auto mt-10 px-6 gap-6">
          <div className="hidden lg:block w-80 sticky top-3 h-screen overflow-y-auto">
              <FilterBar categoryId={categoryId} filterState={filterState} />
          </div>
          <div className="flex-1">
              <ProductListByCategory
                  categoryId={categoryId}
                  filterState={filterState}
              />
          </div>
          
      </div>
  );
}

export default CategoryLayout
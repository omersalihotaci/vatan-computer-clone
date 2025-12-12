import React from 'react'
import Brands from './filterSideBarElements/Brands';
import PriceInterval from './filterSideBarElements/PriceInterval';

function FilterBar({ categoryId, filterState }) {
  const {
      brands,
      toggleBrand,
      price,
      setMinPriceValue,
      setMaxPriceValue,
      selectedPriceRanges,
      togglePriceRange,
    //  attributes,
    //  toggleAttribute,
      resetFilters,
  } = filterState;
  return (
      <aside className="w-full bg-white border border-gray-200 rounded-lg p-4 space-y-6 select-none">
          {/* Başlık + Reset */}
          <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filtreler</h2>
              <button
                  onClick={resetFilters}
                  className="text-sm text-red-500 hover:underline"
              >
                  Sıfırla
              </button>
          </div>

          {/* Marka Filtresi */}
          <Brands
              categoryId={categoryId}
              selectedBrands={brands}
              toggleBrand={toggleBrand}
      />
      <PriceInterval
          categoryId={categoryId}
          price={price}
          setMinPriceValue={setMinPriceValue}
          setMaxPriceValue={setMaxPriceValue}
          selectedRanges={selectedPriceRanges}
          togglePriceRange={togglePriceRange}
      />

      </aside>
  );
}

export default FilterBar
import FilterBar from "../categoryPage/FilterBar";
import ProductGrid from "./ProductGrid";
import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { PiSortAscendingBold } from "react-icons/pi";

function ProductsLayout({
    categoryId,
    categoryName,
    filterState,
    products,
    mode,
    searchContext,
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortType, setSortType] = useState("price_asc"); 

    //  SORT LOGIC
    const sortedProducts = [...(products || [])].sort((a, b) => {
        const priceA = a.selectedVariant?.price ?? Infinity;
        const priceB = b.selectedVariant?.price ?? Infinity;

        if (sortType === "price_asc") return priceA - priceB;
        if (sortType === "price_desc") return priceB - priceA;
        return 0;
    });

    return (
        <div className="w-full max-w-[1200px] mx-auto mt-6 px-4">
            {/* CATEGORY HEADER BAR */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-semibold">{categoryName}</h1>
                    <p className="text-sm text-gray-600">
                        {categoryName} kategorisinde{" "}
                        <b>{sortedProducts.length}</b> adet ürün bulundu.
                    </p>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    <select
                        value={sortType || ""}
                        onChange={(e) => setSortType(e.target.value)}
                        className="appearance-none
      border border-gray-300
      rounded-full
      px-4 py-2 pr-10
      text-sm
      bg-white
      shadow-sm
      hover:border-gray-400
      focus:outline-none 
      cursor-pointer"
                    >
                        <option value="price_desc">Fiyata Göre Azalan</option>
                        <option value="price_asc">Fiyata Göre Artan</option>
                    </select>
                </div>
            </div>

            {/* MOBILE TOP BUTTONS */}
            <div className="lg:hidden flex gap-6 mb-4 font-bold">
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex-1 bg-primary text-white py-3 rounded-md flex items-center justify-center gap-2"
                >
                    <LuSettings2 /> Filtrele
                </button>

                <button
                    onClick={() => setIsSortOpen(true)}
                    className="flex-1 bg-primary text-white py-3 rounded-md flex items-center justify-center gap-2"
                >
                    <PiSortAscendingBold /> Sırala
                </button>
            </div>

            <div className="flex gap-6">
                {/* DESKTOP FILTER */}
                <div className="hidden lg:block w-80 sticky top-3 h-screen overflow-y-auto">
                    <FilterBar
                        categoryId={categoryId}
                        filterState={filterState}
                        mode={mode}
                        searchContext={searchContext}
                    />
                </div>

                {/* PRODUCTS */}
                <div className="flex-1">
                    <ProductGrid products={sortedProducts} />
                </div>
            </div>

            {/* MOBILE FILTER MODAL */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-end bg-black/40">
                    <div className="w-full bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">Filtreler</h2>
                            <button onClick={() => setIsFilterOpen(false)}>
                                ✖
                            </button>
                        </div>

                        <div className="p-4">
                            <FilterBar
                                categoryId={categoryId}
                                filterState={filterState}
                                mode={mode}
                                searchContext={searchContext}
                            />
                        </div>

                        <div className="p-4 border-t">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-primary text-white py-3 rounded-md"
                            >
                                Filtreleri Uygula
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*  SORT MODAL (RADIO UI) */}
            {isSortOpen && (
                <div className="fixed inset-0 z-50 flex items-end bg-black/40">
                    <div className="w-full bg-white rounded-t-2xl">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">Sırala</h2>
                            <button onClick={() => setIsSortOpen(false)}>
                                ✖
                            </button>
                        </div>

                        <div className="p-4 space-y-4">
                            <SortOption
                                label="Fiyata Göre Artan"
                                value="price_asc"
                                sortType={sortType}
                                setSortType={setSortType}
                                close={() => setIsSortOpen(false)}
                            />

                            <SortOption
                                label="Fiyata Göre Azalan"
                                value="price_desc"
                                sortType={sortType}
                                setSortType={setSortType}
                                close={() => setIsSortOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsLayout;

// 🔘 RADIO OPTION COMPONENT
function SortOption({ label, value, sortType, setSortType, close }) {
    return (
        <label
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
                setSortType(value);
                close();
            }}
        >
            <input
                type="radio"
                checked={sortType === value}
                onChange={() => {}}
                className="w-4 h-4 accent-blue-600"
            />
            <span className="text-base">{label}</span>
        </label>
    );
}

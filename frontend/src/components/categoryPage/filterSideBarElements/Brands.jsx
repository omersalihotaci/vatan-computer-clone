import React, { useState } from "react";
import { useBrandsByCategory } from "../../../hooks/useFilterApi";

function Brands({ categoryId, selectedBrands, toggleBrand }) {
    const { data: brands } = useBrandsByCategory(categoryId);
    const [open, setOpen] = useState(true);

    return (
        <div className="border-b pb-4">
            {/* Başlık */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <h3 className="font-semibold text-gray-800 text-md">Markalar</h3>
                <span className="text-xl leading-none">{open ? "−" : "+"}</span>
            </div>

            {/* İçerik */}
            {open && (
                <div className="flex flex-col gap-2 max-h-64 mt-2">
                    {brands?.map((brand) => (
                        <label
                            key={brand}
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => toggleBrand(brand)}
                                className="hidden peer"
                            />

                            {/* Custom checkbox */}
                            <span
                                className="
                                    w-5 h-5 rounded border 
                                    flex items-center justify-center 
                                    peer-checked:bg-blue-600
                                    peer-checked:border-blue-600
                                    peer-checked:text-white
                                    text-transparent
                                    border-gray-400
                                    transition
                                "
                            >
                                ✓
                            </span>

                            <span className="text-md text-gray-700">
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Brands;

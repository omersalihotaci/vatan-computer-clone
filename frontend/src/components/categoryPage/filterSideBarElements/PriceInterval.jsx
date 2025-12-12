import React, { useState } from 'react'
import { usePriceInterval } from '../../../hooks/useFilterApi';
import { FaSearch } from "react-icons/fa";

function PriceInterval({
    categoryId,
    price,
    setMinPriceValue,
    setMaxPriceValue,
    selectedRanges,
    togglePriceRange,
}) {
    const [open, setOpen] = useState(true);
    const[localMinPrice, setLocalMinPrice] = useState(price.min || '');
    const[localMaxPrice, setLocalMaxPrice] = useState(price.max || '');
    const { data: priceIntervals } = usePriceInterval(categoryId);
    
    return (
        <div className="border-b pb-4">
            {/* Header */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <h3 className="font-semibold text-gray-800 text-md">Fiyat</h3>
                <span className="text-xl">{open ? "−" : "+"}</span>
            </div>

            {open && (
                <div className="mt-3 flex flex-col gap-4">
                    {/* --- Backend Price Ranges --- */}
                    <div className="flex flex-col gap-2">
                        {priceIntervals?.map((range) => {
                            const key = `${range.from}-${range.to}`;
                            const checked = selectedRanges.includes(key);

                            return (
                                <label
                                    key={key}
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden peer"
                                        checked={checked}
                                        onChange={() => togglePriceRange(range)}
                                    />

                                    <span
                                        className="
                      w-5 h-5 rounded border
                      flex items-center justify-center 
                      peer-checked:bg-blue-600
                      peer-checked:border-blue-600
                      peer-checked:text-white
                      text-transparent border-gray-400
                      transition
                    "
                                    >
                                        ✓
                                    </span>

                                    <span className="text-md text-gray-700">
                                        {range.from}₺ - {range.to}₺
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* --- Manual Min-Max Input --- */}
                    <div className="flex gap-2 h-8">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min TL"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm select-auto bg-gray-100"
                                value={localMinPrice || ""}
                                onChange={(e) =>
                                    setLocalMinPrice(e.target.value)
                                }
                            />

                            <input
                                type="number"
                                placeholder="Max TL"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm select-auto bg-gray-100"
                                value={localMaxPrice || ""}
                                onChange={(e) =>
                                    setLocalMaxPrice(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setMinPriceValue(localMinPrice);
                                    setMaxPriceValue(localMaxPrice);
                                }}
                                className="w-full  rounded-md px-4 py-2  text-sm cursor-pointer flex items-center justify-center bg-gray-400"
                            >
                                <FaSearch className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PriceInterval
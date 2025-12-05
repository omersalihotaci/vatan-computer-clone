import React, { useState } from 'react'
import { usePriceInterval } from '../../../hooks/useFilterApi';

function PriceInterval({
    categoryId,
    price,
    setMinPriceValue,
    setMaxPriceValue,
    selectedRanges,
    togglePriceRange,
}) {
    const [open, setOpen] = useState(true);
    const { data: priceIntervals } = usePriceInterval(categoryId);
    
    return (
        <div className="border-b pb-4">
            {/* Header */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <h3 className="font-semibold text-gray-900">Fiyat</h3>
                <span className="text-xl">{open ? "−" : "+"}</span>
            </div>

            {open && (
                <div className="mt-3 flex flex-col gap-4">
                    {/* --- Backend Price Ranges --- */}
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
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

                                    <span className="text-sm text-gray-800">
                                        {range.from}₺ - {range.to}₺
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* --- Manual Min-Max Input --- */}
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            placeholder="Min"
                            className="w-full border rounded p-2 text-sm select-auto"
                            value={price.min || ""}
                            onChange={(e) => setMinPriceValue(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Max"
                            className="w-full border rounded p-2 text-sm select-auto"
                            value={price.max || ""}
                            onChange={(e) => setMaxPriceValue(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PriceInterval
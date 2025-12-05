import { useState } from "react";

export const useFilterState = () => {
    // --- STATE ---
    const [price, setPrice] = useState({ min: null, max: null });
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [brands, setBrands] = useState([]);
    const [attributes, setAttributes] = useState({});

    // --- BRAND FILTRE ---
    const toggleBrand = (brand) => {
        setBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    // --- PRICE (Min/Max) ---
    const setMinPriceValue = (value) => {
        setSelectedPriceRanges([]);
        setPrice((prev) => ({ ...prev, min: value }));
    };

    const setMaxPriceValue = (value) => {
        setSelectedPriceRanges([]);
        setPrice((prev) => ({ ...prev, max: value }));
    };

    // --- PRICE RANGE seçildiğinde min/max sıfırlanır ---
    const togglePriceRange = (range) => {
        setPrice({ min: null, max: null });

        const key = `${range.from}-${range.to}`;

        setSelectedPriceRanges((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    // --- ATTRIBUTE FILTRE ---
    const toggleAttribute = (name, value) => {
        setAttributes((prev) => ({
            ...prev,
            [name]: prev[name]
                ? prev[name].includes(value)
                    ? prev[name].filter((v) => v !== value)
                    : [...prev[name], value]
                : [value],
        }));
    };

    // --- RESET ---
    const resetFilters = () => {
        setBrands([]);
        setPrice({ min: null, max: null });
        setSelectedPriceRanges([]);
        setAttributes({});
    };

    // --- RETURN EDİLEN ---
    return {
        // STATE
        price,
        brands,
        selectedPriceRanges,
        attributes,

        // ACTIONS
        setMinPriceValue,
        setMaxPriceValue,
        toggleBrand,
        togglePriceRange,
        toggleAttribute,
        resetFilters,
    };
};

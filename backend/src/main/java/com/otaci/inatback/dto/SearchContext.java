package com.otaci.inatback.dto;

import java.util.List;

public record SearchContext(
        List<Long> categoryIds,
        List<String> availableBrands,
        List<PriceIntervalDto> availablePriceRanges,
        List<String> preselectedBrands
) {
}

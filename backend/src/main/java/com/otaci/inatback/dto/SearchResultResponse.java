package com.otaci.inatback.dto;

import java.util.List;

public record SearchResultResponse(
        List<ProductResponse> products,
        SearchContext context
) {
}

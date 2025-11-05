package com.otaci.inatback.dto;

import java.math.BigDecimal;
import java.util.Map;

public record ProductVariantCreateRequest(
        BigDecimal price,
        Integer stock,
        String sku,
        Map<String, String> attributes
) {
}

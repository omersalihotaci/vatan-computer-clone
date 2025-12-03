package com.otaci.inatback.dto;

import java.math.BigDecimal;
import java.util.Map;

public record ProductVariantResponse(
        Long id,
        BigDecimal price,
        Integer stock,
        String sku,
        Map<String, String> attributes
) {

}

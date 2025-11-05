package com.otaci.inatback.dto;

import java.math.BigDecimal;
import java.util.Map;

public record ProductVariantListDTO(
        Long productId,
        Long variantId,
        String displayName,
        String thumbnail,
        BigDecimal price,
        Map<String, String> attributes
) {
}

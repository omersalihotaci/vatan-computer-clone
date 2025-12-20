package com.otaci.inatback.dto;

import java.math.BigDecimal;
import java.util.Map;

public record CartItemResponse(
        Long cartItemId,
        Long productId,
        String productTitle,
        String brand,
        String image,
        Long variantId,
        String sku,
        Map<String, String> attributes,
        BigDecimal unitPrice,
        int quantity,
        BigDecimal totalPrice
) {
}

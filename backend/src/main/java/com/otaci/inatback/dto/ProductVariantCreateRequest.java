package com.otaci.inatback.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Map;

public record ProductVariantCreateRequest(

        @NotNull(message = "{variant.price.required}")
        @DecimalMin(value = "1.00", message = "{variant.price.min}")
        @DecimalMax(value = "500000.00", message = "{variant.price.max}")
        BigDecimal price,

        @NotNull(message = "{variant.stock.required}")
        @Min(value = 0, message = "{variant.stock.min}")
        @Max(value = 5000, message = "{variant.stock.max}")
        Integer stock,

        @NotBlank(message = "{variant.sku.required}")
        @Size(min = 3, max = 50, message = "{variant.sku.length}")
        String sku,

        Map<String, String> attributes
) {
}

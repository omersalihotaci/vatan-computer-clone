package com.otaci.inatback.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull
        Long variantId,

        @Min(1)
        int quantity
) {
}

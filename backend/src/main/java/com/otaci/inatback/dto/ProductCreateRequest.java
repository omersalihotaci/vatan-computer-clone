package com.otaci.inatback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductCreateRequest(
        @NotBlank(message = "{product.name.required}")
        @Size(min = 2, max = 120, message = "{product.name.length}")
        String name,

        @Size(max = 1000, message = "{product.description.length}")
        String description,

        @NotNull(message = "{product.category.required}")
        Long categoryId,

        @NotBlank(message = "{product.brand.required}")
        @Size(min = 2, max = 60, message = "{product.brand.length}")
        String brand,

        String thumbnailImage
) {
}

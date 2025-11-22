package com.otaci.inatback.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SliderCreateRequest(
        @NotBlank(message = "Title cannot be empty")
        String title,

        @NotBlank(message = "Desktop URL cannot be empty")
        String desktopUrl,

        @NotBlank(message = "Mobile URL cannot be empty")
        String mobileUrl,

        @NotNull(message = "ProductId cannot be null")
        @Min(value = 1, message = "ProductId must be greater than 0")
        Long productId,

        @NotNull
        Integer orderIndex

        ) {
}

package com.otaci.inatback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

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

        @NotEmpty(message = "En az 1 resim gereklidir")
        @Size(max = 10, message = "En fazla 10 resim yüklenebilir")
         List<
                @NotBlank(message = "Resim URL'i boş olamaz")
                        String
                > images,

        @NotNull(message = "{product.featured.required}")
       Boolean featured,

        @NotNull(message = "{product.featured.required}")
        Boolean bestSeller

) {
}

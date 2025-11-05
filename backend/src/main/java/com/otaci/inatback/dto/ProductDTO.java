package com.otaci.inatback.dto;

public record ProductDTO(
        Long id,
        String name,
        String description,
        String brand,
        String thumbnailImage,
        Long categoryId,
        String categoryName
) {
}

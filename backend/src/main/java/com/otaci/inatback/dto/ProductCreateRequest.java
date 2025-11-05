package com.otaci.inatback.dto;

public record ProductCreateRequest(
        String name,
        String description,
        Long categoryId,
        String brand,
        String thumbnailImage
) {
}

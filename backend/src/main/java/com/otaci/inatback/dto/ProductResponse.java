package com.otaci.inatback.dto;

import java.util.List;

public record ProductResponse(
        Long id,
        String title,
        String shortTitle,
        String description,
        String brand,
        List<String> images,
        Long categoryId,
        String categoryName,
        Boolean featured
) {
}

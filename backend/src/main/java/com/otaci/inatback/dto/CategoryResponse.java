package com.otaci.inatback.dto;

import java.time.LocalDateTime;

public record CategoryResponse(
        Long id,
        String name,
        Long parentId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {
}

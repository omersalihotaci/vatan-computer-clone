package com.otaci.inatback.dto;

import java.util.List;

public record CategoryTreeResponse(
        Long id,
        String name,
        List<CategoryTreeResponse> children
) {
}

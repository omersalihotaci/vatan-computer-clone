package com.otaci.inatback.dto;

public record SliderResponse(
        Long id,
        String title,
        String desktopUrl,
        String mobileUrl,
        Integer orderIndex,
        Long productId,
        boolean active
) {
}

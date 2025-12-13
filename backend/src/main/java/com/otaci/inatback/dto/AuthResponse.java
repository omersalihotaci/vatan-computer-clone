package com.otaci.inatback.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInSeconds,
        UserSummaryResponse user
) {
}

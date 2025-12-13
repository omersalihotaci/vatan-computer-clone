package com.otaci.inatback.dto;

public record UserSummaryResponse(
        Long id,
        String email,
        String fullName,
        com.otaci.inatback.model.Role role
) {
}

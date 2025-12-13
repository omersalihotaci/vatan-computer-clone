package com.otaci.inatback.dto;

public record LoginRequest(
        String email,
        String password
) {
}

package com.otaci.inatback.dto;

import com.otaci.inatback.model.Gender;

public record RegisterRequest(
        String fullName,
        String email,
        String password,
        Gender gender
) {
}

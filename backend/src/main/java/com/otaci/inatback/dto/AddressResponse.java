package com.otaci.inatback.dto;

public record AddressResponse(
        Long id,
        String title,
        String fullName,
        String phone,
        String city,
        String district,
        String neighborhood,
        String addressLine,
        String postalCode
) {
}

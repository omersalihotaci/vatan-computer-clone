package com.otaci.inatback.dto;

import java.time.LocalDate;

public record AddressCreateRequest(
        String title,
        String fullName,
        String phone,
        String city,
        String district,
        String neighborhood,
        String addressLine,
        String postalCode,
        boolean corporate
) {
}

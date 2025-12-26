package com.otaci.inatback.controller;

import com.otaci.inatback.dto.AddressCreateRequest;
import com.otaci.inatback.dto.AddressResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AddressController {
    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<ApiResponse<AddressResponse>> addAddress(
            @RequestBody AddressCreateRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        Long userId = jwt.getClaim("userId");
        return ResponseEntity.ok(ApiResponse.success(addressService.addAddress(request,userId),"Adres başarıyla eklendi")) ;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AddressResponse>>> getMyAddresses(
            @AuthenticationPrincipal Jwt jwt
    ) {
        Long userId = jwt.getClaim("userId");
        return ResponseEntity.ok(ApiResponse.success(addressService.getMyAddresses(userId),"Adresler getirildi"));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt
    ) {
        Long userId = jwt.getClaim("userId");
        addressService.deleteAddress(id, userId);
        return ResponseEntity.ok(ApiResponse.message("address deleted"));
    }
    @PutMapping("/{AddressId}")
    public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(
            @PathVariable Long AddressId,
           @Valid @RequestBody AddressCreateRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        Long userId = jwt.getClaim("userId");
        return ResponseEntity.ok(ApiResponse.success(addressService.updateAddress(AddressId, request, userId),"Address updated successfully"));
    }

}

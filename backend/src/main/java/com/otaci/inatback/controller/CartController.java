package com.otaci.inatback.controller;

import com.otaci.inatback.dto.CartItemRequest;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.CartServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartServiceImpl cartService;

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Void>> addToCart(
            @Valid @RequestBody CartItemRequest request
    ) {
        cartService.addToCart(request.variantId(), request.quantity());
        return ResponseEntity.ok(ApiResponse.message("Ürün sepete eklendi."));
    }
}

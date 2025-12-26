package com.otaci.inatback.controller;

import com.otaci.inatback.dto.CartItemRequest;
import com.otaci.inatback.dto.CartResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.CartServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
@Tag(name = "Cart API", description = "Sepet işlemleri")
public class CartController {
    private final CartServiceImpl cartService;

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Void>> addToCart(
            @Valid @RequestBody CartItemRequest request
    ) {
        cartService.addToCart(request.variantId(), request.quantity());
        return ResponseEntity.ok(ApiResponse.message("Ürün sepete eklendi."));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart() {
        return ResponseEntity.ok(ApiResponse.success(cartService.getMyCart()));
    }
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse<Void>> deleteCard(@PathVariable Long cartItemId) {
       cartService.deleteCart(cartItemId);
        return ResponseEntity.ok(ApiResponse.message("Sepet temizlendi."));
    }
    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok(
                ApiResponse.message("Sepet temizlendi.")
        );
    }
}

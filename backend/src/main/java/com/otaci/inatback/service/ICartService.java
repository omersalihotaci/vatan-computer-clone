package com.otaci.inatback.service;

import com.otaci.inatback.dto.CartResponse;

public interface ICartService {
    void addToCart(Long variantId, int quantity);
    CartResponse getMyCart();
}

package com.otaci.inatback.dto;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
        Long cartId,
        int itemCount,
        BigDecimal cartTotal,
        List<CartItemResponse> items
) {
}

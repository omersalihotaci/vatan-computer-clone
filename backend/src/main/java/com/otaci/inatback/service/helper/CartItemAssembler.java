package com.otaci.inatback.service.helper;

import com.otaci.inatback.dto.CartItemResponse;
import com.otaci.inatback.entity.CartItem;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.entity.ProductVariant;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
@Component
public class CartItemAssembler {

    public CartItemResponse toResponse(CartItem item) {

        ProductVariant v = item.getProductVariant();
        Product p = v.getProduct();

        BigDecimal unitPrice = v.getPrice();
        int quantity = item.getQuantity();

        return new CartItemResponse(
                item.getId(),

                // Product
                p.getId(),
                p.getTitle(),
                p.getBrand(),
                p.getImages() != null && !p.getImages().isEmpty()
                        ? p.getImages().get(0)
                        : null,

                // Variant
                v.getId(),
                v.getSku(),
                v.getAttributes(),

                // Pricing
                unitPrice,
                quantity,
                unitPrice.multiply(BigDecimal.valueOf(quantity))
        );
    }
}

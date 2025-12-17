package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Cart;
import com.otaci.inatback.entity.CartItem;
import com.otaci.inatback.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProductVariant(
            Cart cart,
            ProductVariant productVariant
    );
}

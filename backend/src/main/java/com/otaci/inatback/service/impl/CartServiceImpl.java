package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.CartItemResponse;
import com.otaci.inatback.dto.CartResponse;
import com.otaci.inatback.entity.Cart;
import com.otaci.inatback.entity.CartItem;
import com.otaci.inatback.entity.ProductVariant;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.repository.CartItemRepository;
import com.otaci.inatback.repository.CartRepository;
import com.otaci.inatback.repository.ProductVariantRepository;
import com.otaci.inatback.service.ICartService;
import com.otaci.inatback.service.helper.CartItemAssembler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements ICartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final AuthServiceImpl authService;
    private final CartItemAssembler cartItemAssembler;

    @Override
    public void addToCart(Long variantId, int quantity) {
        User user = authService.getCurrentUser();

        // 2️⃣ Kullanıcının sepetini bul veya oluştur
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // 3️⃣ Variant’ı bul
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() ->
                        new RuntimeException("Variant not found: " + variantId)
                );

        // 4️⃣ Stock kontrolü
        if (variant.getStock() < quantity) {
            throw new RuntimeException("Yetersiz stok");
        }

        // 5️⃣ Sepette bu ürün var mı?
        CartItem cartItem = cartItemRepository
                .findByCartAndProductVariant(cart, variant)
                .orElse(null);

        if (cartItem != null) {
            // varsa → quantity artır
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            // yoksa → yeni CartItem oluştur
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProductVariant(variant);
            newItem.setQuantity(quantity);

            cart.getItems().add(newItem);
        }

        // 6️⃣ Kaydet
        cartRepository.save(cart);
    }

    @Override
    public CartResponse getMyCart() {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found for user: " + user.getEmail())
                );

        List<CartItemResponse> items = cart.getItems().stream()
                .map(cartItemAssembler::toResponse)
                .toList();

        BigDecimal cartTotal = items.stream()
                .map(CartItemResponse::totalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int itemCount = items.stream()
                .mapToInt(CartItemResponse::quantity)
                .sum();

        return new CartResponse(
                cart.getId(),
                itemCount,
                cartTotal,
                items
        );

    }
}

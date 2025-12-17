package com.otaci.inatback.service.impl;

import com.otaci.inatback.entity.Cart;
import com.otaci.inatback.entity.CartItem;
import com.otaci.inatback.entity.ProductVariant;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.repository.CartItemRepository;
import com.otaci.inatback.repository.CartRepository;
import com.otaci.inatback.repository.ProductVariantRepository;
import com.otaci.inatback.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements ICartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final AuthServiceImpl authService;

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
    }

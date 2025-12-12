package com.otaci.inatback.service.helper;

import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.entity.ProductVariant;
import com.otaci.inatback.mapper.ProductMapper;
import com.otaci.inatback.mapper.ProductVariantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductResponseFactory {

    private final ProductMapper productMapper;
    private final ProductVariantMapper productVariantMapper;

    public ProductResponse build(Product product, List<ProductVariant> matchedVariants) {

        ProductResponse dto = productMapper.toDTO(product);

        // tüm varyantları ekle
        dto = dto.withVariants(
                product.getVariants().stream()
                        .map(productVariantMapper::toDTO)
                        .toList()
        );

        // eşleşen varyantları ekle
        dto = dto.withMatchedVariants(
                matchedVariants.stream()
                        .map(productVariantMapper::toDTO)
                        .toList()
        );

        // selectedVariant = matched içindeki en ucuz
        ProductVariant selected = matchedVariants.stream()
                .min(Comparator.comparing(ProductVariant::getPrice))
                .orElse(product.getVariants().get(0)); // fallback

        dto = dto.withSelectedVariant(productVariantMapper.toDTO(selected));

        return dto;
    }
}

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

        // tüm varyantlar
        List<ProductVariant> allVariants =
                product.getVariants() != null ? product.getVariants() : List.of();

        dto = dto.withVariants(
                allVariants.stream()
                        .map(productVariantMapper::toDTO)
                        .toList()
        );

        // eşleşen varyantlar
        List<ProductVariant> safeMatched =
                matchedVariants != null ? matchedVariants : List.of();

        dto = dto.withMatchedVariants(
                safeMatched.stream()
                        .map(productVariantMapper::toDTO)
                        .toList()
        );

        // selectedVariant seçimi (ASLA get(0) YOK)
        ProductVariant selected = null;

        if (!safeMatched.isEmpty()) {
            selected = safeMatched.stream()
                    .min(Comparator.comparing(ProductVariant::getPrice))
                    .orElse(null);
        } else if (!allVariants.isEmpty()) {
            selected = allVariants.stream()
                    .min(Comparator.comparing(ProductVariant::getPrice))
                    .orElse(null);
        }

        if (selected != null) {
            dto = dto.withSelectedVariant(productVariantMapper.toDTO(selected));
        }

        return dto;
    }
}

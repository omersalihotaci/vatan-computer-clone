package com.otaci.inatback.dto;

import java.util.List;

public record ProductResponse(
        Long id,
        String title,
        String shortTitle,
        String description,
        String brand,
        List<String> images,
        Long categoryId,
        String categoryName,
        boolean featured,
        boolean bestSeller,
        List<ProductVariantResponse> variants,
        ProductVariantResponse selectedVariant

) {
    public ProductResponse withVariants(List<ProductVariantResponse> variants) {
        return new ProductResponse(
                id,
                title,
                shortTitle,
                description,
                brand,
                images,
                categoryId,
                categoryName,
                featured,
                bestSeller,
                variants,
                selectedVariant
        );
    }

    public ProductResponse withSelectedVariant(ProductVariantResponse selected) {
        return new ProductResponse(
                id,
                title,
                shortTitle,
                description,
                brand,
                images,
                categoryId,
                categoryName,
                featured,
                bestSeller,
                variants,
                selected
        );
    }


}

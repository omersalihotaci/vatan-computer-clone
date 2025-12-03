package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.ProductVariantCreateRequest;
import com.otaci.inatback.dto.ProductVariantListDTO;
import com.otaci.inatback.dto.ProductVariantResponse;
import com.otaci.inatback.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "variantId", source = "id")
    @Mapping(target = "displayName", expression = "java(buildDisplayName(variant))")
    ProductVariantListDTO toListDTO(ProductVariant variant);

    ProductVariantResponse toDTO(ProductVariant variant);

    ProductVariant toEntity(ProductVariantCreateRequest request);

    default String buildDisplayName(ProductVariant variant) {
        return variant.getProduct().getTitle() + " " + variant.getAttributes();
    }
}

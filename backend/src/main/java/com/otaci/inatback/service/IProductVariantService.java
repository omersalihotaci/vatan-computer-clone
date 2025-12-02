package com.otaci.inatback.service;

import com.otaci.inatback.dto.PriceIntervalDto;
import com.otaci.inatback.dto.ProductVariantCreateRequest;
import com.otaci.inatback.dto.ProductVariantDTO;
import com.otaci.inatback.dto.ProductVariantListDTO;

import java.util.List;

public interface IProductVariantService {
    List<ProductVariantListDTO> getAllVariants();

    List<ProductVariantDTO> getVariantsByProductId(Long productId);

    ProductVariantDTO createVariant(Long productId, ProductVariantCreateRequest request);

    void deleteVariant(Long variantId);




}

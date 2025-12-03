package com.otaci.inatback.service;

import com.otaci.inatback.dto.ProductVariantCreateRequest;
import com.otaci.inatback.dto.ProductVariantListDTO;
import com.otaci.inatback.dto.ProductVariantResponse;

import java.util.List;

public interface IProductVariantService {
    List<ProductVariantListDTO> getAllVariants();

    List<ProductVariantResponse> getVariantsByProductId(Long productId);

    ProductVariantResponse createVariant(Long productId, ProductVariantCreateRequest request);

    void deleteVariant(Long variantId);




}

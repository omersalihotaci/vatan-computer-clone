package com.otaci.inatback.service;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductResponse;

import java.util.List;

public interface IProductService {

    ProductResponse getProductById(Long id);

    List<ProductResponse> getFeaturedProducts();

    ProductResponse createProduct(ProductCreateRequest request);

    void deleteProduct(Long id);
}

package com.otaci.inatback.service;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductDTO;

public interface IProductService {

    ProductDTO getProductById(Long id);

    ProductDTO createProduct(ProductCreateRequest request);

    void deleteProduct(Long id);
}

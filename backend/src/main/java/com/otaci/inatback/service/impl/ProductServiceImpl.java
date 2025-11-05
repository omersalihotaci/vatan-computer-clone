package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductDTO;
import com.otaci.inatback.entity.Category;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.mapper.ProductMapper;
import com.otaci.inatback.repository.CategoryRepository;
import com.otaci.inatback.repository.ProductRepository;
import com.otaci.inatback.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return productMapper.toDTO(product);
    }

    @Override
    @Transactional
    public ProductDTO createProduct(ProductCreateRequest request) {
        //  Request -> Entity
        Product product = productMapper.toEntity(request);
        //  Category ilişkilendir
        Category category =categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);
        //  Kaydet & DTO döndür
        Product savedProduct = productRepository.save(product);
        return productMapper.toDTO(savedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        // Hard delete (softa çevir duruma göre)
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }
}
//EXCEPTİONLARI DEĞİŞTİRMEYİ UNUTMA
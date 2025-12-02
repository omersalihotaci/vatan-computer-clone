package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.ProductVariantCreateRequest;
import com.otaci.inatback.dto.ProductVariantDTO;
import com.otaci.inatback.dto.ProductVariantListDTO;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.entity.ProductVariant;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.mapper.ProductVariantMapper;
import com.otaci.inatback.repository.ProductRepository;
import com.otaci.inatback.repository.ProductVariantRepository;
import com.otaci.inatback.service.IProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements IProductVariantService {

    private final ProductVariantRepository productVariantRepository;
    private final ProductRepository productRepository;
    private final ProductVariantMapper productVariantMapper;


    @Override
    @Transactional(readOnly = true)
    public List<ProductVariantListDTO> getAllVariants() {
        return productVariantRepository.findAll()
                .stream()
                .map(productVariantMapper::toListDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductVariantDTO> getVariantsByProductId(Long productId) {
        return productVariantRepository.findByProductId(productId)
                .stream()
                .map(productVariantMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public ProductVariantDTO createVariant(Long productId, ProductVariantCreateRequest request) {

        Product product =productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + productId));
        ProductVariant variant = productVariantMapper.toEntity(request);
        variant.setProduct(product);
        ProductVariant savedVariant = productVariantRepository.save(variant);
        return productVariantMapper.toDTO(savedVariant);
    }

    @Override
    @Transactional
    public void deleteVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new ResourceNotFoundException("Variant not found with id: " + variantId));
        productVariantRepository.delete(variant);
    }


}



package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.dto.ProductVariantResponse;
import com.otaci.inatback.entity.Category;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.entity.ProductVariant;
import com.otaci.inatback.exception.custom.ConflictException;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.mapper.ProductMapper;
import com.otaci.inatback.mapper.ProductVariantMapper;
import com.otaci.inatback.repository.CategoryRepository;
import com.otaci.inatback.repository.ProductRepository;
import com.otaci.inatback.service.IProductService;
import com.otaci.inatback.service.helper.ProductResponseFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final ProductVariantMapper productVariantMapper;
    private final ProductResponseFactory responseFactory;
    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdWithVariants(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found:"+id));
       ProductResponse base = productMapper.toDTO(product);
         List<ProductVariantResponse> variantResponses = product.getVariants()
                .stream()
                .map(productVariantMapper::toDTO)
                .toList();

         return base
                 .withVariants(variantResponses);



    }
    @Transactional(readOnly = true)
    @Override
    public List<ProductResponse> getFeaturedProducts() {
        List<Product> products =productRepository.findByFeaturedTrue();
        return products.stream()
                .map(product -> {
                    List<ProductVariant> allVariants = product.getVariants();
                    return responseFactory.build(product, allVariants);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductResponse> getBestSellerProducts() {
        List<Product> products =productRepository.findByBestSellerTrue();
        return products.stream()
                .map(product -> {
                    List<ProductVariant> allVariants = product.getVariants();
                    return responseFactory.build(product, allVariants);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductResponse> getProductsByCategoryId(Long categoryId) {
        List<Product> products =productRepository.findByCategoryId(categoryId);
        return productMapper.toDTOList(products);
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request) {
        //  Aynı isimde ürün varsa → 409
        if (productRepository.existsByTitle(request.title())) {
            throw new ConflictException("Product already exists: " + request.title());
        }
        //  Request -> Entity
        Product product = productMapper.toEntity(request);
        //  Kategori bulunamazsa → 404
        Category category =categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found:"+request.categoryId()));
        product.setCategory(category);
        //  Kaydet & DTO döndür
        Product savedProduct = productRepository.save(product);
        return productMapper.toDTO(savedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));

        productRepository.delete(product);
    }
}

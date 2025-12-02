package com.otaci.inatback.controller;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.IProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5176")
@RequiredArgsConstructor
@Tag(name = "Product API", description = "Ürün işlemleri")
public class ProductController {

    private final IProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts() {
       return ResponseEntity.ok(ApiResponse.success(productService.getFeaturedProducts()));
    }
    @GetMapping("/bestSellers")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getBestSellerProducts() {
        return ResponseEntity.ok(ApiResponse.success(productService.getBestSellerProducts()));
    }
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProductsByCategoryId(@PathVariable Long categoryId) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductsByCategoryId(categoryId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@RequestBody @Valid ProductCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productService.createProduct(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.message("Product deleted"));

    }
}
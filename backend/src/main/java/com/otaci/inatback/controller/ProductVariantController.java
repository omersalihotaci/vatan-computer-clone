package com.otaci.inatback.controller;


import com.otaci.inatback.dto.PriceIntervalDto;
import com.otaci.inatback.dto.ProductVariantCreateRequest;
import com.otaci.inatback.dto.ProductVariantDTO;
import com.otaci.inatback.dto.ProductVariantListDTO;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.IProductVariantService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5176")
@Tag(name = "Product Variant API", description = "Ürün varyant işlemleri")
public class ProductVariantController {

    private final IProductVariantService productVariantService;

    @GetMapping("/variants")
    public ResponseEntity<ApiResponse<List<ProductVariantListDTO>>> getAllVariants(){
        return ResponseEntity.ok(ApiResponse.success(productVariantService.getAllVariants()));
    }
    @GetMapping("/products/{productId}/variants")
    public ResponseEntity<ApiResponse<List<ProductVariantDTO>>> getVariantsByProductId(@PathVariable Long productId){
        return ResponseEntity.ok(ApiResponse.success(productVariantService.getVariantsByProductId(productId)));
    }

    @PostMapping("/products/{productId}/variants")
    public ResponseEntity<ApiResponse<ProductVariantDTO>> createVariant(@PathVariable Long productId,@RequestBody @Valid ProductVariantCreateRequest request){
        return ResponseEntity.ok(ApiResponse.success(productVariantService.createVariant(productId,request)));
    }
    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<ApiResponse<Void>> deleteVariant(@PathVariable Long variantId){
        productVariantService.deleteVariant(variantId);
        return ResponseEntity.ok(ApiResponse.message("Variant deleted"));
    }


}

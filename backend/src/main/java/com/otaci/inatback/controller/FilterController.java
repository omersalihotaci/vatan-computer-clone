package com.otaci.inatback.controller;

import com.otaci.inatback.dto.PriceIntervalDto;
import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.IFilterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories/{categoryId}/filters")
@CrossOrigin(origins = "http://localhost:5176")
@Tag(name = "Filter API", description = "Ürün filtreleme işlemleri")
public class FilterController {
    private final IFilterService filterService;

    @GetMapping("/price")
    public ResponseEntity<ApiResponse<List<PriceIntervalDto>>> getPriceIntervalsByCategory(@PathVariable Long categoryId){
        return ResponseEntity.ok(ApiResponse.success(filterService.getPriceIntervalsByCategory(categoryId)));
    }
    @GetMapping("/brands")
    public ResponseEntity<ApiResponse<List<String>>> getBrandsByCategory(@PathVariable Long categoryId){
        return ResponseEntity.ok(ApiResponse.success(filterService.getBrandsByCategory(categoryId)));
    }
    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> filterProducts(
            @PathVariable Long categoryId,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) List<String> priceRanges
    ) {
       return ResponseEntity.ok(ApiResponse.success(filterService.filterProducts(categoryId, brands, minPrice, maxPrice,priceRanges)));
    }

}

package com.otaci.inatback.controller;

import com.otaci.inatback.dto.CategoryCreateRequest;
import com.otaci.inatback.dto.CategoryResponse;
import com.otaci.inatback.dto.CategoryTreeResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.ICategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@RestController
@Tag(name = "Category API", description = "Kategori işlemleri")
public class CategoryController {
    private final ICategoryService categoryService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<CategoryTreeResponse>>> getMainCategories() {
        List<CategoryTreeResponse> result = categoryService.getMainCategories();
        return ResponseEntity.ok(ApiResponse.success(result));
    }
    @PostMapping("/{parentId}/children")
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody @Valid CategoryCreateRequest request, @PathVariable Long parentId) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.createCategory(request,parentId),"Children Category created successfully"));
    }
    @PostMapping()
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody @Valid CategoryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.createRootCategory(request),"Root Category created successfully"));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }


}

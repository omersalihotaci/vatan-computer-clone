package com.otaci.inatback.controller;

import com.otaci.inatback.dto.CategoryResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.ICategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5176")
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@RestController
@Tag(name = "Category API", description = "Kategori işlemleri")
public class CategoryController {
    private final ICategoryService categoryService;

    @GetMapping("/main")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getMainCategories() {
        List<CategoryResponse> result = categoryService.getMainCategories();
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}

package com.otaci.inatback.service;

import com.otaci.inatback.dto.CategoryCreateRequest;
import com.otaci.inatback.dto.CategoryResponse;
import com.otaci.inatback.dto.CategoryTreeResponse;

import java.util.List;

public interface ICategoryService {
     List<CategoryTreeResponse> getMainCategories();
     CategoryResponse createCategory(CategoryCreateRequest request, Long id);
     CategoryResponse createRootCategory(CategoryCreateRequest request);
     void deleteCategory(Long id);
    List<Long> getAllLeafCategoryIds(Long categoryId);
    CategoryResponse getCategoryById(Long id);


}

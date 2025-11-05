package com.otaci.inatback.service;

import com.otaci.inatback.dto.CategoryResponse;

import java.util.List;

public interface ICategoryService {
     List<CategoryResponse> getMainCategories();
}

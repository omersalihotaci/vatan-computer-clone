package com.otaci.inatback.service;

import com.otaci.inatback.dto.CategoryResponse;

import com.otaci.inatback.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
  private final  CategoryRepository categoryRepository;

    public List<CategoryResponse> getMainCategories() {
        return categoryRepository.findByParentIsNull()
                .stream()
                .map(cat -> new CategoryResponse(cat.getId(), cat.getName()))
                .toList();
    }
}

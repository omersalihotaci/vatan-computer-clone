package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.CategoryResponse;

import com.otaci.inatback.mapper.CategoryMapper;
import com.otaci.inatback.repository.CategoryRepository;
import com.otaci.inatback.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {
  private final  CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getMainCategories() {
        return categoryRepository.findByParentIsNull()
                .stream()
                .map(categoryMapper::toDTO)
                .toList();
    }
}

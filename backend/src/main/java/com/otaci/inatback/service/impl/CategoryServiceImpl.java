package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.CategoryCreateRequest;
import com.otaci.inatback.dto.CategoryResponse;

import com.otaci.inatback.dto.CategoryTreeResponse;
import com.otaci.inatback.entity.Category;
import com.otaci.inatback.exception.custom.BadRequestException;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.mapper.CategoryMapper;
import com.otaci.inatback.repository.CategoryRepository;
import com.otaci.inatback.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {
  private final  CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryTreeResponse> getMainCategories() {
        return categoryRepository.findByParentIsNullOrderByIdAsc()
                .stream()
                .map(categoryMapper::toTreeDTO)
                .toList();
    }

    @Override
    public CategoryResponse createCategory(CategoryCreateRequest request, Long id) {
        if(id==null || id<=0){
            throw new BadRequestException("Invalid category id");
        }
        // Aynı isimde kategori var mı kontrol et
        if (categoryRepository.existsByNameIgnoreCaseAndParent_Id(request.name(),id)){
            throw new BadRequestException("Category already exists");
        }
        Category category =categoryMapper.toEntity(request);
            Category parentCategory =categoryRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Parent Category not found with id: " + id));


            category.setParent(parentCategory);

        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDTO(savedCategory) ;

    }

    @Override
    public CategoryResponse createRootCategory(CategoryCreateRequest request) {
        if(categoryRepository.existsByNameIgnoreCase(request.name())){
            throw new BadRequestException("Category already exists");
        }
        // Request -> Entity
        Category category =categoryMapper.toEntity(request);
        // Kaydet DTO Dön
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDTO(savedCategory) ;
    }
        @Transactional
        public void deleteCategory(Long id) {
            Category category =categoryRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Category not found with id: " + id));
            if (category.isDeleted()) {
                throw new BadRequestException("Category is already deleted");
            }
            category.setDeleted(true);
            category.setDeletedAt(LocalDateTime.now());

        }

    @Override
    public List<Long> getAllLeafCategoryIds(Long categoryId) {

        Category root = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        List<Long> result = new ArrayList<>();
        collectLeafCategoryIds(root, result);
        return result;
    }

    private void collectLeafCategoryIds(Category category, List<Long> result) {

        // leaf category
        if (category.getChildren() == null || category.getChildren().isEmpty()) {
            result.add(category.getId());
            return;
        }

        // parent category
        for (Category child : category.getChildren()) {
            collectLeafCategoryIds(child, result);
        }
    }

}

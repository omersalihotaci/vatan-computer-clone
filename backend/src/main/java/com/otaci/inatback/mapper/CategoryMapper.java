package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.CategoryCreateRequest;
import com.otaci.inatback.dto.CategoryResponse;
import com.otaci.inatback.dto.CategoryTreeResponse;
import com.otaci.inatback.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "parentId", source = "parent.id")
    CategoryResponse toDTO(Category category);

    Category toEntity(CategoryCreateRequest request);

    CategoryTreeResponse toTreeDTO(Category category);
}

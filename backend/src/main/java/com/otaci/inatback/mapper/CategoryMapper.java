package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.CategoryResponse;
import com.otaci.inatback.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toDTO(Category category);
}

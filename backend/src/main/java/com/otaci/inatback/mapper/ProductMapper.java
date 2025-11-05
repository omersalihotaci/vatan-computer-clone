package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductDTO;
import com.otaci.inatback.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ProductDTO toDTO(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true) // service içinde set edilecek
    Product toEntity(ProductCreateRequest request);
}

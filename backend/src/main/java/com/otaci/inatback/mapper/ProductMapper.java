package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.ProductCreateRequest;
import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.util.TextUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", imports = {TextUtils.class})
public interface ProductMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(
            target = "shortTitle",
            expression = "java(TextUtils.truncate(product.getTitle(), 60))"
    )
    @Mapping(target = "bestSeller", source = "bestSeller")
    @Mapping(target = "variants", ignore = true)
    @Mapping(target = "selectedVariant", ignore = true)

    ProductResponse toDTO(Product product);


    @Mapping(target = "category", ignore = true) // service içinde set edilecek
    Product toEntity(ProductCreateRequest request);

    List<ProductResponse> toDTOList(List<Product> products);
}

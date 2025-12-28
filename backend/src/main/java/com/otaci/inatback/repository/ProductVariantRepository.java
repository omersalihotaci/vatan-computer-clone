package com.otaci.inatback.repository;

import com.otaci.inatback.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant,Long> {
    List<ProductVariant> findByProductId(Long productId);
    boolean existsBySku(String sku);


    @Query("SELECT MIN(v.price) FROM ProductVariant v " +
            "WHERE v.product.category.id = :categoryId AND v.product.deleted = false")
    Double findMinPriceByCategory(@Param("categoryId") Long categoryId);

    @Query("SELECT MAX(v.price) FROM ProductVariant v " +
            "WHERE v.product.category.id = :categoryId AND v.product.deleted = false")
    Double findMaxPriceByCategory(@Param("categoryId") Long categoryId);

    @Query("""
    select min(v.price)
    from ProductVariant v
    join v.product p
    where p.category.id in :categoryIds
      and p.deleted = false
""")
    Double findMinPriceByCategoryIdIn(List<Long> categoryIds);

    @Query("""
    select max(v.price)
    from ProductVariant v
    join v.product p
    where p.category.id in :categoryIds
      and p.deleted = false
""")
    Double findMaxPriceByCategoryIdIn(List<Long> categoryIds);


}

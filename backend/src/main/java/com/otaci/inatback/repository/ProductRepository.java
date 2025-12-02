package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    boolean existsByTitle(String name);
    List<Product> findByFeaturedTrue();
    List<Product> findByBestSellerTrue();
    List<Product> findByCategoryId(Long categoryId);
    @Query("""
    SELECT DISTINCT p.brand
    FROM Product p
    WHERE p.category.id = :categoryId
      AND p.deleted = false
""")
    List<String> findDistinctBrandsByCategory(@Param("categoryId") Long categoryId);

    @Query("""
    SELECT DISTINCT p FROM Product p
    JOIN p.variants v
    WHERE p.category.id = :categoryId
      AND p.deleted = false
       AND (:brands IS NULL OR p.brand IN :brands)
      AND (:minPrice IS NULL OR v.price >= :minPrice)
      AND (:maxPrice IS NULL OR v.price <= :maxPrice)
""")
    List<Product> filterProducts(
            @Param("categoryId") Long categoryId,
            @Param("brands") List<String> brands,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

}

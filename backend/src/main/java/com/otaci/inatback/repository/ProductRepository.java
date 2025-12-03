package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    List<Product> findByCategoryIdAndDeletedFalse(Long categoryId);

    List<Product> findByCategoryIdAndBrandInAndDeletedFalse(Long categoryId, List<String> brands);

    @Query("""
    SELECT p FROM Product p
    LEFT JOIN FETCH p.variants v
    WHERE p.id = :id
""")
    Optional<Product> findByIdWithVariants(@Param("id") Long id);

}

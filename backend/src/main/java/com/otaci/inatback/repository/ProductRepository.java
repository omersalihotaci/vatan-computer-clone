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
    SELECT p FROM Product p
    LEFT JOIN FETCH p.variants v
    WHERE p.id = :id
""")
    Optional<Product> findByIdWithVariants(@Param("id") Long id);
    @Query("""
        select distinct p.brand
        from Product p
        where p.category.id in :categoryIds
          and p.deleted = false
    """)
    List<String> findDistinctBrandsByCategoryIdIn(
            @Param("categoryIds") List<Long> categoryIds
    );
    List<Product> findByCategoryIdInAndBrandInAndDeletedFalse(
            List<Long> categoryIds,
            List<String> brands
    );
    List<Product> findByCategoryIdInAndDeletedFalse(
            List<Long> categoryIds
    );

}

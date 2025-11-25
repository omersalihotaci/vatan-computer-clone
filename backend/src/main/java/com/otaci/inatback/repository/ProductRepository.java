package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    boolean existsByTitle(String name);
    List<Product> findByFeaturedTrue();
}

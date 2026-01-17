package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findByParentIsNullOrderByIdAsc();
    boolean existsByNameIgnoreCaseAndParent_Id(String name, Long parentId);
    boolean existsByNameIgnoreCase(String name);
    @Query("""
select distinct c
from Category c
left join fetch c.children
where c.parent is null
order by c.id
""")
    List<Category> findRootCategoriesWithChildren();

}

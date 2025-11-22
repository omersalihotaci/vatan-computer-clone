package com.otaci.inatback.repository;

import com.otaci.inatback.entity.Slider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SliderRepository extends JpaRepository<Slider,Long> {
    List<Slider> findByActiveTrueOrderByOrderIndexAsc();
    boolean existsByOrderIndex(Integer orderIndex);
}

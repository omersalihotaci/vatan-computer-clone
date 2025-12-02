    package com.otaci.inatback.service.impl;

    import com.otaci.inatback.dto.PriceIntervalDto;
    import com.otaci.inatback.dto.ProductResponse;
    import com.otaci.inatback.exception.custom.ResourceNotFoundException;
    import com.otaci.inatback.mapper.ProductMapper;
    import com.otaci.inatback.repository.CategoryRepository;
    import com.otaci.inatback.repository.ProductRepository;
    import com.otaci.inatback.repository.ProductVariantRepository;
    import com.otaci.inatback.service.IFilterService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class FilterService implements IFilterService {

        private final CategoryRepository categoryRepository;
        private final ProductVariantRepository productVariantRepository;
        private final ProductRepository productRepository;
        private final ProductMapper productMapper;

        private int determineBucketCount(double range) {
            if (range < 500) return 3;
            if (range < 2000) return 4;
            if (range < 10000) return 5;
            if (range < 30000) return 6;
            if (range < 70000) return 7;
            return 8;
        }

        @Override
        public List<PriceIntervalDto> getPriceIntervalsByCategory(Long categoryId) {
            categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
            Double minPrice = productVariantRepository.findMinPriceByCategory(categoryId);
            Double maxPrice = productVariantRepository.findMaxPriceByCategory(categoryId);
            if (minPrice == null || maxPrice == null) {
                return List.of();
            }
            int bucketCount = determineBucketCount(maxPrice - minPrice);
            return buildNicePriceIntervals(minPrice, maxPrice, bucketCount);
        }

        private List<PriceIntervalDto> buildNicePriceIntervals(double min, double max, int bucketCount) {

            if (min == max) {
                return List.of(new PriceIntervalDto(min, max));
            }

            double range = max - min;
            double rawStep = range / bucketCount;

            double pow10 = Math.pow(10, Math.floor(Math.log10(rawStep)));
            double normalized = rawStep / pow10;

            double niceFactor;
            if (normalized <= 1)       niceFactor = 1;
            else if (normalized <= 2)  niceFactor = 2;
            else if (normalized <= 5)  niceFactor = 5;
            else                       niceFactor = 10;

            double step = niceFactor * pow10;

            double start = Math.floor(min / step) * step;
            double end   = Math.ceil(max / step) * step;

            List<PriceIntervalDto> intervals = new ArrayList<>();
            double current = start;

            while (current < end) {
                double next = current + step;
                intervals.add(new PriceIntervalDto(current, next));
                current = next;
            }

            return intervals;
        }

        @Override
        public List<String> getBrandsByCategory(Long categoryId) {
            categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
            return productRepository.findDistinctBrandsByCategory(categoryId);
        }

        @Override
        public List<ProductResponse> filterProducts(Long categoryId,
                                                    List<String> brands,
                                                    Double minPrice,
                                                    Double maxPrice) {

            categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            System.out.println("brands param: " + brands);

            var products = productRepository.filterProducts(
                    categoryId,
                    (brands == null) ? Collections.emptyList() : brands,
                    minPrice,
                    maxPrice
            );
            System.out.println("PRODUCT ENTITIES = " + products);

            return productMapper.toDTOList(products);
        }

    }

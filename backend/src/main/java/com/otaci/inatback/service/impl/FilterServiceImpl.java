    package com.otaci.inatback.service.impl;

    import com.otaci.inatback.dto.PriceIntervalDto;
    import com.otaci.inatback.dto.ProductResponse;
    import com.otaci.inatback.entity.Category;
    import com.otaci.inatback.entity.Product;
    import com.otaci.inatback.entity.ProductVariant;
    import com.otaci.inatback.exception.custom.ResourceNotFoundException;
    import com.otaci.inatback.repository.CategoryRepository;
    import com.otaci.inatback.repository.ProductRepository;
    import com.otaci.inatback.repository.ProductVariantRepository;
    import com.otaci.inatback.service.IFilterService;
    import com.otaci.inatback.service.helper.ProductResponseFactory;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.math.BigDecimal;
    import java.util.ArrayList;
    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class FilterServiceImpl implements IFilterService {

        private final CategoryRepository categoryRepository;
        private final ProductVariantRepository productVariantRepository;
        private final ProductRepository productRepository;
        private final ProductResponseFactory responseFactory;
        private final CategoryServiceImpl categoryService;

        private int determineBucketCount(double range) {
            if (range < 500) return 3;
            if (range < 2000) return 4;
            if (range < 10000) return 5;
            if (range < 30000) return 6;
            if (range < 70000) return 7;
            return 8;
        }

        private static class PriceRange {
            BigDecimal min;
            BigDecimal max;

            PriceRange(BigDecimal min, BigDecimal max) {
                this.min = min;
                this.max = max;
            }
        }



        @Override
        public List<PriceIntervalDto> getPriceIntervalsByCategory(Long categoryId) {

            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Category not found with id: " + categoryId));

            List<Long> categoryIds =
                    categoryService.getAllLeafCategoryIds(category.getId());

            Double minPrice =
                    productVariantRepository.findMinPriceByCategoryIdIn(categoryIds);

            Double maxPrice =
                    productVariantRepository.findMaxPriceByCategoryIdIn(categoryIds);

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

            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Category not found with id: " + categoryId));

            List<Long> categoryIds =
                    categoryService.getAllLeafCategoryIds(category.getId());

            return productRepository.findDistinctBrandsByCategoryIdIn(categoryIds);
        }


        @Override
        public List<ProductResponse> filterProducts(
                Long categoryId,
                List<String> brands,
                BigDecimal minPrice,
                BigDecimal maxPrice,
                List<String> priceRanges
        ) {

            Category category=  categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

           List<Long> categoryIds =
                   categoryService.getAllLeafCategoryIds(category.getId());

            // 1) PriceRanges parse
            List<PriceRange> parsedRanges = new ArrayList<>();

            if (priceRanges != null && !priceRanges.isEmpty()) {
                for (String r : priceRanges) {
                    String[] parts = r.split("-");
                    if (parts.length == 2) {
                        parsedRanges.add(
                                new PriceRange(
                                        new BigDecimal(parts[0]),
                                        new BigDecimal(parts[1])
                                )
                        );
                    }
                }
            }

            // 2) Base products (brand + category)
            List<Product> products =
                    (brands != null && !brands.isEmpty())
                            ? productRepository.findByCategoryIdInAndBrandInAndDeletedFalse(categoryIds, brands)
                            : productRepository.findByCategoryIdInAndDeletedFalse(categoryIds);

            List<ProductResponse> result = new ArrayList<>();

            for (Product product : products) {

                // Ürünün tüm varyantlarını al
                List<ProductVariant> allVariants = product.getVariants();

                // ----------- VARYANT BAZLI FİLTRELEME ------------
                List<ProductVariant> matched = allVariants.stream()
                        .filter(v -> {

                            BigDecimal price = v.getPrice();

                            // min-max price
                            if (minPrice != null && price.compareTo(minPrice) < 0) return false;
                            if (maxPrice != null && price.compareTo(maxPrice) > 0) return false;

                            // price ranges
                            return parsedRanges.isEmpty() ||
                                    parsedRanges.stream().anyMatch(pr ->
                                            price.compareTo(pr.min) >= 0 &&
                                                    price.compareTo(pr.max) <= 0
                                    );
                        })
                        .toList();

                // Eğer bu ürünün filtreye uyan hiçbir varyantı yoksa → ürünü listeleme
                if (matched.isEmpty()) continue;

                result.add(responseFactory.build(product, matched));
            }

            return result;
        }


    }

package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.PriceIntervalDto;
import com.otaci.inatback.dto.ProductResponse;
import com.otaci.inatback.dto.SearchContext;
import com.otaci.inatback.dto.SearchResultResponse;
import com.otaci.inatback.entity.Product;
import com.otaci.inatback.repository.ProductRepository;
import com.otaci.inatback.service.helper.ProductResponseFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductRepository productRepository;
    private final ProductResponseFactory responseFactory;
    private final FilterServiceImpl filterService;

    public SearchResultResponse searchWithContext(String query) {

        // 1️⃣ Search ile ürünleri bul
        List<Product> products = productRepository.searchProducts(query);

        // 2️⃣ Product response'ları
        List<ProductResponse> productResponses =
                products.stream()
                        .map(p -> responseFactory.build(p, p.getVariants()))
                        .filter(Objects::nonNull)
                        .toList();

        // 3️⃣ Ürün yoksa boş ama valid response
        if (products.isEmpty()) {
            return new SearchResultResponse(
                    List.of(),
                    new SearchContext(
                            List.of(), // domainCategoryIds
                            List.of(), // availableBrands
                            List.of(), // priceRanges
                            List.of()  // preselectedBrands
                    )
            );
        }

        // 4️⃣ Ürünlerin bağlı olduğu LEAF category id'leri
        List<Long> domainCategoryIds =
                products.stream()
                        .map(p -> p.getCategory().getId())
                        .distinct()
                        .toList();

        // 5️⃣ Filtre barında gösterilecek markalar
        List<String> availableBrands =
                productRepository.findDistinctBrandsByCategoryIdIn(domainCategoryIds);

        // 6️⃣ Filtre barında gösterilecek fiyat aralıkları
        List<PriceIntervalDto> availablePriceRanges =
                filterService.buildPriceIntervalsForCategories(domainCategoryIds);

        // 7️⃣ Search intent → ön seçili markalar
        List<String> preselectedBrands =
                products.stream()
                        .map(Product::getBrand)
                        .distinct()
                        .toList();

        // 8️⃣ Final response
        return new SearchResultResponse(
                productResponses,
                new SearchContext(
                        domainCategoryIds,
                        availableBrands,
                        availablePriceRanges,
                        preselectedBrands
                )
        );
    }
}

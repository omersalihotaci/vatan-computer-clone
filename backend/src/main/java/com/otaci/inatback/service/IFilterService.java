package com.otaci.inatback.service;

import com.otaci.inatback.dto.PriceIntervalDto;
import com.otaci.inatback.dto.ProductResponse;

import java.math.BigDecimal;
import java.util.List;

public interface IFilterService {
     List<PriceIntervalDto> getPriceIntervalsByCategory(Long categoryId);
     List<String> getBrandsByCategory(Long categoryId);
     List<ProductResponse> filterProducts(Long categoryId,
                                                List<String> brands,
                                                BigDecimal minPrice,
                                                BigDecimal maxPrice,
                                                List<String> priceRanges);
}

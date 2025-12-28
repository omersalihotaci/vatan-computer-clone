package com.otaci.inatback.controller;

import com.otaci.inatback.dto.SearchResultResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.SearchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Tag(name = "Search API", description = "Ürün arama ve search context işlemleri")
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<ApiResponse<SearchResultResponse>> search(
            @RequestParam("q") String query
    ) {

        SearchResultResponse result =
                searchService.searchWithContext(query);

        return ResponseEntity.ok(ApiResponse.success(result));
    }
}

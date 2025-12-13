package com.otaci.inatback.controller;

import com.otaci.inatback.dto.SliderCreateRequest;
import com.otaci.inatback.dto.SliderResponse;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.ISliderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sliders")
@Tag(name = "Slider", description = "Slider management APIs")
public class SliderController {
    private final ISliderService sliderService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<SliderResponse>>> getActiveSliders(){
        return ResponseEntity.ok(ApiResponse.success(sliderService.getActiveSliders()));
    }
    @PostMapping
    public ResponseEntity<ApiResponse<SliderResponse>> createSlider(@Valid @RequestBody SliderCreateRequest request){
        return ResponseEntity.ok(ApiResponse.success(sliderService.createSlider(request)));
    }

}

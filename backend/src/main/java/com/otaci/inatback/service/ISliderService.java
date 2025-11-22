package com.otaci.inatback.service;

import com.otaci.inatback.dto.SliderCreateRequest;
import com.otaci.inatback.dto.SliderResponse;

import java.util.List;

public interface ISliderService {
    List<SliderResponse> getActiveSliders();
    SliderResponse createSlider(SliderCreateRequest request);
}

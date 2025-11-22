package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.SliderCreateRequest;
import com.otaci.inatback.dto.SliderResponse;
import com.otaci.inatback.entity.Slider;
import com.otaci.inatback.mapper.SliderMapper;
import com.otaci.inatback.repository.SliderRepository;
import com.otaci.inatback.service.ISliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class SliderService implements ISliderService {

    private final SliderRepository sliderRepository;
    private final SliderMapper sliderMapper;

    @Override
    public List<SliderResponse> getActiveSliders() {

        return sliderRepository.findByActiveTrueOrderByOrderIndexAsc()
                .stream()
                .map(sliderMapper::toResponse)
                .toList();
    }

    @Override
    public SliderResponse createSlider(SliderCreateRequest request) {
        if (sliderRepository.existsByOrderIndex(request.orderIndex())){
            throw new 
        }
        Slider slider = sliderMapper.toEntity(request);
        Slider savedSlider = sliderRepository.save(slider);
        return sliderMapper.toResponse(savedSlider);

    }
}

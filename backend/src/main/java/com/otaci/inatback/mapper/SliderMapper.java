package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.SliderCreateRequest;
import com.otaci.inatback.dto.SliderResponse;
import com.otaci.inatback.entity.Slider;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")

public interface SliderMapper {

    Slider toEntity(SliderCreateRequest request);
    SliderResponse toResponse(Slider slider);
    void updateEntityFromRequest(SliderCreateRequest request, @MappingTarget Slider slider);

}

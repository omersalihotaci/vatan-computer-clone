package com.otaci.inatback.mapper;

import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "enabled", constant = "false")
    User toEntity(RegisterRequest request);
}


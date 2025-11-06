package com.otaci.inatback.exception.custom;

import com.otaci.inatback.exception.ApiException;
import com.otaci.inatback.exception.ErrorCode;

public class ResourceNotFoundException  extends ApiException {
    public ResourceNotFoundException(String message) {
        super(ErrorCode.RESOURCE_NOT_FOUND, message, 404);
    }
}

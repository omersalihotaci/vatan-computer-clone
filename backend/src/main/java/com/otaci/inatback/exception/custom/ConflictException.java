package com.otaci.inatback.exception.custom;

import com.otaci.inatback.exception.ApiException;
import com.otaci.inatback.exception.ErrorCode;

public class ConflictException extends ApiException {
    public ConflictException(String message) {
        super(ErrorCode.CONFLICT, message, 409);
    }
}

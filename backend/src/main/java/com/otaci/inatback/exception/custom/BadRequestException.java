package com.otaci.inatback.exception.custom;

import com.otaci.inatback.exception.ApiException;
import com.otaci.inatback.exception.ErrorCode;

public class BadRequestException extends ApiException {
    public BadRequestException(String message) {
        super(ErrorCode.BAD_REQUEST, message, 400);
    }
}

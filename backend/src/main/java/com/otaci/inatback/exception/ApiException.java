package com.otaci.inatback.exception;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {

    private final ErrorCode errorCode;
    private final int status;

    public ApiException(ErrorCode errorCode, String message, int status) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
    }
}

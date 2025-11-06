package com.otaci.inatback.exception;


import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        boolean success,
        String code,
        String message,
        int status,
        LocalDateTime timestamp,
        String path,
        Map<String, String> errors // null olabilir → sadece validation için doldurulur
) {
}

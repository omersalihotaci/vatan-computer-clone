package com.otaci.inatback.exception;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

//swagger dokümantasyonunda 500 hatası aldığım için hidden ekledim
@Hidden
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    //  Bizim yazdığımız tüm custom exception'lar buraya düşer
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex, HttpServletRequest req) {

        log.warn("Business exception at {} -> {}", req.getRequestURI(), ex.getMessage());

        return ResponseEntity.status(ex.getStatus())
                .body(new ErrorResponse(
                        false,
                        ex.getErrorCode().name(),
                        ex.getMessage(),
                        ex.getStatus(),
                        LocalDateTime.now(),
                        req.getRequestURI(),
                        null
                ));
    }
    // Validation hataları (DTO üzerinde @Valid varsa)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest req) {

        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> Objects.requireNonNullElse(fe.getDefaultMessage(), "Invalid value"),
                        (first, duplicate) -> first
                ));

        log.warn("Validation failed at {} -> {}", req.getRequestURI(), errors);

        return ResponseEntity.badRequest()
                .body(new ErrorResponse(
                        false,
                        ErrorCode.VALIDATION_ERROR.name(),
                        "Validation failed",
                        400,
                        LocalDateTime.now(),
                        req.getRequestURI(),
                        errors
                ));
    }
    // Yakalanmayan tüm hatalar (NullPointer, DB, Runtime vs.)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, HttpServletRequest req) {

        log.error("Unexpected exception at {} -> {}", req.getRequestURI(), ex.getMessage(), ex);

        return ResponseEntity.status(500)
                .body(new ErrorResponse(
                        false,
                        ErrorCode.INTERNAL_ERROR.name(),
                        "Internal server error",
                        500,
                        LocalDateTime.now(),
                        req.getRequestURI(),
                        null
                ));
    }
}

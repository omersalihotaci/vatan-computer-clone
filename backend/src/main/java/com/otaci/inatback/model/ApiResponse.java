package com.otaci.inatback.model;

public record ApiResponse<T>(boolean success,T data,String message) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static <T> ApiResponse<T> message(String message) {
        return new ApiResponse<>(true, null, message);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, null, message);
    }

}

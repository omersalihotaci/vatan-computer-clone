package com.otaci.inatback.controller;

import com.otaci.inatback.dto.AuthResponse;
import com.otaci.inatback.dto.LoginRequest;
import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.AuthServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/auth")
@RequiredArgsConstructor
@RestController
@Tag(name = "Auth API", description = "Auth işlemleri")
public class AuthController {
    private final AuthServiceImpl authServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authServiceImpl.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authServiceImpl.login(request)));
    }

}

package com.otaci.inatback.controller;

import com.otaci.inatback.dto.AuthResponse;
import com.otaci.inatback.dto.LoginRequest;
import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
@Tag(name = "Auth API", description = "Auth işlemleri")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.message( "Kayıt başarılı, lütfen e-posta adresinizi doğrulayın."));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(request)));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestParam String token
    ) {
        authService.verifyEmail(token);

        return ResponseEntity.ok(
                ApiResponse.success(null, "E-posta adresiniz başarıyla doğrulandı.")
        );
    }
}

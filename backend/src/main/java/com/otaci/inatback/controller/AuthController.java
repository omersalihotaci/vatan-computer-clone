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
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegisterRequest request) {
        authServiceImpl.register(request);
        return ResponseEntity.ok(ApiResponse.message( "Kayıt başarılı, lütfen e-posta adresinizi doğrulayın."));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authServiceImpl.login(request)));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestParam String token
    ) {
        authServiceImpl.verifyEmail(token);

        return ResponseEntity.ok(
                ApiResponse.success(null, "E-posta adresiniz başarıyla doğrulandı.")
        );
    }
}

package com.otaci.inatback.controller;

import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.model.ApiResponse;
import com.otaci.inatback.service.impl.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5176")
@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
@Tag(name = "Auth API", description = "Auth işlemleri")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(null, "Kayıt başarılı, lütfen e-posta adresinizi doğrulayın."));
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

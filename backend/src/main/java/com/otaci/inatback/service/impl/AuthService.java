package com.otaci.inatback.service.impl;


import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.entity.EmailVerificationToken;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.exception.custom.BadRequestException;
import com.otaci.inatback.exception.custom.ConflictException;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.repository.EmailVerificationTokenRepository;
import com.otaci.inatback.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final EmailVerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;


    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("Email zaten kayıtlı");
        }

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setGender(request.gender());
        user.setEnabled(false);

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiresAt(LocalDateTime.now().plusMinutes(30));

        tokenRepository.save(verificationToken);

        // 🔥 ŞİMDİLİK LOG
        System.out.println("EMAIL VERIFY LINK:");
        System.out.println("http://localhost:8080/auth/verify-email?token=" + token);
    }

    @Transactional
    public void verifyEmail(String token) {

        EmailVerificationToken verificationToken =
                tokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Invalid verification token"));

        if (verificationToken.isUsed()) {
            throw new BadRequestException("Token already used");
        }

        if (verificationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Token expired");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);

        verificationToken.setUsed(true);

    }

}

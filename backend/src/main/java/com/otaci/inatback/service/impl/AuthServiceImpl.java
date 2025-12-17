package com.otaci.inatback.service.impl;
import com.otaci.inatback.dto.AuthResponse;
import com.otaci.inatback.dto.LoginRequest;
import com.otaci.inatback.dto.RegisterRequest;
import com.otaci.inatback.dto.UserSummaryResponse;
import com.otaci.inatback.entity.EmailVerificationToken;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.exception.custom.BadRequestException;
import com.otaci.inatback.exception.custom.ConflictException;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.mapper.UserMapper;
import com.otaci.inatback.model.Role;
import com.otaci.inatback.repository.EmailVerificationTokenRepository;
import com.otaci.inatback.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl {

    private final UserRepository userRepository;
    private final EmailVerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    private EmailVerificationToken createVerificationToken(User user) {
        EmailVerificationToken token = new EmailVerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiresAt(LocalDateTime.now().plusMinutes(30));
        token.setUsed(false);
        return token;
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated user");
        }

        String email = authentication.getName();
        // JWT subject = email varsayımı (senin login akışına göre DOĞRU)

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found: " + email)
                );
    }


    @Transactional
        public void register(RegisterRequest request) {

            if (userRepository.existsByEmail(request.email())) {
                throw new ConflictException("Email zaten kayıtlı");
            }

            User user = userMapper.toEntity(request);
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode(request.password()));


            userRepository.save(user);

            EmailVerificationToken verificationToken = createVerificationToken(user);
            tokenRepository.save(verificationToken);



            // 🔥 ŞİMDİLİK LOG
            System.out.println("EMAIL VERIFY LINK:");
            System.out.println("http://localhost:8080/auth/verify-email?token=" + verificationToken.getToken());
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

            userRepository.save(user);
            tokenRepository.save(verificationToken);

        }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new BadRequestException("Email veya şifre hatalı"));


        if (!user.isEnabled()) {
            throw new BadRequestException("Email doğrulanmadan giriş yapılamaz");
        }


        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadRequestException("Email veya şifre hatalı");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(
                token,
                "Bearer",
                3600,
                new UserSummaryResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getFullName(),
                        user.getRole()
                )
        );
    }

    }
